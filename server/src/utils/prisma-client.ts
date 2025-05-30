import { logger } from "@/utils/logger"
import { PrismaClient } from "@prisma/client"
import { performance } from "perf_hooks"

const prisma = new PrismaClient().$extends({
	query: {
		async $allOperations({ model, operation, args, query }) {
			const start = performance.now()
			try {
				const result = await query(args)
				const end = performance.now()
				const duration = end - start
				logger.debug(`[PRISMA] ${model ? `${model}.${operation}` : operation}`, {
					model,
					operation,
					duration: `${duration}ms`,
					args
				})
				return result
			} catch (error) {
				const end = performance.now()
				const duration = end - start
				logger.error(`[PRISMA] Ошибка в ${model ? `${model}.${operation}` : operation}`, {
					model,
					operation,
					duration: `${duration}ms`,
					args,
					error: error instanceof Error ? error.message : String(error)
				})
				throw error
			}
		}
	}
})
// Функция для выполнения транзакций, которую можно использовать из любого репозитория
const executeTransaction = async <T>(callback: (tx: any) => Promise<T>): Promise<T> => {
	const result = await prisma.$transaction(callback)
	return result as T
}

export { executeTransaction, prisma }
