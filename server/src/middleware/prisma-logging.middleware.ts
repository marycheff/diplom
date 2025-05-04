import { Prisma } from "@prisma/client"
import { logger } from "../utils/logger" // путь подкорректируй под свой проект

export function prismaLoggingMiddleware(): Prisma.Middleware {
    return async (params, next) => {
        const start = Date.now()

        try {
            const result = await next(params)
            const duration = Date.now() - start

            logger.debug(`[PRISMA] ${params.model}.${params.action}`, {
                model: params.model,
                action: params.action,
                duration: `${duration}ms`,
                args: params.args,
            })

            return result
        } catch (error) {
            const duration = Date.now() - start

            logger.error(`[PRISMA] Ошибка в ${params.model}.${params.action}`, {
                model: params.model,
                action: params.action,
                duration: `${duration}ms`,
                args: params.args,
                error: error instanceof Error ? error.message : String(error),
            })

            throw error
        }
    }
}
