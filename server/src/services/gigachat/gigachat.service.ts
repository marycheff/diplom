import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { ChatContentResponse, GetChatContentParams } from "@/types"
import { logger } from "@/utils/logger"
import axios from "axios"
import https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })
const LOG_NAMESPACE = "GigaChatService"

class GigaChatService {
    async generateAnswers({ token, numOfAnswers, question, answer }: GetChatContentParams): Promise<string[]> {
        logger.debug(
            `[${LOG_NAMESPACE}] Генерация ответов. Вопрос: "${question}", правильный: "${answer}", кол-во: ${numOfAnswers}`
        )

        const content =
            numOfAnswers === 1
                ? `Я задам вопрос. Ты должен придумать 1 неправильный вариант ответа. Нумеруй свой ответ цифрой 1. Ответ не должен совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа: 1. Ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`
                : `Я задам вопрос. Ты должен придумать ${numOfAnswers} абсолютно неправильных ответа. Нумеруй свои ответы цифрами. На конце каждого ответа ставь точку. Если в твоем ответе только число. То этот ответ запиши в кавычках:  Пример: "23".Ответы не должны совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа должен быть таким же, как и правильный ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`

        const postData = {
            model: "GigaChat",
            messages: [{ role: "user", content }],
            stream: false,
            repetition_penalty: 1,
        }

        const requestOptions = {
            method: "POST" as const,
            url: envConfig.GIGACHAT_URL,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            data: postData,
            httpsAgent,
        }

        try {
            logger.debug(`[${LOG_NAMESPACE}] Отправка запроса к GigaChat`)
            const response = await axios<ChatContentResponse>(requestOptions)
            logger.debug(`[${LOG_NAMESPACE}] Ответ от GigaChat: ${JSON.stringify(response.data)}`)

            if (!response.data.choices || response.data.choices.length === 0) {
                throw ApiError.InternalError("Ответ не найден в ответе от API")
            }

            const content = response.data.choices[0].message.content
            let parsedAnswers = this.parseAnswers(content)

            if (parsedAnswers.length > numOfAnswers) {
                parsedAnswers = parsedAnswers.slice(0, numOfAnswers)
            }

            if (parsedAnswers.length < numOfAnswers) {
                throw ApiError.BadRequest(
                    "Нейросеть сгенерировала недостаточное кол-во ответов. Попробуйте еще раз или смените вопрос."
                )
            }

            const hasValidAnswers = parsedAnswers.some(ans => ans.trim() !== "")
            if (!hasValidAnswers) {
                throw ApiError.BadRequest("Некорректный вопрос, попробуйте задать другой.")
            }

            logger.debug(`[${LOG_NAMESPACE}] Ответы успешно сгенерированы: ${JSON.stringify(parsedAnswers)}`)
            return parsedAnswers
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка генерации: ${error}`)
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при получении контента")
        }
    }

    private parseAnswers = (response: string | undefined): string[] => {
        if (!response) return []

        const answers: string[] = []

        if (/\d+\./.test(response)) {
            const regex = /\d+\.\s*([^.]+)\./g
            let match
            while ((match = regex.exec(response)) !== null) {
                answers.push(match[1].trim())
            }
        } else {
            const regex = /([^.]+)\./g
            let match
            while ((match = regex.exec(response)) !== null) {
                answers.push(match[1].trim())
            }
        }

        return answers
    }
}

export const gigaChatService = new GigaChatService()
