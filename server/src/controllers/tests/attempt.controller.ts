import ApiError from "@/exceptions/api-error"
import attemptService from "@/services/tests/attempt.service"

import { NextFunction, Request, Response } from "express"

class AttemptController {
    // Начать попытку прохождения теста
    async startTestAttempt(req: Request, res: Response, next: NextFunction) {
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

    // Сохранить ответ
    async saveAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const { questionId, answersIds, timeSpent } = req.body

            await attemptService.saveAnswer(attemptId, questionId, answersIds, timeSpent)
            res.status(204).send()
        } catch (e) {
            next(e)
        }
    }
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
            res.json(result)
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
            const attempts = await attemptService.getAll(page, limit)
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }

    //Получить конкретную попытку
    async getAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const attempt = await attemptService.get(attemptId)
            res.json(attempt)
        } catch (error) {
            next(error)
        }
    }
    //Получить конкретную попытку
    async getAttemptResults(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const user = req.user
            const attempt = await attemptService.getWithResults(attemptId, user)
            res.json(attempt)
        } catch (error) {
            next(error)
        }
    }
    //Получить конкретную попытку для пользователя
    async getAttemptForUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const attempt = await attemptService.getForUserById(attemptId)
            res.json(attempt)
        } catch (error) {
            next(error)
        }
    }

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
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }
    async getUserAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params
            // const { attemptId } = req.body
            // TODO: АДМИН или не АДМИН

            if (!userId) throw ApiError.Unauthorized()
            const attempts = await attemptService.getUserAttempts(userId)
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }

    async getTestAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10
            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const { testId } = req.params
            const attempts = await attemptService.getTestAttempts(testId, page, limit)
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }
}
export default new AttemptController()
