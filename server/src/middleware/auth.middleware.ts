import { UserDto } from "@/dtos/user.dto"
import ApiError from "@/exceptions/api-error"
import tokenService from "@/services/token.service"
import { NextFunction, Request, Response } from "express"

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            return next(ApiError.Unauthorized())
        }
        const accessToken = authorizationHeader.split(" ")[1]
        if (!accessToken) {
            return next(ApiError.Unauthorized())
        }
        const userData = tokenService.validateAccessToken(accessToken) as UserDto
        if (!userData) {
            return next(ApiError.Unauthorized())
        }

        // Добавляем userData в req
        req.user = userData
        next()
    } catch (error) {
        return next(ApiError.Unauthorized())
    }
}
