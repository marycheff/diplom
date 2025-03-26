import ApiError from "@/exceptions/api-error"
import testService from "@/services/tests/test.service"
import { QuestionDTO, TestDTO, TestSettingsDTO, UpdateTestDTO } from "@/types/test.types"

import { NextFunction, Request, Response } from "express"

class TestController {
    // Создание пустого теста
    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.id
            const testData: TestDTO = req.body
            if (!authorId) {
                throw ApiError.Unauthorized()
            }
            const createdTest = await testService.createTest(authorId, testData)
            res.status(201).json(createdTest)
        } catch (error) {
            next(error)
        }
    }

    // Добавление вопросов к тесту
    async updateTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const userId = req.user?.id
            const updateTestData: UpdateTestDTO = {
                questions: req.body.questions.map((question: QuestionDTO, index: number) => ({
                    ...question,
                    order: index + 1,
                })),
            }
            if (!userId) throw ApiError.Unauthorized()
            const updatedTest = await testService.addQuestions(testId, userId, updateTestData)
            res.json(updatedTest)
        } catch (error) {
            next(error)
        }
    }
    async updateTestSettings(req: Request, res: Response, next: NextFunction) {
        try {
            const testId = req.test?.id
            const settings: TestSettingsDTO = req.body
            if (settings.timeLimit !== undefined && settings.timeLimit !== null && settings.timeLimit <= 0) {
                throw ApiError.BadRequest("Лимит времени должен быть положительным числом или null")
            }
            await testService.updateTestSettings(testId!, settings)
            res.status(200).json({ message: "Настройки теста успешно изменены" })
        } catch (error) {
            next(error)
        }
    }
    async getUserTests(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            if (!userId) {
                throw ApiError.Unauthorized()
            }
            const tests = await testService.getUserTests(userId)
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }
    async getAllTests(req: Request, res: Response, next: NextFunction) {
        try {
            const page = parseInt(req.query.page as string) || 1
            const limit = parseInt(req.query.limit as string) || 10

            if (page < 1 || limit < 1) {
                throw ApiError.BadRequest("Страница и лимит должны быть положительными числами")
            }
            const tests = await testService.getAllTests(page, limit)
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }

    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            await testService.deleteTest(testId)
            res.status(200).json({ message: "Тест успешно удален" })
        } catch (error) {
            next(error)
        }
    }

    async getTestById(req: Request, res: Response, next: NextFunction) {
        try {
            const test = req.test
            res.status(200).json(test)
        } catch (error) {
            next(error)
        }
    }
    async searchTests(req: Request, res: Response, next: NextFunction) {
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

            const users = await testService.searchTests(query, page, limit)
            res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new TestController()
