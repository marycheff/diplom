import { ApiError } from "@/exceptions/api-error"
import { attemptService } from "@/services"

import { NextFunction, Request, Response } from "express"

class AttemptController {
    // Начать попытку прохождения теста
    async startAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const userId = req.user?.id
            const userData = req.body?.userData ?? null

            const result = await attemptService.startAttempt(testId, userData, userId)

            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // Сохранить ответы
    async saveAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const { answers } = req.body
            await attemptService.saveAnswers(attemptId, answers)
            res.status(204).send()
        } catch (e) {
            next(e)
        }
    }

    // Завершить попытку
    async completeAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const result = await attemptService.completeAttempt(attemptId)
            res.status(200).json(result)
        } catch (e) {
            next(e)
        }
    }

    // Получить все попытки
    async getAllAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const attempts = await attemptService.getAllAttempts(page, limit)
            res.status(200).json(attempts)
        } catch (error) {
            next(error)
        }
    }

    //Получить конкретную попытку
    async getAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const attempt = await attemptService.getAttempt(attemptId)
            res.status(200).json(attempt)
        } catch (error) {
            next(error)
        }
    }

    //Получить результаты конкретной попытки
    async getAttemptResults(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const user = req.user
            const attempt = await attemptService.getWithResults(attemptId, user)
            res.status(200).json(attempt)
        } catch (error) {
            next(error)
        }
    }

    //Получить конкретную попытку для пользователя
    async getAttemptForUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const userId = req.user?.id
            const attempt = await attemptService.getAttemptForUser(attemptId, userId)
            res.status(200).json(attempt)
        } catch (error) {
            next(error)
        }
    }

    // Получение своих попыток
    async getMyAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }

            if (!userId) throw ApiError.Unauthorized()
            const attempts = await attemptService.getUserAttempts(userId, page, limit)
            res.status(200).json(attempts)
        } catch (error) {
            next(error)
        }
    }

    // Получение попыток конкретного пользователя
    async getUserAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            if (!userId) throw ApiError.Unauthorized()
            const attempts = await attemptService.getUserAttempts(userId, page, limit)
            res.status(200).json(attempts)
        } catch (error) {
            next(error)
        }
    }

    // Получение попыток конкретного теста
    async getTestAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const { testId } = req.params
            const attempts = await attemptService.getTestAttempts(testId, page, limit)
            res.status(200).json(attempts)
        } catch (error) {
            next(error)
        }
    }

    // Обновление времени прохождения
    async updateTimeSpent(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const { timeSpent } = req.body

            await attemptService.updateTimeSpent(attemptId, timeSpent)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
export const attemptController = new AttemptController()
