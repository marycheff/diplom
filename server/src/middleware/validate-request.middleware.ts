import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const combinedMessage = `Ошибка валидации. ${errors.array()[0].msg}`
        return next(ApiError.BadRequest(combinedMessage, errors.array()))
    }
    next()
}

export default validateRequest
