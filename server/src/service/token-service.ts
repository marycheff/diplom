import { PrismaClient, Token } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

class TokenService {
    generateTokens(payload: object): { accessToken: string; refreshToken: string } {
        if (!process.env.JWT_ACCESS_SECRET) {
            throw new Error("JWT_ACCESS_SECRET environment variable is not set")
        }
        if (!process.env.JWT_REFRESH_SECRET) {
            throw new Error("JWT_REFRESH_SECRET environment variable is not set")
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "15m",
        })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "30d",
        })

        return { accessToken, refreshToken }
    }

    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        const tokenData = await prisma.token.findUnique({
            where: {
                userId,
            },
        })
        if (tokenData) {
            const updatedToken = await prisma.token.update({
                where: {
                    userId,
                },
                data: {
                    refreshToken,
                },
            })
            return updatedToken // Возвращаем обновленный токен
        }
        // Если токен не существует — создаем новый
        else {
            const newToken = await prisma.token.create({
                data: {
                    userId,
                    refreshToken,
                },
            })
            return newToken // Возвращаем созданный токен
        }
    }
    async removeToken(refreshToken: string): Promise<Token> {
        const tokenData = await prisma.token.delete({
            where: {
                refreshToken,
            },
        })
        return tokenData // Возвращаем удаленный токен
    }

    validateAccessToken(token: string) {
        try {
            if (!process.env.JWT_ACCESS_SECRET) {
                throw new Error("JWT_ACCESS_SECRET environment variable is not set")
            }
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token: string) {
        try {
            if (!process.env.JWT_REFRESH_SECRET) {
                throw new Error("JWT_REFRESH_SECRET environment variable is not set")
            }
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        } catch (e) {
            return null
        }
    }

    async findToken(refreshToken: string): Promise<Token | null> {
        const tokenData = await prisma.token.findUnique({
            where: {
                refreshToken,
            },
        })
        return tokenData
    }
}

export default new TokenService()
