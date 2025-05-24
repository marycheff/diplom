import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { authService } from "@/services"

import { NextFunction, Request, Response } from "express"

class AuthController {
    // Регистрация
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = await authService.register(req.body)
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

    // Обновление ссылки активации аккаунта
    async updateActivationLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body
            await authService.updateActivationLink(email)
            res.status(200).json({ message: "Ссылка активации отправлена на почту" })
        } catch (e) {
            next(e)
        }
    }

    // Активация аккаунта
    async activate(req: Request, res: Response, next: NextFunction) {
        try {
            const activationLink = req.params.link
            const { accessToken, refreshToken, user } = await authService.activate(activationLink)

            // Устанавливаем куки
            res.cookie("refreshToken", refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })

            // Редирект с токеном в URL
            res.redirect(
                `${envConfig.CLIENT_URL}/activation-success?` +
                    `accessToken=${accessToken}&` +
                    `userId=${user.id}&` +
                    `email=${user.email}`
            )
        } catch (error) {
            if (error instanceof ApiError) {
                return res.redirect(
                    `${envConfig.CLIENT_URL}/activation-error?` + `error=${encodeURIComponent(error.message)}`
                )
            }
            next(error)
        }
    }

    // Вход
    async login(req: Request, res: Response, next: NextFunction) {
        try {
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

    // Выход
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

    // Обновление токена
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

export const authController = new AuthController()
