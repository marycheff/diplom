import { ApiError } from "@/exceptions"
import { userService } from "@/services"
import { NextFunction, Request, Response } from "express"

class UserController {
	// Получение всех пользователей
	async getAllUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const page = parseInt(req.query.page as string) || 1
			const limit = parseInt(req.query.limit as string) || 10
			if (page < 1 || limit < 1) {
				throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
			}
			const users = await userService.getAllUsers(page, limit)
			res.status(200).json(users)
		} catch (e) {
			next(e)
		}
	}

	// Получение пользователя по email
	async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.params
			const user = await userService.getUserByEmail(email)
			res.status(200).json(user)
		} catch (e) {
			next(e)
		}
	}

	// Получение пользователя по id
	async getUserById(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			if (userId !== req.user?.id && req.user?.role !== "ADMIN") {
				return next(ApiError.Forbidden())
			}

			const user = await userService.getUserById(userId)
			res.status(200).json(user)
		} catch (e) {
			next(e)
		}
	}

	// Поиск пользователей
	async searchUsers(req: Request, res: Response, next: NextFunction) {
		try {
			const page = parseInt(req.query.page as string) || 1
			const limit = parseInt(req.query.limit as string) || 10
			const query = req.query.query as string

			if (page < 1 || limit < 1) {
				throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
			}

			if (!query) {
				throw ApiError.BadRequest("Нет поискового запроса")
			}

			const users = await userService.searchUsers(query, page, limit)
			res.status(200).json(users)
		} catch (e) {
			next(e)
		}
	}

	// Обновление пароля
	async updatePassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, oldPassword, newPassword } = req.body
			await userService.updatePassword(email, oldPassword, newPassword)
			res.status(200).json({ message: "Пароль успешно обновлен" })
		} catch (e) {
			next(e)
		}
	}

	// Создание пользователя
	async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userData = await userService.createUser(req.body)
			res.status(201).json(userData)
		} catch (e) {
			next(e)
		}
	}

	// Обновление пользователя
	async updateUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			if (!(await userService.getUserById(userId))) {
				ApiError.BadRequest("Нет такого пользователя")
				return
			}
			const updateData = req.body
			await userService.updateUser(userId, updateData)
			res.status(200).json({ message: "Данные пользователя успешно обновлены" })
		} catch (e) {
			next(e)
		}
	}

	// Удаление пользователя
	async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			if (!(await userService.getUserById(userId))) {
				ApiError.BadRequest("Нет такого пользователя")
				return
			}
			await userService.deleteUser(userId)
			res.status(200).json({ message: "Пользователь успешно удален" })
		} catch (e) {
			next(e)
		}
	}

	// Блокировка пользователя
	async blockUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			await userService.blockUser(userId)
			res.status(200).json({ message: "Пользователь успешно заблокирован" })
		} catch (e) {
			next(e)
		}
	}

	// Разблокировка пользователя
	async unblockUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req.params
			await userService.unblockUser(userId)
			res.status(200).json({ message: "Пользователь успешно разблокирован" })
		} catch (e) {
			next(e)
		}
	}
}

export const userController = new UserController()
