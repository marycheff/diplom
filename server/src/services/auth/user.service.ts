import ApiError from "@/exceptions/api-error"
import userRepository from "@/repositories/auth/user.repository"
import mailService from "@/services/mail.service"
import { mapUserToDto } from "@/services/mappers/user.mappers"
import { CreateUserDTO, UpdateUserDTO, UserDTO, UsersListDTO } from "@/types/core/user.types"
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis-client"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"

const LOG_NAMESPACE = "UserService"

class UserService {
    async getUserByEmail(email: string): Promise<UserDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение пользователя по email`)
        try {
            const user = await userRepository.findByEmail(email)

            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь с email не найден`)
                throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
            }
            logger.debug(`[${LOG_NAMESPACE}] Пользователь по email успешно получен`, {
                userId: user.id,
            })
            return mapUserToDto(user)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении пользователя по email`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при получении данных пользователя")
        }
    }

    async getUserById(id: string): Promise<UserDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение пользователя по ID`, { id })
        try {
            const cached = await redisClient.get(`user:${id}`)
            if (cached) {
                logger.debug(`[${LOG_NAMESPACE}] Пользователь получен из кэша`, { id })
                return JSON.parse(cached)
            }

            const user = await userRepository.findById(id)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь с ID не найден`, { id })
                throw ApiError.BadRequest(`Пользователь с id ${id} не найден`)
            }

            const userDto = mapUserToDto(user)
            await redisClient.setEx(`user:${id}`, 3600, JSON.stringify(userDto))
            logger.debug(`[${LOG_NAMESPACE}] Пользователь по ID успешно получен и кэширован`, {
                userId: user.id,
            })
            return userDto
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении пользователя по ID`, {
                id,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при получении данных пользователя")
        }
    }

    async getUsers(page = 1, limit = 10): Promise<UsersListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение списка пользователей`, { page, limit })
        try {
            const skip = (page - 1) * limit
            const users = await userRepository.findMany(skip, limit)
            const total = await userRepository.count()

            logger.debug(`[${LOG_NAMESPACE}] Список пользователей успешно получен`, {
                count: users.length,
                total,
                page,
                limit,
            })
            return {
                users: users.map(user => mapUserToDto(user)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении списка пользователей`, {
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при получении списка пользователей")
        }
    }

    private async checkPassword(email: string, password: string): Promise<boolean> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка пароля пользователя`)
        try {
            const user = await userRepository.findByEmail(email)
            if (!user) {
                logger.warn(`[${LOG_NAMESPACE}] Пользователь не найден при проверке пароля`)
                throw ApiError.BadRequest("Пользователь с таким email не найден")
            }

            const isValid = await bcrypt.compare(password, user.password)
            logger.debug(`[${LOG_NAMESPACE}] Результат проверки пароля`, {
                userId: user.id,
                isValid,
            })
            return isValid
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке пароля`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при проверке пароля")
        }
    }

    async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Обновление пароля пользователя`)
        try {
            const isOldPasswordValid = await this.checkPassword(email, oldPassword)
            if (!isOldPasswordValid) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка обновления пароля с неверным старым паролем`)
                throw ApiError.BadRequest("Неверный старый пароль")
            }

            if (oldPassword === newPassword) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка установить новый пароль, совпадающий со старым`)
                throw ApiError.BadRequest("Новый пароль не может совпадать со старым")
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10)
            const user = await userRepository.updatePassword(email, hashedNewPassword)
            logger.info(`[${LOG_NAMESPACE}] Пароль пользователя успешно обновлен`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении пароля пользователя`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при обновлении пароля")
        }
    }

    async updateUser(id: string, updateData: UpdateUserDTO): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Обновление данных пользователя`, {
            id,
            fields: Object.keys(updateData),
        })
        try {
            await userRepository.update(id, updateData)
            const cacheKey = `user:${id}`
            await redisClient.del(cacheKey)
            logger.info(`[${LOG_NAMESPACE}] Данные пользователя успешно обновлены и кэш очищен`, { id })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении данных пользователя`, {
                id,
                fields: Object.keys(updateData),
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при обновлении данных пользователя")
        }
    }

    async deleteUser(id: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление пользователя`, { id })
        try {
            await userRepository.delete(id)
            const cacheKey = `user:${id}`
            await redisClient.del(cacheKey)
            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно удален и кэш очищен`, { id })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении пользователя`, {
                id,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при удалении пользователя")
        }
    }

    async createUser(userData: CreateUserDTO): Promise<UserDTO> {
        logger.info(`[${LOG_NAMESPACE}] Создание нового пользователя администратором`)
        try {
            const candidate = await userRepository.findByEmail(userData.email)

            if (candidate) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка создания пользователя с существующим email`, {
                    email: userData.email,
                })
                throw ApiError.BadRequest(`Пользователь с email ${userData.email} уже существует`)
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10)
            const newUser = await userRepository.create(userData, hashedPassword, null, userData.role || "USER")

            const userDto = mapUserToDto(newUser)
            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно создан администратором`, { userId: newUser.id })

            return userDto
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при создании пользователя`, {
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при создании пользователя")
        }
    }

    async blockUser(id: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Блокировка пользователя`, { id })
        try {
            const user = await userRepository.update(id, { isBlocked: true })
            await redisClient.del(`user:${id}`)

            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно заблокирован и кэш очищен`, { id })

            // Отправка письма
            await mailService.sendUserBlockedMail(user.email, user.name || user.email)
        } catch (error) {
            if (error instanceof ApiError) throw error

            logger.error(`[${LOG_NAMESPACE}] Ошибка при блокировке пользователя`, {
                id,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при блокировке пользователя")
        }
    }

    async unblockUser(id: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Разблокировка пользователя`, { id })
        try {
            const user = await userRepository.update(id, { isBlocked: false })
            await redisClient.del(`user:${id}`)

            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно разблокирован и кэш очищен`, { id })

            // Отправка письма
            await mailService.sendUserUnblockedMail(user.email, user.name || user.email)
        } catch (error) {
            if (error instanceof ApiError) throw error

            logger.error(`[${LOG_NAMESPACE}] Ошибка при разблокировке пользователя`, {
                id,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при разблокировке пользователя")
        }
    }

    async searchUsers(query: string, page = 1, limit = 10): Promise<UsersListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск пользователей`, { page, limit })
        try {
            const skip = (page - 1) * limit
            const where = {
                OR: [
                    { email: { contains: query } },
                    { name: { contains: query } },
                    { surname: { contains: query } },
                    { patronymic: { contains: query } },
                ],
            }

            const data = await userRepository.search(query, skip, limit)
            const total = await userRepository.count(where)

            logger.debug(`[${LOG_NAMESPACE}] Результаты поиска пользователей получены`, {
                count: data.length,
                total,
                page,
                limit,
            })
            return {
                users: data.map(user => mapUserToDto(user)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске пользователей`, {
                query,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
                stack: error instanceof Error ? error.stack : undefined,
            })
            throw ApiError.InternalError("Ошибка при поиске пользователей")
        }
    }
}

export default new UserService()
