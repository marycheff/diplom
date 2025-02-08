import { NextFunction, Request, Response } from "express"

import ApiError from "@/exceptions/api-error"
import userService from "@/services/user.service"

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
            res.status(200).json({ message: "Пароль успешно обновлен" })
        } catch (e) {
            next(e)
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params
            const user = await userService.getUserByEmail(email)
            res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const userIdFromToken = req.user?.id // Получаем ID текущего пользователя из токена

            // Если пользователь не администратор и не запрашивает свою собственную информацию
            if (id !== userIdFromToken && req.user?.role !== "ADMIN") {
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
            const { id } = req.params
            if (!(await userService.getUserById(id))) {
                ApiError.BadRequest("Нет такого пользователя")
                return
            }
            const updateData = req.body
            await userService.updateUser(id, updateData)
            res.status(200).json({ message: "Данные пользователя успешно обновлены" })
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!(await userService.getUserById(id))) {
                //Проверяем, что пользователь существует
                ApiError.BadRequest("Нет такого пользователя")
                return
            }
            await userService.deleteUser(id)
            res.status(200).json({ message: "Пользователь успешно удален" })
        } catch (e) {
            next(e)
        }
    }

    async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await userService.blockUser(id)
            res.status(200).json({ message: "Пользователь успешно заблокирован" })
        } catch (e) {
            next(e)
        }
    }

    async unblockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            await userService.unblockUser(id)
            res.status(200).json({ message: "Пользователь успешно разблокирован" })
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController()
