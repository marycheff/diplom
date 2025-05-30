import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis/redis-client"

const LOG_NAMESPACE = "RedisUtils"

/**
 * Удаляет все ключи кэша, связанные с тестом
 * @param testId - ID теста
 */
export async function deleteTestCache(testId: string): Promise<void> {
	try {
		const keys = await redisClient.keys(`*${testId}*`)
		if (keys.length > 0) {
			await redisClient.del(keys)
			logger.debug(`[${LOG_NAMESPACE}] Удалены ключи кэша`, { testId, keys })
		}
	} catch (error) {
		logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении кэша теста`, {
			testId,
			error: error instanceof Error ? error.message : String(error)
		})
	}
}

/**
 * Удаляет все ключи кэша, связанные с попыткой
 * @param attemptId - ID попытки
 */
export async function deleteAttemptCache(attemptId: string): Promise<void> {
	try {
		const allKeys = await redisClient.keys(`*${attemptId}*`)
		const keys = allKeys.filter((key) => key.startsWith("user-attempt:") || key.startsWith("attempt:"))
		if (keys.length > 0) {
			await redisClient.del(keys)
			logger.debug(`[${LOG_NAMESPACE}] Удалены ключи кэша попытки`, { attemptId, keys })
		}
	} catch (error) {
		logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении кэша попытки`, {
			attemptId,
			error: error instanceof Error ? error.message : String(error)
		})
	}
}
