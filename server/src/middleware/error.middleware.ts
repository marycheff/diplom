import { ApiError } from "@/exceptions/api-error"
import { logger } from "@/utils/logger"
import { NextFunction, Request, Response } from "express"

const LOG_NAMESPACE = "ErrorMiddleware"

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        logger.warn(`[${LOG_NAMESPACE}]`, {
            message: err.message,
            status: err.status,
            errors: err.errors,
            path: req.path,
            method: req.method,
            userId: req.user?.id,
        })
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors,
        })
    }

    logger.error(`[${LOG_NAMESPACE}]`, {
        message: "Непредвиденная ошибка",
        error: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        userId: req.user?.id,
        ip: req.ip,
    })

    return res.status(500).json({
        message: "Непредвиденная ошибка",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
    })
}
