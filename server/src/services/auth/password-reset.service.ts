import ApiError from "@/exceptions/api-error"
import userRepository from "@/repositories/auth/user.repository"
import { logger } from "@/utils/logger"
import bcrypt from "bcryptjs"

const LOG_NAMESPACE = "PasswordResetService"

class PasswordResetService {
    async saveResetCode(email: string, code: string) {
        logger.info(`[${LOG_NAMESPACE}] Сохранение кода сброса пароля`)
        try {
            const hashedCode = await bcrypt.hash(code, 10)
            await userRepository.saveResetCode(email, hashedCode)
            logger.info(`[${LOG_NAMESPACE}] Код сброса пароля успешно сохранен`)
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении кода сброса пароля`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при сохранении кода сброса пароля")
        }
    }

    async verifyResetCode(email: string, code: string): Promise<boolean> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка кода сброса пароля`)
        try {
            const user = await userRepository.findByEmail(email)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь с email не найден при проверке кода сброса`)
                throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
            }

            if (!user.resetCode) {
                logger.debug(`[${LOG_NAMESPACE}] Код сброса пароля не найден для пользователя`)
                return false
            }

            if (user.resetCodeExp && user.resetCodeExp < new Date()) {
                logger.warn(`[${LOG_NAMESPACE}] Срок действия кода сброса истек`, {
                    userId: user.id,
                    expiredAt: user.resetCodeExp,
                })
                throw ApiError.BadRequest("Срок действия кода сброса истек, запросите новый")
            }

            const isValid = await bcrypt.compare(code, user.resetCode)
            logger.debug(`[${LOG_NAMESPACE}] Результат проверки кода сброса пароля`, {
                userId: user.id,
                isValid,
            })
            return isValid
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке кода сброса пароля`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при проверке кода сброса пароля")
        }
    }

    async resetPassword(email: string, newPassword: string) {
        logger.info(`[${LOG_NAMESPACE}] Сброс пароля пользователя`)
        try {
            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await userRepository.resetPassword(email, hashedPassword)
            logger.info(`[${LOG_NAMESPACE}] Пароль пользователя успешно сброшен`)
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сбросе пароля пользователя`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при сбросе пароля пользователя")
        }
    }
}

export default new PasswordResetService()
