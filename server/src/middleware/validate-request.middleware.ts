import ApiError from "@/exceptions/api-error"
import { NextFunction, Request, Response } from "express"
import { AnyZodObject, ZodError } from "zod"

export const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            })
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const firstIssue = error.issues[0]
                const message = `Ошибка валидации. ${firstIssue.message}`
                next(ApiError.BadRequest(message, error.issues))
            } else {
                next(error)
            }
        }
    }
}
