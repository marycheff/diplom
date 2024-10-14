import { validationResult } from "express-validator"
import { Request, Response, NextFunction } from "express"
import ApiError from "../exceptions/api-error"

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
    }
    next()
}

export default validateRequest
