import { ApiError } from "@/exceptions/api-error"
import { tokenService } from "@/services"
import { UserDTO } from "@/types/user/user.types"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"

const LOG_NAMESPACE = "AuthMiddleware"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            logger.warn(`[${LOG_NAMESPACE}] Попытка доступа без токена авторизации`, {
                path: req.path,
                method: req.method,
                ip: req.ip,
            })
            return next(ApiError.Unauthorized())
        }

        const accessToken = authorizationHeader.split(" ")[1]
        if (!accessToken) {
            logger.warn(`[${LOG_NAMESPACE}] Некорректный формат токена авторизации`, {
                path: req.path,
                method: req.method,
                ip: req.ip,
            })
            return next(ApiError.Unauthorized())
        }

        const userData = tokenService.validateAccessToken(accessToken) as UserDTO
        if (!userData) {
            logger.warn(`[${LOG_NAMESPACE}] Недействительный токен авторизации`, {
                path: req.path,
                method: req.method,
                ip: req.ip,
            })
            return next(ApiError.Unauthorized())
        }

        if (userData.isBlocked) {
            logger.warn(`[${LOG_NAMESPACE}] Попытка доступа заблокированного пользователя`, {
                userId: userData.id,
                path: req.path,
                method: req.method,
                ip: req.ip,
            })
            return next(ApiError.Forbidden())
        }

        logger.debug(`[${LOG_NAMESPACE}] Успешная авторизация пользователя`, {
            userId: userData.id,
            path: req.path,
            method: req.method,
        })

        // Добавляем userData в req
        req.user = userData
        next()
    } catch (error) {
        logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке авторизации`, {
            path: req.path,
            method: req.method,
            ip: req.ip,
            error: error instanceof Error ? error.message : String(error),
        })
        return next(ApiError.Unauthorized())
    }
}
