import { CreateUserDTO } from "@/types/core/user.types"
import { logger } from "@/utils/logger"
import { getActivationLinkExpDate, getResetCodeExpDate } from "@/utils/math"
import { Prisma, PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()
const LOG_NAMESPACE = "UserRepository"

class UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск пользователя по email`)
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска пользователя по email`, {
                found: !!user,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске пользователя по email`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findByActivationLink(activationLink: string): Promise<User | null> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск пользователя по ссылке активации`)
        try {
            const user = await prisma.user.findFirst({
                where: { activationLink },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска пользователя по ссылке активации`, {
                found: !!user,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске пользователя по ссылке активации`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findById(id: string): Promise<User | null> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск пользователя по ID`, { id })
        try {
            const user = await prisma.user.findUnique({
                where: { id },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска пользователя по ID`, {
                id,
                found: !!user,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске пользователя по ID`, {
                id,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async create(userData: CreateUserDTO, hashedPassword: string, activationLink: string, role: "USER"): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Создание нового пользователя`, {
            role,
        })
        try {
            const user = await prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                    activationLink,
                    activationLinkExp: getActivationLinkExpDate(),
                    role,
                },
            })
            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно создан`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при создании пользователя`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async updateActivationLink(email: string, activationLink: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Обновление ссылки активации`)
        try {
            const user = await prisma.user.update({
                where: { email },
                data: { activationLink, activationLinkExp: getActivationLinkExpDate() },
            })
            logger.info(`[${LOG_NAMESPACE}] Ссылка активации успешно обновлена`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении ссылки активации`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async activate(id: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Активация пользователя`, { id })
        try {
            const user = await prisma.user.update({
                where: { id },
                data: {
                    isActivated: true,
                    activationLink: null,
                    activationLinkExp: null,
                },
            })
            logger.info(`[${LOG_NAMESPACE}] Пользователь успешно активирован`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при активации пользователя`, {
                id,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение токена для пользователя`, { userId })
        try {
            const token = await prisma.token.upsert({
                where: { userId },
                update: { refreshToken },
                create: { userId, refreshToken },
            })
            logger.debug(`[${LOG_NAMESPACE}] Токен успешно сохранен`, { userId })
            return token
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении токена`, {
                userId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findToken(refreshToken: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск токена`)
        try {
            const token = await prisma.token.findFirst({
                where: { refreshToken },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска токена`, { found: !!token })
            return token
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске токена`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async removeToken(refreshToken: string) {
        logger.debug(`[${LOG_NAMESPACE}] Удаление токена`)
        try {
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

    async update(id: string, data: Partial<User>): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Обновление данных пользователя`, {
            id,
            fields: Object.keys(data),
        })
        try {
            const user = await prisma.user.update({
                where: { id },
                data,
            })
            logger.info(`[${LOG_NAMESPACE}] Данные пользователя успешно обновлены`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении данных пользователя`, {
                id,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async deleteWithTokens(userId: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление пользователя вместе с токенами`, { userId })
        try {
            await prisma.$transaction([
                prisma.token.deleteMany({ where: { userId } }),
                prisma.user.delete({ where: { id: userId } }),
            ])
            logger.info(`[${LOG_NAMESPACE}] Пользователь и связанные токены успешно удалены`, { userId })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении пользователя и токенов`, {
                userId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async updatePassword(email: string, newPasswordHash: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Обновление пароля пользователя`)
        try {
            const user = await prisma.user.update({
                where: { email },
                data: { password: newPasswordHash },
            })
            logger.info(`[${LOG_NAMESPACE}] Пароль пользователя успешно обновлен`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении пароля пользователя`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findMany(skip: number, take: number): Promise<User[]> {
        logger.debug(`[${LOG_NAMESPACE}] Получение списка пользователей`, { skip, take })
        try {
            const users = await prisma.user.findMany({
                skip,
                take,
                orderBy: { createdAt: "desc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Список пользователей успешно получен`, { count: users.length })
            return users
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении списка пользователей`, {
                skip,
                take,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async search(query: string, skip: number, take: number): Promise<User[]> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск пользователей по запросу`, { skip, take })
        try {
            const where = {
                OR: [
                    { email: { contains: query } },
                    { name: { contains: query } },
                    { surname: { contains: query } },
                    { patronymic: { contains: query } },
                ],
            }
            const users = await prisma.user.findMany({
                skip,
                take,
                where,
                orderBy: { createdAt: "desc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результаты поиска пользователей получены`, {
                count: users.length,
            })
            return users
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске пользователей`, {
                skip,
                take,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async saveResetCode(email: string, hashedCode: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Сохранение кода сброса пароля`)
        try {
            const user = await prisma.user.update({
                where: { email },
                data: { resetCode: hashedCode, resetCodeExp: getResetCodeExpDate() },
            })
            logger.info(`[${LOG_NAMESPACE}] Код сброса пароля успешно сохранен`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении кода сброса пароля`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async resetPassword(email: string, hashedPassword: string): Promise<User> {
        logger.info(`[${LOG_NAMESPACE}] Сброс пароля пользователя`)
        try {
            const user = await prisma.user.update({
                where: { email },
                data: {
                    password: hashedPassword,
                    resetCode: null,
                    resetCodeExp: null,
                },
            })
            logger.info(`[${LOG_NAMESPACE}] Пароль пользователя успешно сброшен`, {
                userId: user.id,
            })
            return user
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сбросе пароля пользователя`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async count(where?: Prisma.UserWhereInput): Promise<number> {
        logger.debug(`[${LOG_NAMESPACE}] Подсчет количества пользователей`)
        try {
            const count = await prisma.user.count({ where })
            logger.debug(`[${LOG_NAMESPACE}] Количество пользователей получено`, { count })
            return count
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при подсчете количества пользователей`, {
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }
}

export default new UserRepository()
