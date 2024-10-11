import { Request, Response } from "express"
import { getChatContent } from "../service/gigaChat/chat-service"
import { getAccessToken } from "../service/gigaChat/token-service"

// Функция для парсинга ответов
function parseAnswers(response: string): string[] {
    const regex = /\d+\.\s*([^0-9.]+)/g
    const answers: string[] = []
    let match

    while ((match = regex.exec(response)) !== null) {
        answers.push(match[1].trim())
    }
    return answers
}

class ChatController {
    async generateAnswers(req: Request, res: Response): Promise<void> {
        try {
            const { question, answer, numOfAnswers } = req.body
            if (!question || !answer || !numOfAnswers) {
                res.status(400).json({ message: "Missing required fields" })
                return
            }

            // Получаем accessToken от GigaChat
            const token = await getAccessToken(process.env.AUTH_DATA || "")

            // Генерируем ответы через GigaChat API
            const generatedAnswers = await getChatContent(token, numOfAnswers, question, answer)

            // Парсим сгенерированные ответы с помощью parseAnswers
            const parsedAnswers = parseAnswers(generatedAnswers)

            // Возвращаем распарсенные ответы
            res.status(200).json({ generatedAnswers: parsedAnswers })
        } catch (error: any) {
            console.error(error)
            res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}

export default new ChatController()
