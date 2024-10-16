import { Request, Response } from "express"
import { getChatContent } from "../services/chat-service"
import { getAccessToken } from "../services/token-service"


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

            // Проверка на наличие обязательных полей
            if (!question || !answer || !numOfAnswers) {
                res.status(400).json({ message: "Missing required fields" })
                return
            }

            // Получаем токен для работы с нейросетью
            const token = await getAccessToken(process.env.AUTH_DATA || "")

            // Запрашиваем ответы у нейросети
            const generatedAnswers = await getChatContent(token, numOfAnswers, question, answer)

            // Парсим ответы
            const parsedAnswers = parseAnswers(generatedAnswers)

            // Проверяем, не являются ли все ответы пустыми
            const hasValidAnswers = parsedAnswers.some((ans: string) => ans.trim() !== "")

            // Если все ответы пустые, возвращаем сообщение об ошибке
            if (!hasValidAnswers) {
                res.status(400).json({ message: "Некорректный вопрос, попробуйте задать другой." })
                return
            }

            // Если есть валидные ответы, возвращаем их
            res.status(200).json({ generatedAnswers: parsedAnswers })
        } catch (error: any) {
            console.error(error)
            res.status(500).json({ message: "Internal server error", error: error.message })
        }
    }
}

export default new ChatController()
