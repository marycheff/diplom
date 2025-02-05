import ApiError from "@/exceptions/api-error"
import tokenService from "@/services/token.service"
import { NextFunction, Request, Response } from "express"

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(" ")[1]
        if (!accessToken) {
            return next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if (!userData) {
            return next(ApiError.UnauthorizedError())
        }

        // Добавляем userData в req
        ;(req as any).user = userData
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}

// Новое middleware для проверки роли ADMIN
export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = (req as any).user
        if (user.role !== "ADMIN") {
            return next(ApiError.Forbidden())
        }
        next()
    } catch (error) {
        return next(ApiError.UnauthorizedError())
    }
}
