import ApiError from "@/exceptions/api-error"
import { ChatContentResponse, GetChatContentParams } from "@/types"
import axios from "axios"
import https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const getChatContent = async ({
    token,
    numOfAnswers,
    question,
    answer,
}: GetChatContentParams): Promise<string[]> => {
    const content =
        numOfAnswers === 1
            ? `Я задам вопрос. Ты должен придумать 1 неправильный вариант ответа. Нумеруй свой ответ цифрой 1. Ответ не должен совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа: 1. Ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`
            : `Я задам вопрос. Ты должен придумать ${numOfAnswers} абсолютно неправильных ответа. Нумеруй свои ответы цифрами. На конце каждого ответа ставь точку. Если в твоем ответе только число. То этот ответ запиши в кавычках:  Пример: "23".Ответы не должны совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа должен быть таким же, как и правильный ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`
    const postData = {
        model: "GigaChat",
        messages: [
            {
                role: "user",
                content: content,
            },
        ],

        stream: false,
        repetition_penalty: 1,
    }

    const requestOptions = {
        method: "POST" as const,
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: postData,
        httpsAgent,
    }

    try {
        const response = await axios<ChatContentResponse>(requestOptions)

        if (!response.data.choices || response.data.choices.length === 0) {
            throw ApiError.InternalError("Ответ не найден в ответе от API")
        }
        const content = response.data.choices[0].message.content

        let parsedAnswers = parseAnswers(content)

        // Уменьшение размер массива, если он больше numOfAnswers
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

        return parsedAnswers
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        } else {
            console.error("Неизвестная ошибка:", error)
        }
        throw ApiError.InternalError("Ошибка при получении контента")
    }
}
// Функция для парсинга ответов
const parseAnswers = (response: string | undefined): string[] => {
    // Если строка неопределена или пуста, возвращаем пустой массив
    if (!response) return []

    const answers: string[] = []

    // Содержит ли строка нумерованный формат (например, "1.")
    if (/\d+\./.test(response)) {
        // Нумерованный список
        const regex = /\d+\.\s*([^.]+)\./g
        let match
        while ((match = regex.exec(response)) !== null) {
            answers.push(match[1].trim()) // Извлечение ответа до точки
        }
    } else {
        // Ненумерованный список
        const regex = /([^.]+)\./g
        let match
        while ((match = regex.exec(response)) !== null) {
            answers.push(match[1].trim()) // Извлечение текста до точки
        }
    }

    return answers
}
