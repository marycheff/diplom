import ApiError from "@/exceptions/api-error"
import testService from "@/services/test.service"
import {QuestionDTO, TestDTO, TestSettingsDTO, UpdateTestDTO } from "@/types/test.types"

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
            const tests = await testService.getAllTests()
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
    async getQuestionById(req: Request, res: Response, next: NextFunction) {
        try {
            const question = req.question
            res.json(question)
        } catch (error) {
            next(error)
        }
    }
    async deleteQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            await testService.deleteQuestion(questionId)
            res.status(200).json({ message: "Вопрос успешно удален" })
        } catch (error) {
            next(error)
        }
    }
    async deleteAllQuestions(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            await testService.deleteAllQuestions(testId)
            res.status(200).json({ message: "Все вопросы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }
    async deleteAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const answer = req.answer
            if (answer) await testService.deleteAnswer(answer)
            res.status(200).json({ message: "Ответ успешно удален" })
        } catch (e) {
            next(e)
        }
    }
    async deleteAllAnswers(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            await testService.deleteAllAnswers(questionId)
            res.status(200).json({ message: "Все ответы успешно удалены" })
        } catch (error) {
            next(error)
        }
    }

    async updateQuestion(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId } = req.params
            const updateQuestionData: QuestionDTO = req.body
            await testService.updateQuestion(questionId, updateQuestionData)
            res.status(200).json({ message: "Ответ успешно обновлен", data: updateQuestionData })
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

    // Начать попытку прохождения теста
    async startTestAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { testId } = req.params
            const userId = req.user?.id
            const userData = req.body.userData

            const result = await testService.startTestAttempt(testId, userData, userId)

            res.status(201).json(result)
        } catch (e) {
            next(e)
        }
    }

    // Сохранить ответ
    async saveAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const { questionId, answerId } = req.body

            await testService.saveAnswer(attemptId, questionId, answerId)
            res.status(204).send()
        } catch (e) {
            next(e)
        }
    }

    // Завершить попытку
    async completeTestAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const result = await testService.completeTestAttempt(attemptId)
            res.json(result)
        } catch (e) {
            next(e)
        }
    }
    // Получить все попытки
    async getAllAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            // const userId = req.user?.id
            // if (!userId) throw ApiError.Unauthorized()
            const attempts = await testService.getAllAttempts()
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }

    //Получить конкретную попытку
    async getAttempt(req: Request, res: Response, next: NextFunction) {
        try {
            const { attemptId } = req.params
            const attempt = await testService.getAttempt(attemptId)
            res.json(attempt)
        } catch (error) {
            next(error)
        }
    }

    //
    async getUserAttempts(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            // const { attemptId } = req.body
            // TODO: АДМИН или не АДМИН

            if (!userId) throw ApiError.Unauthorized()
            const attempts = await testService.getUserAttempts(userId)
            res.json(attempts)
        } catch (error) {
            next(error)
        }
    }
}

export default new TestController()
