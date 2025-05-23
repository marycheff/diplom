import { attemptRepository } from "@/repositories/tests/attempt.repository"
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis-client"
import { TestAttemptStatus } from "@prisma/client"
import cron from "node-cron"

// Планировщик для проверки и обработки просроченных попыток тестирования
class ExpiredAttemptsJob {
    private task: cron.ScheduledTask | null = null
    private readonly cronExpression: string = "* * * * *" // Каждую минуту
    private readonly batchSize: number = 100

    // Запуск планировщика задач
    public start(): void {
        if (this.task === null) {
            logger.info("Запуск планировщика проверки просроченных попыток")

            // Запуск задачи по расписанию с использованием cron
            this.task = cron.schedule(this.cronExpression, () => {
                this.checkExpiredAttempts().catch(error => {
                    logger.error("Ошибка при выполнении плановой проверки просроченных попыток:", error)
                })
            })

            // Запуск проверки при старте
            this.checkExpiredAttempts().catch(error => {
                logger.error("Ошибка при начальной проверке просроченных попыток:", error)
            })
        }
    }

    // Остановка планировщика задач
    public stop(): void {
        if (this.task !== null) {
            this.task.stop()
            this.task = null
            logger.info("Планировщик проверки просроченных попыток остановлен")
        }
    }

    // Проверка и обработка просроченных попыток
    public async checkExpiredAttempts(): Promise<void> {
        logger.debug("Выполняется проверка просроченных попыток...")

        try {
            // Получение просроченных попыток из базы данных
            const expiredAttempts = await attemptRepository.findExpired(this.batchSize)

            if (expiredAttempts.length > 0) {
                logger.info(`Найдено ${expiredAttempts.length} просроченных попыток`)

                // Извлечение ID попыток для массового обновления
                const attemptIds = expiredAttempts.map(attempt => attempt.id)

                // Обновление статус в базе данных
                await attemptRepository.updateStatuses(attemptIds, TestAttemptStatus.EXPIRED)

                // Очистка кеша в Redis для каждой просроченной попытки
                const redisPromises = []
                for (const attempt of expiredAttempts) {
                    redisPromises.push(redisClient.del(`attempt:${attempt.id}`))
                    redisPromises.push(redisClient.del(`user-attempt:${attempt.userId}`))
                }

                // Ожидание завершения всех операций с Redis
                await Promise.all(redisPromises)

                logger.info(`Успешно обработано ${expiredAttempts.length} просроченных попыток`)
            } else {
                logger.debug("Просроченных попыток не обнаружено")
            }
        } catch (error) {
            logger.error("Ошибка при проверке просроченных попыток:", error)
            throw error // Проброс ошибки для обработки на уровне выше
        }
    }
}

export const expiredAttemptsJob = new ExpiredAttemptsJob()
