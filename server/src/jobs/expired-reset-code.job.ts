import { userRepository } from "@/repositories"
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis"
import cron from "node-cron"

class ExpiredResetCodesJob {
    private task: cron.ScheduledTask | null = null
    private readonly cronExpression: string = "0 0 * * *" // Каждый день в 00:00
    private readonly batchSize: number = 100

    public start(): void {
        if (this.task === null) {
            logger.info("Запуск планировщика проверки просроченных кодов сброса пароля")

            this.task = cron.schedule(this.cronExpression, () => {
                this.checkExpiredCodes().catch(error => {
                    logger.error("Ошибка при выполнении плановой проверки просроченных кодов:", error)
                })
            })

            this.checkExpiredCodes().catch(error => {
                logger.error("Ошибка при начальной проверке просроченных кодов:", error)
            })
        }
    }

    public stop(): void {
        if (this.task !== null) {
            this.task.stop()
            this.task = null
            logger.info("Планировщик проверки просроченных кодов остановлен")
        }
    }

    public async checkExpiredCodes(): Promise<void> {
        logger.debug("Выполняется проверка просроченных кодов сброса пароля...")

        try {
            const expiredCodes = await userRepository.findExpiredResetCodes(this.batchSize)

            if (expiredCodes.length > 0) {
                logger.info(`Найдено ${expiredCodes.length} просроченных кодов сброса пароля`)

                // Обновление в базе данных
                const redisPromises = expiredCodes.map(user => redisClient.del(`user:${user.id}`))
                await userRepository.deleteResetCodesByUsersIds(expiredCodes.map(user => user.id))
                await Promise.all(redisPromises)
                logger.info(`Успешно обработано ${expiredCodes.length} просроченных кодов сброса пароля`)
            } else {
                logger.debug("Просроченных кодов сброса пароля не обнаружено")
            }
        } catch (error) {
            logger.error("Ошибка при проверке просроченных кодов сброса пароля:", error)
            throw error
        }
    }
}

export const expiredResetCodesJob = new ExpiredResetCodesJob()
