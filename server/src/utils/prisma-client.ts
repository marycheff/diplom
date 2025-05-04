import { PrismaClient } from "@prisma/client"
import { logger } from "../utils/logger"
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
                    args,
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
                    error: error instanceof Error ? error.message : String(error),
                })
                throw error
            }
        },
    },
})

export { prisma }
