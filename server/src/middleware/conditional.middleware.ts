import { tokenService } from "@/services"
import { UserDTO } from "@/types"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"
const LOG_NAMESPACE = "ConditionalAuth"

export const conditionalAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authorizationHeader = req.headers.authorization
		if (authorizationHeader) {
			const accessToken = authorizationHeader.split(" ")[1]

			if (accessToken) {
				logger.debug(`[${LOG_NAMESPACE}] Проверка access токена`, {
					tokenPrefix: accessToken.slice(0, 6) + "..."
				})

				const userData = tokenService.validateAccessToken(accessToken) as UserDTO

				if (userData) {
					logger.info(`[${LOG_NAMESPACE}] Успешная условная авторизация`, {
						userId: userData.id
					})
					req.user = userData
				} else {
					logger.warn(`[${LOG_NAMESPACE}] Невалидный токен`)
				}
			}
		}
		next()
	} catch (e) {
		logger.error(`[${LOG_NAMESPACE}] Ошибка при условной авторизации`, {
			error: e instanceof Error ? e.stack : e
		})
		next()
	}
}
