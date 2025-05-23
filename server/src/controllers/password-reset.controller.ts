import { ApiError } from "@/exceptions/api-error"
import { mailService } from "@/services/mail.service"
import { generateCode } from "@/utils/math"
import { NextFunction, Request, Response } from "express"
import { passwordResetService } from "../services/auth/password-reset.service"
import { userService } from "../services/auth/user.service"

class PasswordResetController {
    // Запрос на сброс пароля
    async requestReset(req: Request, res: Response, next: NextFunction) {
        const { email } = req.body
        try {
            const user = await userService.getUserByEmail(email)
            const resetCode = generateCode()
            await passwordResetService.saveResetCode(email, resetCode)
            await mailService.sendResetPasswordMail(user.email, resetCode)

            res.status(200).json({ message: "Код для сброса пароля отправлен на вашу почту." })
        } catch (e) {
            next(e)
        }
    }

    // Проверка кода сброса
    async verifyResetCode(req: Request, res: Response, next: NextFunction) {
        const { email, code } = req.body
        try {
            const isValid = await passwordResetService.verifyResetCode(email, code)
            if (!isValid) {
                throw next(ApiError.BadRequest("Неверный код сброса"))
            }
            res.status(200).json({ message: "Код сброса подтвержден." })
        } catch (e) {
            next(e)
        }
    }

    // Сброс пароля
    async resetPassword(req: Request, res: Response, next: NextFunction) {
        const { email, code, newPassword } = req.body
        try {
            const isValid = await passwordResetService.verifyResetCode(email, code)
            if (!isValid) {
                return next(ApiError.BadRequest("Неверный код сброса"))
            }
            await passwordResetService.resetPassword(email, newPassword)
            res.status(200).json({ message: "Пароль успешно изменен." })
        } catch (e) {
            next(e)
        }
    }
}

export const passwordResetController = new PasswordResetController()
