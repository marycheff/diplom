import { ApiError } from "@/exceptions"
import { attemptService, testService } from "@/services"
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

export const attemptOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const context = `[${LOG_NAMESPACE} {Attempt}]`

	try {
		const attemptId = req.params.attemptId
		const user = req.user

		logger.debug(`${context} Начало проверки прав на попытку попытки`, {
			attemptId,
			userId: user?.id,
			path: req.path,
		})
		if (!isValidUUID(attemptId)) {
			logger.warn(`${context} Некорректный UUID попытки`, { attemptId })
			console.log(attemptId)
			return next(ApiError.BadRequest("Некорректный ID попытки"))
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


export const accountOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const context = `[${LOG_NAMESPACE} {Account}]`

	try {
		const userId = req.params.userId
		const currentUser = req.user

		logger.debug(`${context} Проверка доступа к аккаунту`, {
			requestedUserId: userId,
			currentUserId: currentUser?.id,
			userRole: currentUser?.role,
			path: req.path,
		})

		if (!userId || !isValidUUID(userId)) {
			logger.warn(`${context} Некорректный или отсутствующий ID пользователя`, { userId })
			return next(ApiError.BadRequest("Некорректный или отсутствующий ID пользователя"))
		}

		if (!currentUser) {
			logger.warn(`${context} Пользователь не авторизован`)
			return next(ApiError.Unauthorized())
		}

		if (userId !== currentUser.id && currentUser.role !== "ADMIN") {
			logger.warn(`${context} Доступ запрещён`, {
				requestedUserId: userId,
				currentUserId: currentUser.id,
				userRole: currentUser.role,
			})
			return next(ApiError.Forbidden())
		}

		logger.info(`${context} Доступ разрешён`, {
			requestedUserId: userId,
			currentUserId: currentUser.id,
		})

		next()
	} catch (error) {
		logger.error(`${context} Ошибка при проверке доступа к аккаунту`, {
			error: error instanceof Error ? error.stack : error,
			requestedUserId: req.params.userId,
		})
		next(error)
	}
}