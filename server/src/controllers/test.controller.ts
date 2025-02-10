import ApiError from "@/exceptions/api-error"
import testService from "@/services/test.service"
import { CreateQuestion, CreateTest, UpdateTest } from "@/types/test.types" // Обновлено
import { NextFunction, Request, Response } from "express"

class TestController {
    // Создание пустого теста
    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.id
            const testData: CreateTest = req.body

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
            const updateTestData: UpdateTest = {
                questions: req.body.questions.map((question: CreateQuestion, index: number) => ({
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
            const tests = await testService.getAllTests()
            res.json(tests)
        } catch (error) {
            next(error)
        }
    }

    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const user = req.user
            if (!user) throw ApiError.Unauthorized()
            await testService.deleteTest(testId, user)
            res.status(200).json({ message: "Тест успешно удален" })
        } catch (error) {
            next(error)
        }
    }
    async deleteQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const user = req.user
            if (!user) throw ApiError.Unauthorized()
            await testService.deleteQuestion(questionId, user)
            res.status(200).json({ message: "Вопрос успешно удален" })
        } catch (error) {
            next(error)
        }
    }
    async deleteAllQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const user = req.user
            if (!user) throw ApiError.Unauthorized()
            await testService.deleteAllQuestions(testId, user)
            res.status(200).json({ message: "Все вопросы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }
    async deleteAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const { answerId } = req.params
            const user = req.user
            if (!user) throw ApiError.Unauthorized()
            await testService.deleteAnswer(answerId, user)
            res.status(200).json({ message: "Ответ успешно удален" })
        } catch (error) {
            next(error)
        }
    }
    async deleteAllAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const user = req.user
            if (!user) throw ApiError.Unauthorized()
            await testService.deleteAllAnswers(questionId, user)
            res.status(200).json({ message: "Все ответы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }
}

export default new TestController()
