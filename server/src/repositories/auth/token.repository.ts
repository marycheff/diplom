import ApiError from "@/exceptions/api-error"
import { PrismaClient, Token } from "@prisma/client"

const prisma = new PrismaClient()

class TokenRepository {
    /**
     * Сохраняет refresh токен в базе данных
     * @param userId - ID пользователя
     * @param refreshToken - Refresh токен для сохранения
     */
    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        try {
            return await prisma.token.upsert({
                where: { userId },
                update: { refreshToken },
                create: { userId, refreshToken },
            })
        } catch (error) {
            throw ApiError.InternalError()
        }
    }

    /**
     * Находит токен по значению refreshToken
     * @param refreshToken - Refresh токен для поиска
     */
    async findByRefreshToken(refreshToken: string): Promise<Token | null> {
        return prisma.token.findUnique({
            where: { refreshToken },
        })
    }

    /**
     * Удаляет токен по значению refreshToken
     * @param refreshToken - Refresh токен для удаления
     */
    async removeByRefreshToken(refreshToken: string): Promise<Token> {
        const tokenData = await this.findByRefreshToken(refreshToken)

        if (!tokenData) {
            throw new Error("Token not found")
        }

        return prisma.token.delete({
            where: { refreshToken },
        })
    }
}

export default new TokenRepository()
