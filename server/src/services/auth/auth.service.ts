import envConfig from "@/config/envConfig"
import ApiError from "@/exceptions/api-error"
import tokenService from "@/services/auth/token.service"
import mailService from "@/services/mail.service"
import { CreateUserDTO, mapUserToDto, UserDTO } from "@/types/user.types"
import { PrismaClient, Token } from "@prisma/client"
import bcrypt from "bcryptjs"
import { v4 as uuid_v4 } from "uuid"

const prisma = new PrismaClient()

class AuthService {
    async registration(user: CreateUserDTO): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email ${user.email} уже существует`)
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const activationLink = uuid_v4()

        const defaultRole = "USER"
        const newUser = await prisma.user.create({
            data: {
                ...user, // Распаковываем остальные поля из user
                password: hashedPassword,
                activationLink: activationLink,
                role: defaultRole,
            },
        })

        await mailService.sendActivationMail(user.email, `${envConfig.API_URL}/api/auth/activate/${activationLink}`)

        const userDto = mapUserToDto(newUser)

        // Генерация и сохранение токенов
        const tokens = tokenService.generateTokens({
            ...userDto,
        })

        // Сохраняем токен в базе данных
        await tokenService.saveToken(newUser.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async updateActivationLink(email: string): Promise<void> {
        const activationLink = uuid_v4()
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if (!user) {
            throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
        }
        if (user.isActivated) {
            throw ApiError.BadRequest(`Аккаунт пользователя c email ${email} уже активирован`)
        }

        await prisma.user.update({
            where: {
                email,
            },
            data: {
                activationLink,
            },
        })
        await mailService.sendActivationMail(email, `${envConfig.API_URL}/api/auth/activate/${activationLink}`)
    }

    async activate(activationLink: string): Promise<{
        accessToken: string
        refreshToken: string
        user: UserDTO
    }> {
        const user = await prisma.user.findFirst({
            where: { activationLink },
        })

        if (!user) throw ApiError.BadRequest("Некорректная ссылка активации")
        if (user.isActivated) throw ApiError.BadRequest("Аккаунт уже активирован")

        await prisma.user.update({
            where: { id: user.id },
            data: {
                isActivated: true,
                activationLink: null,
            },
        })

        const userDto = mapUserToDto(user)
        const tokens = tokenService.generateTokens(userDto)

        await tokenService.saveToken(user.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }

    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) {
            throw ApiError.BadRequest("Неверные данные")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверные данные")
        }
        const userDto = mapUserToDto(user)

        const tokens = tokenService.generateTokens({
            ...userDto,
        })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async logout(refreshToken: string): Promise<Token> {
        const token = await tokenService.removeToken(refreshToken)
        if (!refreshToken) {
            throw ApiError.BadRequest("Токен не предоставлен")
        }
        return token
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        if (!userData || typeof userData !== "object" || userData === null) {
            throw ApiError.Unauthorized()
        }

        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!tokenFromDb) {
            throw ApiError.Unauthorized()
        }

        const user = await prisma.user.findUnique({
            where: { id: userData.id },
        })
        if (!user) {
            throw ApiError.Unauthorized()
        }

        const userDto = mapUserToDto(user)

        // Генерируем новые токены
        const tokens = tokenService.generateTokens({ ...userDto })

        // Сохраняем новый refreshToken
        await tokenService.saveToken(user.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
    }
}
export default new AuthService()
