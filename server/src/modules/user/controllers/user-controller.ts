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

}

export default new UserController()
