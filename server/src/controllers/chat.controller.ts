import { envConfig } from "@/config/env-config"
import ApiError from "@/exceptions/api-error"
import { getAccessToken } from "@/services/gigachat/gigachat-token.service"
import { getChatContent } from "@/services/gigachat/gigachat.service"
import { NextFunction, Request, Response } from "express"

class ChatController {
    async generateAnswers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            const { question, answer, numOfAnswers } = req.body

            if (!question || !answer || !numOfAnswers) {
                return next(ApiError.BadRequest("Не все данные заполнены"))
            }

            const token = await getAccessToken(envConfig.GIGACHAT_AUTH_DATA as string)

            const parsedAnswers = await getChatContent({ token, numOfAnswers, question, answer })

            res.status(200).json(parsedAnswers)
        } catch (e) {
            next(e)
        }
    }
}

export default new ChatController()
