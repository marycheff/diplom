import ApiError from "@/exceptions/api-error"
import testService from "@/services/tests/test.service"
import answerService from "@/services/tests/answer.service"
import questionService from "@/services/tests/question.service"
import { NextFunction, Request, Response } from "express"
import { ObjectId } from "mongodb"

export const testOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const testId = req.params.testId

        if (!ObjectId.isValid(testId)) {
            return next(ApiError.BadRequest("Некорректный ID теста"))
        }
        const test = await testService.getTestById(testId)
        if (!test) {
            return next(ApiError.NotFound("Тест не найден"))
        }
        const user = req.user
        if (test.authorId !== user?.id && user?.role !== "ADMIN") {
            return next(ApiError.Forbidden())
        }
        req.test = test
        next()
    } catch (error) {
        next(error)
    }
}

export const questionOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const questionId = req.params.questionId
        if (!ObjectId.isValid(questionId)) {
            return next(ApiError.BadRequest("Некорректный ID теста"))
        }
        const { question, test, belongsToTest } = await questionService.isQuestionBelongsToAnyTest(questionId)
        if (!question) {
            return next(ApiError.NotFound("Вопрос не найден"))
        }
        if (!test) {
            return next(ApiError.NotFound("Тест не найден"))
        }
        if (!belongsToTest) {
            return next(ApiError.BadRequest("Вопрос не принадлежит ни к какому тесту"))
        }
        const user = req.user
        if (test.authorId !== user?.id && user?.role !== "ADMIN") {
            return next(ApiError.Forbidden())
        }

        req.question = question
        next()
    } catch (error) {
        next(error)
    }
}

export const answerOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const answerId = req.params.answerId
        if (!ObjectId.isValid(answerId)) {
            return next(ApiError.BadRequest("Некорректный ID теста"))
        }
        const { answer, question, test, belongsToTest } = await answerService.isAnswerBelongsToAnyTest(answerId)
        if (!answer) {
            return next(ApiError.NotFound("Ответ не найден"))
        }
        if (!question) {
            return next(ApiError.NotFound("Вопрос не найден"))
        }
        if (!test) {
            return next(ApiError.NotFound("Тест не найден"))
        }
        if (!belongsToTest) {
            return next(ApiError.BadRequest("Ответ не принадлежит ни к какому тесту"))
        }
        const user = req.user
        if (test.authorId !== user?.id && user?.role !== "ADMIN") {
            return next(ApiError.Forbidden())
        }

        req.answer = answer
        next()
    } catch (error) {
        next(error)
    }
}
