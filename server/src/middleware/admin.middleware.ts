import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from "express"

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        if (user?.role !== "ADMIN") {
            return next(ApiError.Forbidden())
        }
        next()
    } catch (error) {
        return next(ApiError.Unauthorized())
    }
}
