import { envConfig } from "@/config/env-config"
import { gigaChatService, gigaChatTokenService } from "@/services"
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
}

export const gigaChatController = new GigaChatController()
