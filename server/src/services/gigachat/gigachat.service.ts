import ApiError from "@/exceptions/api-error"
import { ChatContentResponse, GetChatContentParams } from "@/types"
import axios, { AxiosError } from "axios"
import https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const getChatContent = async ({
    token,
    numOfAnswers,
    question,
    answer,
}: GetChatContentParams): Promise<string | undefined> => {
    const postData = {
        model: "GigaChat",
        messages: [
            {
                role: "user",
                content: `Я задам вопрос. Ты должен придумать ${numOfAnswers} абсолютно неправильных ответа. Нумеруй свои ответы цифрами. Ответы не должны совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа должен быть таким же, как и правильный ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`,
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
        if (response.data.choices && response.data.choices.length > 0) {
            console.log(`Использовано токенов: ${response.data.usage?.total_tokens}`)
            return response.data.choices[0].message.content
        } else {
            throw ApiError.InternalError("Ответ не найден в ответе от API")
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError
            console.error(`Ошибка при получении контента: ${axiosError.message}`, axiosError.response?.data)
        } else {
            console.error("Неизвестная ошибка:", error)
        }
        throw ApiError.InternalError("Ошибка при получении контента")
    }
}
