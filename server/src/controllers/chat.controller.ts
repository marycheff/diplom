import envConfig from "@/envConfig"
import ApiError from "@/exceptions/api-error"
import { getAccessToken } from "@/services/gigachat-token.service"
import { getChatContent } from "@/services/gigachat.service"
import { Request, Response } from "express"

// Функция для парсинга ответов
const parseAnswers = (response: string | undefined): string[] => {
    const regex = /^\d+\.\s*(.+)$/gm // Изменено регулярное выражение для захвата текста
    const answers: string[] = []
    let match
    while ((match = regex.exec(response!)) !== null) {
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
                ApiError.BadRequest("Не все данные заполнены")
                return
            }
            // Получаем токен для работы с нейросетью
            const token = await getAccessToken(envConfig.AUTH_DATA as string)

            // Запрашиваем ответы у нейросети
            const generatedAnswers = await getChatContent({ token, numOfAnswers, question, answer })

            // Парсим ответы
            const parsedAnswers = parseAnswers(generatedAnswers)

            // Проверяем, не являются ли все ответы пустыми
            const hasValidAnswers = parsedAnswers.some((ans: string) => ans.trim() !== "")

            // Если все ответы пустые, возвращаем сообщение об ошибке
            if (!hasValidAnswers) {
                ApiError.BadRequest("Некорректный вопрос, попробуйте задать другой.")
                return
            }
            // Если есть валидные ответы, возвращаем их
            res.status(200).json({ generatedAnswers: parsedAnswers })
        } catch (e) {
            ApiError.InternalError()
            return
        }
    }
}

export default new ChatController()
