import { PrismaClient, Token, User } from "@prisma/client"
import bcrypt from "bcrypt"
import { v4 as uuid_v4 } from "uuid" // Правильный импорт
import UserDto from "../dtos/user-dto"
import ApiError from "../exceptions/api-error"
import { ICreateUser } from "../types/user.types"
import mailService from "./mail-service"
import tokenService from "./token-service"

const prisma = new PrismaClient()

class UserService {
    private async checkPassword(email: string, password: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        return isPassEquals
    }
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

        const newUser = await prisma.user.create({
            data: {
                ...user, // Распаковываем остальные поля из user
                password: hashedPassword, // Используем захешированный пароль
                activationLink: activationLink,
            },
        })
        await mailService.sendActivationMail(user.email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(newUser)

        // Генерация и сохранение токенов
        const tokens = tokenService.generateTokens({
            ...userDto,
        })

        // Сохраняем токен в базе данных
        await tokenService.saveToken(newUser.id, tokens.refreshToken)

        return { ...tokens, user: userDto }
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
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Неверный пароль")
        }
        const userDto = new UserDto(user)

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

        const userDto = new UserDto(user)

        // Генерация и сохранение токенов
        const tokens = tokenService.generateTokens({
            ...userDto,
        })
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return { ...tokens, user: userDto }
    }

    async getAllUsers(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users
    }

    async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<User> {
        const isOldPasswordValid = await this.checkPassword(email, oldPassword)
        if (!isOldPasswordValid) {
            throw ApiError.BadRequest("Неверный старый пароль")
        }

        if (oldPassword === newPassword) {
            throw ApiError.BadRequest("Новый пароль не может совпадать со старым")
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { password: hashedNewPassword },
        })

        return updatedUser
    }

    // private resetCodes = new Map<string, { code: string; expires: number }>()

    // async sendResetCode(email: string) {
    //     const user = await prisma.user.findUnique({ where: { email } })
    //     if (!user) {
    //         throw ApiError.BadRequest("Пользователь не найден")
    //     }

    //     const code = Math.floor(100000 + Math.random() * 900000).toString()
    //     const expires = Date.now() + 5 * 60 * 1000 // 5 минут

    //     this.resetCodes.set(email, { code, expires })
    //     await mailService.sendResetPasswordMail(email, user.email, code)
    // }

    // async verifyResetCode(email: string, code: string) {
    //     const entry = this.resetCodes.get(email)
    //     if (!entry || entry.code !== code || entry.expires < Date.now()) {
    //         throw ApiError.BadRequest("Неверный код или срок действия истек")
    //     }
    // }

    // async resetPassword(email: string, newPassword: string) {
    //     const hashedPassword = await bcrypt.hash(newPassword, 10)
    //     await prisma.user.update({ where: { email }, data: { password: hashedPassword } })
    //     this.resetCodes.delete(email)
    // }
}

export default new UserService()
