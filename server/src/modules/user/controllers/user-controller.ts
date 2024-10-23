import ApiError from "@exceptions/api-error"
import { NextFunction, Request, Response } from "express"
import userService from "../services/user-service"

class UserController {
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await userService.getUsers()
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
    async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, oldPassword, newPassword } = req.body
            await userService.updatePassword(email, oldPassword, newPassword)
            res.json({ message: "Пароль успешно обновлен" })
        } catch (e) {
            next(e)
        }
    }
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params
            const user = await userService.getUserByEmail(email)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const userIdFromToken = (req as any).user.id // Получаем ID текущего пользователя из токена

            // Если пользователь не администратор и не запрашивает свою собственную информацию
            if (id !== userIdFromToken && (req as any).user.role !== "ADMIN") {
                return next(ApiError.Forbidden())
            }

            const user = await userService.getUserById(id)
            res.json(user)
        } catch (e) {
            next(e)
        }
    }
    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params // Получаем id пользователя из параметров запроса
            const updateData = req.body // Данные для обновления передаются в теле запроса

            // Вызываем метод userService для обновления данных пользователя
            await userService.updateUser(id, updateData)

            // Отправляем успешный ответ
            res.json({ message: "Данные пользователя успешно обновлены" })
        } catch (e) {
            next(e) // Передаем ошибку в middleware для обработки
        }
    }
}

export default new UserController()
