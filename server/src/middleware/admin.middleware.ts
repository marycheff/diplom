import { ApiError } from "@/exceptions"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"

const LOG_NAMESPACE = "AdminMiddleware"

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = req.user

		if (!user) {
			logger.warn(`[${LOG_NAMESPACE}] Попытка доступа к ресурсу администратора без данных пользователя`, {
				path: req.path,
				method: req.method,
				ip: req.ip
			})
			return next(ApiError.Unauthorized())
		}

		if (user.role !== "ADMIN") {
			logger.warn(`[${LOG_NAMESPACE}] Попытка доступа к ресурсу администратора с недостаточными правами`, {
				userId: user.id,
				role: user.role,
				path: req.path,
				method: req.method,
				ip: req.ip
			})
			return next(ApiError.Forbidden())
		}

		logger.debug(`[${LOG_NAMESPACE}] Успешная авторизация администратора`, {
			userId: user.id,
			path: req.path,
			method: req.method
		})

		next()
	} catch (error) {
		logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке прав администратора`, {
			path: req.path,
			method: req.method,
			ip: req.ip,
			error: error instanceof Error ? error.message : String(error)
		})
		return next(ApiError.Unauthorized())
	}
}
