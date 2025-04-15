import envConfig from "@/config/env-сonfig"
import tokenRepository from "@/repositories/auth/token.repository"
import { Token } from "@prisma/client"
import jwt from "jsonwebtoken"

class TokenService {
    generateTokens(payload: object): { accessToken: string; refreshToken: string } {
        const accessToken = jwt.sign(payload, envConfig.JWT_ACCESS_SECRET as string, {
            expiresIn: "29d",
            // expiresIn: "15s",
        })
        const refreshToken = jwt.sign(payload, envConfig.JWT_REFRESH_SECRET as string, {
            // expiresIn: "30s",
            expiresIn: "30d",
        })
        return { accessToken, refreshToken }
    }

    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        return tokenRepository.saveToken(userId, refreshToken)
    }

    async removeToken(refreshToken: string): Promise<Token> {
        return tokenRepository.removeByRefreshToken(refreshToken)
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
        return tokenRepository.findByRefreshToken(refreshToken)
    }
}

export default new TokenService()
