import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import ApiError from "../../../exceptions/api-error"
import authService from "../services/auth-service"

class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const userData = await authService.registration(req.body)
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
        } catch (e: any) {
            next(e)
        }
    }
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            await authService.activate(activationLink)

            if (!process.env.CLIENT_URL) {
                throw new Error("CLIENT_URL environment variable is not set")
            }
            return res.redirect(process.env.CLIENT_URL)
        } catch (e: any) {
            next(e)
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
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 дней
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

export default new AuthController()
