import { ApiError } from "@/exceptions"
import { answerService, attemptService, questionService, testService } from "@/services"
import { logger } from "@/utils/logger"
import { isValidUUID } from "@/utils/validator"
import { NextFunction, Request, Response } from "express"

const LOG_NAMESPACE = "OwnershipMiddleware"

export const testOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const context = `[${LOG_NAMESPACE} {Test}]`
    try {
        const testId = req.params.testId
        const user = req.user

        logger.debug(`${context} Начало проверки прав на тест`, {
            testId,
            userId: user?.id,
            path: req.path,
        })

        if (!isValidUUID(testId)) {
            logger.warn(`${context} Некорректный UUID теста`, { testId })
            return next(ApiError.BadRequest("Некорректный ID теста"))
        }

        const test = await testService.getTestById(testId)
        if (!test) {
            logger.warn(`${context} Тест не найден`, { testId })
            return next(ApiError.NotFound("Тест не найден"))
        }

        if (test.author.id !== user?.id && user?.role !== "ADMIN") {
            logger.warn(`${context} Отказ в доступе`, {
                userId: user?.id,
                testAuthorId: test.author.id,
                userRole: user?.role,
            })
            return next(ApiError.Forbidden())
        }

        logger.info(`${context} Доступ разрешен`, {
            testId,
            userId: user?.id,
        })
        req.test = test
        next()
    } catch (error) {
        logger.error(`${context} Ошибка проверки прав`, {
            error: error instanceof Error ? error.stack : error,
            testId: req.params.testId,
        })
        next(error)
    }
}

export const questionOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const context = `[${LOG_NAMESPACE} {Question}]`

    try {
        const questionId = req.params.questionId
        const user = req.user

        logger.debug(`${context} Начало проверки прав на вопрос`, {
            questionId,
            userId: user?.id,
        })

        if (!isValidUUID(questionId)) {
            logger.warn(`${context} Некорректный UUID вопроса`, { questionId })
            return next(ApiError.BadRequest("Некорректный ID вопроса"))
        }

        const { question, test, belongsToTest } = await questionService.isQuestionBelongsToAnyTest(questionId)

        if (!question) {
            logger.warn(`${context} Вопрос не найден`, { questionId })
            return next(ApiError.NotFound("Вопрос не найден"))
        }

        if (!test) {
            logger.warn(`${context} Связанный тест не найден`, { questionId })
            return next(ApiError.NotFound("Тест не найден"))
        }

        if (!belongsToTest) {
            logger.warn(`${context} Вопрос не привязан к тесту`, { questionId })
            return next(ApiError.BadRequest("Вопрос не принадлежит ни к какому тесту"))
        }

        if (test.author.id !== user?.id && user?.role !== "ADMIN") {
            logger.warn(`${context} Отказ в доступе`, {
                userId: user?.id,
                testAuthorId: test.author.id,
            })
            return next(ApiError.Forbidden())
        }

        logger.info(`${context} Доступ разрешен`, {
            questionId,
            testId: test.id,
            userId: user?.id,
        })
        req.question = question
        next()
    } catch (error) {
        logger.error(`${context} Ошибка проверки прав`, {
            error: error instanceof Error ? error.stack : error,
            questionId: req.params.questionId,
        })
        next(error)
    }
}

export const answerOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const context = `[${LOG_NAMESPACE} {Answer}]`

    try {
        const answerId = req.params.answerId
        const user = req.user

        logger.debug(`${context} Начало проверки прав на ответ`, {
            answerId,
            userId: user?.id,
        })

        if (!isValidUUID(answerId)) {
            logger.warn(`${context} Некорректный UUID ответа`, { answerId })
            return next(ApiError.BadRequest("Некорректный ID ответа"))
        }

        const { answer, question, test, belongsToTest } = await answerService.isAnswerBelongsToAnyTest(answerId)

        if (!answer) {
            logger.warn(`${context} Ответ не найден`, { answerId })
            return next(ApiError.NotFound("Ответ не найден"))
        }

        if (!question) {
            logger.warn(`${context} Связанный вопрос не найден`, { answerId })
            return next(ApiError.NotFound("Вопрос не найден"))
        }

        if (!test) {
            logger.warn(`${context} Связанный тест не найден`, { answerId })
            return next(ApiError.NotFound("Тест не найден"))
        }

        if (!belongsToTest) {
            logger.warn(`${context} Ответ не привязан к тесту`, { answerId })
            return next(ApiError.BadRequest("Ответ не принадлежит ни к какому тесту"))
        }

        if (test.author.id !== user?.id && user?.role !== "ADMIN") {
            logger.warn(`${context} Отказ в доступе`, {
                userId: user?.id,
                testAuthorId: test.author.id,
            })
            return next(ApiError.Forbidden())
        }

        logger.info(`${context} Доступ разрешен`, {
            answerId,
            questionId: question.id,
            userId: user?.id,
        })
        req.answer = answer
        next()
    } catch (error) {
        logger.error(`${context} Ошибка проверки прав`, {
            error: error instanceof Error ? error.stack : error,
            answerId: req.params.answerId,
        })
        next(error)
    }
}

export const attemptOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const context = `[${LOG_NAMESPACE} {Attempt}]`

    try {
        const attemptId = req.params.attemptId
        const user = req.user

        logger.debug(`${context} Начало проверки прав на попытку теста`, {
            attemptId,
            userId: user?.id,
            path: req.path,
        })
        if (!isValidUUID(attemptId)) {
            logger.warn(`${context} Некорректный UUID теста`, { attemptId })
            return next(ApiError.BadRequest("Некорректный ID теста"))
        }
        const attempt = await attemptService.getAttempt(attemptId)
        if (!attempt) {
            logger.warn(`${context} Попытка не найдена`, { attempt })
            return next(ApiError.NotFound("Тест не найден"))
        }

        if (attempt.test.author.id !== user?.id && user?.role !== "ADMIN") {
            logger.warn(`${context} Отказ в доступе`, {
                userId: user?.id,
                testAuthorId: attempt.test.author.id,
                userRole: user?.role,
            })
            return next(ApiError.Forbidden())
        }
        logger.info(`${context} Доступ разрешен`, {
            attemptId,
            userId: user?.id,
        })
        next()
    } catch (error) {
        logger.error(`${context} Ошибка проверки прав`, {
            error: error instanceof Error ? error.stack : error,
            testId: req.params.testId,
        })
        next(error)
    }
}
