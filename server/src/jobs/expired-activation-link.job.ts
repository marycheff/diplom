import { userRepository } from "@/repositories/auth/user.repository"
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis-client"
import cron from "node-cron"

class ExpiredActivationLinksJob {
    private task: cron.ScheduledTask | null = null
    private readonly cronExpression: string = "0 0 * * *" // Каждый день в 00:00
    private readonly batchSize: number = 100

    public start(): void {
        if (this.task === null) {
            logger.info("Запуск планировщика проверки просроченных ссылок активации")

            this.task = cron.schedule(this.cronExpression, () => {
                this.checkExpiredLinks().catch(error => {
                    logger.error("Ошибка при выполнении плановой проверки просроченных ссылок:", error)
                })
            })

            this.checkExpiredLinks().catch(error => {
                logger.error("Ошибка при начальной проверке просроченных ссылок:", error)
            })
        }
    }

    public stop(): void {
        if (this.task !== null) {
            this.task.stop()
            this.task = null
            logger.info("Планировщик проверки просроченных ссылок остановлен")
        }
    }

    public async checkExpiredLinks(): Promise<void> {
        logger.debug("Выполняется проверка просроченных ссылок активации...")

        try {
            const expiredLinks = await userRepository.findExpiredActivationLinks(this.batchSize)

            if (expiredLinks.length > 0) {
                logger.info(`Найдено ${expiredLinks.length} просроченных ссылок активации`)

                // Обновление в базе данных
                const redisPromises = expiredLinks.map(user => redisClient.del(`user:${user.id}`))
                await userRepository.deleteActivationLinksByUsersIds(expiredLinks.map(user => user.id))
                await Promise.all(redisPromises)
                logger.info(`Успешно обработано ${expiredLinks.length} просроченных ссылок активации`)
            } else {
                logger.debug("Просроченных ссылок активации не обнаружено")
            }
        } catch (error) {
            logger.error("Ошибка при проверке просроченных ссылок активации:", error)
            throw error
        }
    }
}

export const expiredActivationLinksJob = new ExpiredActivationLinksJob()
