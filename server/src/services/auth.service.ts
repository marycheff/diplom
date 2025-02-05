import { UserDto, mapUserToDto } from "@/dtos/user.dto"
import envConfig from "@/envConfig"
import ApiError from "@/exceptions/api-error"
import mailService from "@/services/mail.service"
import tokenService from "@/services/token.service"
import { ICreateUser } from "@/types/user.types"
import { PrismaClient, Token } from "@prisma/client"

import bcrypt from "bcrypt"
import { v4 as uuid_v4 } from "uuid"

const prisma = new PrismaClient()

class AuthService {
    async registration(user: ICreateUser): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
        const candidate = await prisma.user.findUnique({
            where: {
                email: user.email,
            },
        })

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с email ${user.email} уже существует`)
        }

        const hashedPassword = await bcrypt.hash(user.password, 10)
        const activationLink = uuid_v4() // Используем правильно импортированную функцию

        const defaultRole = "USER"
        const newUser = await prisma.user.create({
            data: {
                ...user, // Распаковываем остальные поля из user
                password: hashedPassword, // Используем захешированный пароль
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
        if (user.activated) {
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

    async activate(activationLink: string): Promise<void> {
        const user = await prisma.user.findFirst({
            where: {
                activationLink,
            },
        })
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации")
        }
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                activated: true,
            },
        })
    }

    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
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
        return token
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)

        if (!userData || typeof userData !== "object" || userData === null) {
            throw ApiError.UnauthorizedError()
        }

        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userData.id,
            },
        })
        if (!user) {
            throw ApiError.UnauthorizedError()
        }

        const userDto = mapUserToDto(user)

        // Генерация и сохранение токенов
        const tokens = tokenService.generateTokens({
            ...userDto,
        })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }
}
export default new AuthService()
