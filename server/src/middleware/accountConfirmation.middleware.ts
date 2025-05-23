import { ApiError } from "@/exceptions/api-error"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"

const LOG_NAMESPACE = "AccountActivationMiddleware"
export const accountActivationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.isActivated) {
            logger.warn(`[${LOG_NAMESPACE}] Попытка доступа пользователя с неактивированным аккаунтом`, {
                userId: req.user?.id,
                path: req.path,
                method: req.method,
                ip: req.ip,
            })
            return next(ApiError.BadRequest("Аккаунт не активирован"))
        }
        logger.debug(`[${LOG_NAMESPACE}] Успешная проверка на активацию`, {
            userId: req.user.id,
            path: req.path,
            method: req.method,
            ip: req.ip,
        })
        next()
    } catch (error) {
        logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке активации аккаунта`, {
            path: req.path,
            method: req.method,
            ip: req.ip,
            error: error instanceof Error ? error.message : String(error),
        })
        return next(ApiError.Unauthorized())
    }
}
