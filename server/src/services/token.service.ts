import envConfig from "@/envConfig"
import ApiError from "@/exceptions/api-error"
import { PrismaClient, Token } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

class TokenService {
    generateTokens(payload: object): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(payload, envConfig.JWT_ACCESS_SECRET as string, {
            expiresIn: "10s",
            // expiresIn: "15s",
        })
        const refreshToken = jwt.sign(payload, envConfig.JWT_REFRESH_SECRET as string, {
            // expiresIn: "30s",
            expiresIn: "60d",
        })

        return { accessToken, refreshToken }
    }

    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        try {
            const existingToken = await prisma.token.findUnique({
                where: { userId },
            })
            if (existingToken) {
                return await prisma.token.update({
                    where: { userId },
                    data: { refreshToken },
                })
            }
            return await prisma.token.create({
                data: { userId, refreshToken },
            })
        } catch (error) {
            throw ApiError.InternalError()
        }
    }
    async removeToken(refreshToken: string): Promise<Token> {
        const tokenData = await prisma.token.findUnique({
            where: { refreshToken },
        })
        if (!tokenData) {
            throw new Error("Token not found")
        }
        await prisma.token.delete({
            where: { refreshToken },
        })
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            return jwt.verify(token, envConfig.JWT_ACCESS_SECRET as string)
        } catch (e) {
            return null
        }
    }
    validateRefreshToken(token: string) {
        try {
            return jwt.verify(token, envConfig.JWT_REFRESH_SECRET as string)
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
