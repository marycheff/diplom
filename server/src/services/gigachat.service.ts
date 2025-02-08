import ApiError from "@/exceptions/api-error"
import axios from "axios"

const httpsAgent = new (require("follow-redirects").https.Agent)({ rejectUnauthorized: false })

interface ChatContentResponse {
    choices: { message: { content: string } }[]
    usage: { total_tokens: number }
}

interface GetChatContentParams {
    token: string
    numOfAnswers: number
    question: string
    answer: string
}

// Функция для отправки запроса к API нейросети и получения ответов
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
                content: `Я напишу тебе вопрос. Ты должен придумать ${numOfAnswers} абсолютно неправильных ответа. Ты должен нумеровать свои ответы цифрами. Твои ответы не должны совпадать с правильным ответом. Ты можешь путать даты, имена, временные промежутки, факты. Формат ответа должен быть таким же, как и правильный ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`,
            },
        ],
        stream: false,
        repetition_penalty: 1,
    }

    const options = {
        method: "POST",
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
        const response = await axios<ChatContentResponse>(options)
        if (response.data.choices && response.data.choices.length > 0) {
            console.log(`Токенов: ${response.data.usage.total_tokens}`)
            return response.data.choices[0].message.content
        } else {
            ApiError.InternalError("Ответ не найден в ответе от API")
            return
        }
    } catch {
        ApiError.InternalError(`Ошибка при получении контента`)
        return
    }
}
