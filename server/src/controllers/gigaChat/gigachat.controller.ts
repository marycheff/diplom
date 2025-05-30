import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { gigaChatService, gigaChatTokenService, questionService, testService } from "@/services"
import { NextFunction, Request, Response } from "express"

class GigaChatController {
	// Генерация ответов от GigaChat
	async generateAnswers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { question, answer, numOfAnswers } = req.body
			const token = await gigaChatTokenService.getAccessToken(envConfig.GIGACHAT_AUTH_DATA)
			const parsedAnswers = await gigaChatService.generateAnswers({ token, numOfAnswers, question, answer })
			res.status(200).json(parsedAnswers)
		} catch (e) {
			next(e)
		}
	}
	// Генерация теста от GigaChat
	async generateTest(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { topic, numOfQuestions } = req.body
			const authorId = req.user?.id
			if (!authorId) {
				throw ApiError.Unauthorized()
			}

			const token = await gigaChatTokenService.getAccessToken(envConfig.GIGACHAT_AUTH_DATA)
			const questions = await gigaChatService.generateTest(token, topic, numOfQuestions)

			const test = await testService.createTest(authorId, { title: topic })

			const updatedQuestions = await questionService.upsertQuestions(test.id, questions, true)

			res.status(200).json({ ...test, questions: updatedQuestions })
		} catch (e) {
			next(e)
		}
	}
}

export const gigaChatController = new GigaChatController()
