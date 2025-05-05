import { logger } from "../utils/logger"
import { expiredAttemptsJob } from "./expired-attempts.job"

export function initializeJobs(): void {
    logger.info("Инициализация фоновых задач...")

    // Запуск задачи проверки просроченных попыток
    // expiredAttemptsJob.start()

    logger.info("Все фоновые задачи успешно запущены")
}

export function shutdownJobs(): void {
    logger.info("Остановка фоновых задач...")

    // Остановка задачи  проверки просроченных попыток
    expiredAttemptsJob.stop()

    logger.info("Все фоновые задачи успешно остановлены")
}

export { expiredAttemptsJob }
