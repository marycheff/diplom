import ApiError from "@/exceptions/api-error"
import { logger } from "@/utils/logger"
import { PrismaClient, Token } from "@prisma/client"

const prisma = new PrismaClient()
const LOG_NAMESPACE = "TokenRepository"

class TokenRepository {
    /**
     * Сохраняет refresh токен в базе данных
     * @param userId - ID пользователя
     * @param refreshToken - Refresh токен для сохранения
     */
    async saveToken(userId: string, refreshToken: string): Promise<Token> {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение refresh токена`, { userId })
        try {
            const token = await prisma.token.upsert({
                where: { userId },
                update: { refreshToken },
                create: { userId, refreshToken },
            })
            logger.debug(`[${LOG_NAMESPACE}] Refresh токен успешно сохранен`, { userId })
            return token
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении refresh токена`, {
                userId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError()
        }
    }

    /**
     * Находит токен по значению refreshToken
     * @param refreshToken - Refresh токен для поиска
     */
    async findByRefreshToken(refreshToken: string): Promise<Token | null> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск токена`)
        try {
            const token = await prisma.token.findUnique({
                where: { refreshToken },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска токена`, { found: !!token })
            return token
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске токена по refreshToken`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    /**
     * Удаляет токен по значению refreshToken
     * @param refreshToken - Refresh токен для удаления
     */
    async removeByRefreshToken(refreshToken: string): Promise<Token> {
        logger.debug(`[${LOG_NAMESPACE}] Удаление токена`)
        try {
            const tokenData = await this.findByRefreshToken(refreshToken)

            if (!tokenData) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка удаления несуществующего токена`)
                throw new Error("Token not found")
            }

            const token = await prisma.token.delete({
                where: { refreshToken },
            })
            logger.debug(`[${LOG_NAMESPACE}] Токен успешно удален`, { userId: token.userId })
            return token
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении токена`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }
}

export default new TokenRepository()
