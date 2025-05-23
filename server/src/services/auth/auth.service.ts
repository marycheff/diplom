import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions/api-error"
import { tokenRepository } from "@/repositories/auth/token.repository"
import { userRepository } from "@/repositories/auth/user.repository"
import { tokenService } from "@/services/auth/token.service"
import { mailService } from "@/services/mail.service"
import { mapUserToDto } from "@/services/mappers/user.mappers"
import { CreateUserDTO, UserDTO } from "@/types/core/user.types"
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis-client"
import { Token } from "@prisma/client"
import bcrypt from "bcryptjs"
import { v4 as uuid_v4 } from "uuid"

const LOG_NAMESPACE = "AuthService"

class AuthService {
    async login(
        email: string,
        password: string
    ): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        logger.info(`[${LOG_NAMESPACE}] Попытка входа в систему`, { email })
        try {
            const user = await userRepository.findByEmail(email)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Неудачная попытка входа: пользователь не найден`, { email })
                throw ApiError.BadRequest("Неверные данные")
            }
            const isPassEquals = await bcrypt.compare(password, user.password)
            if (!isPassEquals) {
                logger.warn(`[${LOG_NAMESPACE}] Неудачная попытка входа: неверный пароль`, { userId: user.id })
                throw ApiError.BadRequest("Неверные данные")
            }
            const userDto = mapUserToDto(user)

            const tokens = tokenService.generateTokens({
                ...userDto,
            })
            await tokenRepository.upsert(user.id, tokens.refreshToken)
            logger.info(`[${LOG_NAMESPACE}] Успешный вход в систему`, { userId: user.id })
            return { ...tokens, user: userDto }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при входе в систему`, {
                email,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при входе в систему")
        }
    }

    async register(user: CreateUserDTO): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        logger.info(`[${LOG_NAMESPACE}] Регистрация нового пользователя`)
        try {
            const candidate = await userRepository.findByEmail(user.email)

            if (candidate) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка регистрации с существующим email`, { email: user.email })
                throw ApiError.BadRequest(`Пользователь с email ${user.email} уже существует`)
            }

            const hashedPassword = await bcrypt.hash(user.password, 10)
            const activationLink = uuid_v4()
            const newUser = await userRepository.create(user, hashedPassword, activationLink)
            logger.debug(`[${LOG_NAMESPACE}] Пользователь создан в базе данных`, { userId: newUser.id })

            await mailService.sendActivationMail(user.email, `${envConfig.API_URL}/api/auth/activate/${activationLink}`)
            logger.debug(`[${LOG_NAMESPACE}] Отправлено письмо активации`, { email: user.email })

            const userDto = mapUserToDto(newUser)

            // Генерация и сохранение токенов
            const tokens = tokenService.generateTokens({
                ...userDto,
            })

            // Сохраняем токен в базе данных
            await tokenRepository.upsert(newUser.id, tokens.refreshToken)
            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно зарегистрирован`, { userId: newUser.id })

            return { ...tokens, user: userDto }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при регистрации пользователя`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при регистрации пользователя")
        }
    }

    async updateActivationLink(email: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Обновление ссылки активации`, { email })
        try {
            const activationLink = uuid_v4()
            const user = await userRepository.findByEmail(email)

            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь не найден при обновлении ссылки активации`, { email })
                throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
            }
            if (user.isActivated) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка обновления ссылки для уже активированного аккаунта`, {
                    userId: user.id,
                })
                throw ApiError.BadRequest(`Аккаунт пользователя c email ${email} уже активирован`)
            }

            await userRepository.updateActivationLink(email, activationLink)
            await mailService.sendActivationMail(email, `${envConfig.API_URL}/api/auth/activate/${activationLink}`)
            logger.info(`[${LOG_NAMESPACE}] Ссылка активации успешно обновлена и отправлена`, { userId: user.id })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении ссылки активации`, {
                email,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при обновлении ссылки активации")
        }
    }

    async activate(activationLink: string): Promise<{
        accessToken: string
        refreshToken: string
        user: UserDTO
    }> {
        logger.info(`[${LOG_NAMESPACE}] Активация аккаунта пользователя`)
        try {
            const user = await userRepository.findByActivationLink(activationLink)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка активации с некорректной ссылкой`)
                throw ApiError.BadRequest("Некорректная ссылка активации")
            }
            if (user.isActivated) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка активации уже активированного аккаунта`, { userId: user.id })
                throw ApiError.BadRequest("Аккаунт уже активирован")
            }
            if (user.activationLinkExp && user.activationLinkExp < new Date()) {
                logger.warn(`[${LOG_NAMESPACE}] Срок действия ссылки активации истек`, {
                    userId: user.id,
                    expiredAt: user.activationLinkExp,
                })
                throw ApiError.BadRequest("Срок действия ссылки активации истек")
            }

            await userRepository.activate(user.id)
            logger.debug(`[${LOG_NAMESPACE}] Аккаунт пользователя активирован в базе данных`, { userId: user.id })

            const userDto = mapUserToDto(user)
            const tokens = tokenService.generateTokens(userDto)

            await tokenRepository.upsert(user.id, tokens.refreshToken)

            await redisClient.del(`user:${user.id}`)
            logger.info(`[${LOG_NAMESPACE}] Аккаунт пользователя успешно активирован`, { userId: user.id })

            return { ...tokens, user: userDto }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при активации аккаунта`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при активации аккаунта")
        }
    }

    async refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string; user: UserDTO }> {
        logger.debug(`[${LOG_NAMESPACE}] Обновление токенов доступа`)
        try {
            if (!refreshToken) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка обновления токенов без предоставления refresh токена`)
                throw ApiError.Unauthorized()
            }

            const userData = tokenService.validateRefreshToken(refreshToken)
            if (!userData || typeof userData !== "object" || userData === null) {
                logger.warn(`[${LOG_NAMESPACE}] Невалидный refresh токен при обновлении`)
                throw ApiError.Unauthorized()
            }

            const tokenFromDb = await tokenRepository.findById(refreshToken)
            if (!tokenFromDb) {
                logger.warn(`[${LOG_NAMESPACE}] Refresh токен не найден в базе данных`)
                throw ApiError.Unauthorized()
            }

            const user = await userRepository.findById(userData.id)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь не найден при обновлении токенов`, { userId: userData.id })
                throw ApiError.Unauthorized()
            }

            const userDto = mapUserToDto(user)

            // Генерируем новые токены
            const tokens = tokenService.generateTokens({ ...userDto })

            // Сохраняем новый refreshToken
            await tokenRepository.upsert(user.id, tokens.refreshToken)
            logger.debug(`[${LOG_NAMESPACE}] Токены доступа успешно обновлены`, { userId: user.id })

            return { ...tokens, user: userDto }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении токенов доступа`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при обновлении токенов доступа")
        }
    }

    async logout(refreshToken: string): Promise<Token> {
        logger.info(`[${LOG_NAMESPACE}] Выход из системы`)
        try {
            if (!refreshToken) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка выхода без предоставления токена`)
                throw ApiError.BadRequest("Токен не предоставлен")
            }
            const token = await tokenRepository.delete(refreshToken)
            logger.info(`[${LOG_NAMESPACE}] Успешный выход из системы`, { tokenId: token.id })
            return token
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при выходе из системы`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при выходе из системы")
        }
    }
}
export const authService = new AuthService()
