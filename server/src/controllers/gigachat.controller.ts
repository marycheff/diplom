import { envConfig } from "@/config/env-config"
import gigachatTokenService from "@/services/gigachat/gigachat-token.service"

import gigachatService from "@/services/gigachat/gigachat.service"
import { NextFunction, Request, Response } from "express"

class GigaChatController {
    async generateAnswers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { question, answer, numOfAnswers } = req.body

            const token = await gigachatTokenService.getAccessToken(envConfig.GIGACHAT_AUTH_DATA)

            const parsedAnswers = await gigachatService.generateAnswers({ token, numOfAnswers, question, answer })

            res.status(200).json(parsedAnswers)
        } catch (e) {
            next(e)
        }
    }
}

export default new GigaChatController()
