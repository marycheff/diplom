import envConfig from "@/envConfig"
import ApiError from "@/exceptions/api-error"
import authService from "@/services/auth.service"
import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const userData = await authService.registration(req.body)
            if (!userData.refreshToken) {
                throw ApiError.InternalError("Ошибка при генерации refreshToken")
            }
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.status(201).json({
                message: "Пользователь успешно зарегистрирован",
                ...userData,
            })
        } catch (e) {
            next(e)
        }
    }

    async updateActivationLink(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { email } = req.body

            await authService.updateActivationLink(email)

            res.status(200).json({ message: "Ссылка активации отправлена на почту" })
        } catch (e) {
            next(e)
        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)

            return res.redirect(`${envConfig.CLIENT_URL}/activation-success`)
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.status === 400) {
                    return res.redirect(`${envConfig.CLIENT_URL}/activation-error`)
                }
            }
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { email, password } = req.body
            const userData = await authService.login(email, password)
            if (!userData.refreshToken) {
                throw ApiError.InternalError("Ошибка при генерации refreshToken")
            }
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.status(201).json({
                message: "Успешный вход",
                ...userData,
            })
        } catch (e) {
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                throw ApiError.Unauthorized()
            }
            const token = await authService.logout(refreshToken)
            res.clearCookie("refreshToken")
            res.status(200).json({
                message: "Успешный выход",
                token,
            })
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies
            const userData = await authService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 д
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()
