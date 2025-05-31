import { expiredActivationLinksJob } from "@/jobs/expired-activation-link.job"
import { expiredAttemptsJob } from "@/jobs/expired-attempts.job"
import { expiredResetCodesJob } from "@/jobs/expired-reset-code.job"
import { logger } from "@/utils/logger"

export function initializeJobs(): void {
	logger.info("Инициализация фоновых задач...")

	// Запуск задачи проверки просроченных попыток
	expiredAttemptsJob.start()

	// Запуск задачи проверки просроченных ссылок активации
	expiredActivationLinksJob.start()

	// Запуск задачи проверки просроченных кодов сброса пароля
	expiredResetCodesJob.start()

	logger.info("Все фоновые задачи успешно запущены")
}

export function shutdownJobs(): void {
	logger.info("Остановка фоновых задач...")

	// Остановка задачи проверки просроченных попыток
	expiredAttemptsJob.stop()

	// Остановка задачи проверки просроченных ссылок активации
	expiredActivationLinksJob.stop()

	logger.info("Все фоновые задачи успешно остановлены")
}

export { expiredActivationLinksJob, expiredAttemptsJob }
