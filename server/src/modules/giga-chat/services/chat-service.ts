import axios from "axios"

const httpsAgent = new (require("follow-redirects").https.Agent)({ rejectUnauthorized: false })

interface ChatContentResponse {
    choices: { message: { content: string } }[]
    usage: { total_tokens: number }
}

// Функция для отправки запроса к API нейросети и получения ответов
export async function getChatContent(
    token: string,
    numOfAnswers: number,
    question: string,
    answer: string
): Promise<string> {
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
            throw new Error("Ответ не найден в ответе от API")
        }
    } catch (error: any) {
        throw new Error(`Ошибка при получении контента: ${error.message}`)
    }
}
