import ApiError from "@/exceptions/api-error"
import testService from "@/services/test.service"
import { IQuestion, ITest, IUpdateTest } from "@/types/test.types"

import { NextFunction, Request, Response } from "express"

class TestController {
    // Создание пустого теста
    async createTest(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.user?.id
            const testData: ITest = req.body

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
            const updateTestData: IUpdateTest = {
                questions: req.body.questions.map((question: IQuestion, index: number) => ({
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

    async updateQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const user = req.user
            const updateQuestionData: IQuestion = req.body
            if (!user || !updateQuestionData) throw ApiError.Unauthorized()
            await testService.updateQuestion(questionId, user, updateQuestionData)
            res.status(200).json({ message: "Ответ успешно обновлен", data: updateQuestionData })
        } catch (error) {
            next(error)
        }
    }

    async getTestById(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const test = await testService.getTestById(testId)
            res.status(200).json(test)
        } catch (error) {
            next(error)
        }
    }
    async getTestQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const questions = await testService.getTestQuestions(testId)
            res.json(questions)
        } catch (error) {
            next(error)
        }
    }
    async getQuestionAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const answers = await testService.getQuestionAnswers(questionId)
            res.json(answers)
        } catch (error) {
            next(error)
        }
    }
}

export default new TestController()
