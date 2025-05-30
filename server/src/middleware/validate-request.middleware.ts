import { ApiError } from "@/exceptions"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"
const LOG_NAMESPACE = "ValidateRequest"

export const validateRequest = (schema: AnyZodObject) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			logger.debug(`[${LOG_NAMESPACE}] Начало валидации запроса`, {
				path: req.path,
				method: req.method
			})

			await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params
			})

			logger.debug(`[${LOG_NAMESPACE}] Валидация успешна`, {
				path: req.path
			})
			next()
		} catch (error) {
			if (error instanceof ZodError) {
				const firstIssue = error.issues[0]
				const message = `Ошибка валидации. ${firstIssue.message}`

				logger.warn(`[${LOG_NAMESPACE}] Ошибка валидации`, {
					path: req.path,
					errors: error.issues.map((i) => ({
						path: i.path,
						message: i.message
					}))
				})

				next(ApiError.BadRequest(message, error.issues))
			} else {
				logger.error(`[${LOG_NAMESPACE}] Неизвестная ошибка`, {
					error: error instanceof Error ? error.stack : error
				})
				next(error)
			}
		}
	}
}
