import { envConfig } from "@/config/env-config"
import { ApiError } from "@/exceptions"
import { GigaChatContentResponse } from "@/types"
import { GenerateWrongAnswersParams, GigaChatPostData } from "@/types/gigachat/gigachat.types"
import { AnswerDTO, QuestionDTO } from "@/types/test/question.types"
import { logger } from "@/utils/logger"
import axios from "axios"
import https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })
const LOG_NAMESPACE = "GigaChatService"

class GigaChatService {
    // Генерация неправильных ответов для теста
    async generateAnswers({ token, numOfAnswers, question, answer }: GenerateWrongAnswersParams): Promise<string[]> {
        logger.debug(
            `[${LOG_NAMESPACE}] Генерация ответов. Вопрос: "${question}", правильный: "${answer}", кол-во: ${numOfAnswers}`
        )

        const content =
            numOfAnswers === 1
                ? `Я задам вопрос. Ты должен придумать 1 неправильный вариант ответа. Нумеруй свой ответ цифрой 1. Ответ не должен совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа: 1. Ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`
                : `Я задам вопрос. Ты должен придумать ${numOfAnswers} абсолютно неправильных ответа. Нумеруй свои ответы цифрами. На конце каждого ответа ставь точку. Если в твоем ответе только число. То этот ответ запиши в кавычках:  Пример: "23".Ответы не должны совпадать с правильным. Можешь путать даты, имена, временные промежутки и факты. Формат ответа должен быть таким же, как и правильный ответ. Вопрос: ${question}? Правильный ответ: ${answer}.`

        const postData = this.createPostData(content, envConfig.GIGACHAT_ANSWERS_MODEL)
        const requestOptions = this.createRequestOptions(postData, token)

        try {
            logger.debug(`[${LOG_NAMESPACE}] Отправка запроса к GigaChat`)
            console.log("MODEL", envConfig.GIGACHAT_ANSWERS_MODEL)
            const response = await axios<GigaChatContentResponse>(requestOptions)

            logger.debug(`[${LOG_NAMESPACE}] Ответ от GigaChat: ${JSON.stringify(response.data).substring(0, 30)}...`)
            logger.debug(`[${LOG_NAMESPACE}] Токенов потрачено: ${response.data.usage.total_tokens}`)

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

    // Генерация теста
    async generateTest(token: string, topic: string, numOfQuestions: number): Promise<QuestionDTO[]> {
        logger.debug(`[${LOG_NAMESPACE}] Генерация теста. Тема: "${topic}", кол-во вопросов: ${numOfQuestions}`)

        const content = `Сгенерируй тест из ${numOfQuestions} вопросов по теме ${topic}. В каждом вопросе должно быть 4 варианта ответа. один вариант ответа правильный, а 3 варианта ответа неправильные. Правильный ответ пиши всегда в начале. Формат ответа: 1. Вопрос: (текст вопроса). Ответы: 1.1. Ответ. 1.2. Ответ. 1.3. Ответ. 1.4. Ответ. 2. Вопрос: (текст вопроса). Ответы: 2.1. Ответ. 2.2. Ответ. 2.3. Ответ.`

        const postData = this.createPostData(content, envConfig.GIGACHAT_TEST_MODEL)
        const requestOptions = this.createRequestOptions(postData, token)
        try {
            logger.debug(`[${LOG_NAMESPACE}] Отправка запроса к GigaChat`)
            const response = await axios<GigaChatContentResponse>(requestOptions)
            logger.debug(`[${LOG_NAMESPACE}] Ответ от GigaChat: ${JSON.stringify(response.data).substring(0, 30)}...`)
            logger.debug(`[${LOG_NAMESPACE}] Токенов потрачено: ${response.data.usage.total_tokens}`)

            if (!response.data.choices || response.data.choices.length === 0) {
                throw ApiError.InternalError("Ответ не найден в ответе от API")
            }

            const content = response.data.choices[0].message.content
            const questions = await this.parseTestContent(content)

            if (questions.length === 0) {
                throw ApiError.BadRequest("Не удалось распарсить вопросы из ответа нейросети. Попробуйте еще раз.")
            }

            logger.debug(`[${LOG_NAMESPACE}] Тест успешно сгенерирован: ${questions.length} вопросов`)
            return questions
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка генерации: ${error}`)
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при получении контента")
        }
    }

    // Формирование тела запроса
    private createPostData(content: string, model: string): GigaChatPostData {
        return {
            model,
            messages: [{ role: "user", content }],
            stream: false,
            repetition_penalty: 1,
        }
    }

    // Конфигурация http-запроса для отправки данных
    private createRequestOptions(postData: GigaChatPostData, token: string) {
        return {
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
    }

    // Парсинг сгенерированных ответов
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

    // Парсинг сгенерированного теста
    async parseTestContent(content: string): Promise<QuestionDTO[]> {
        logger.debug(`[${LOG_NAMESPACE}] Парсинг контента теста`)
        if (!content) return []

        const questions: QuestionDTO[] = []

        // Регулярное выражение для извлечения вопросов
        const questionRegex = /(\d+)\. Вопрос: ([^\n]+)([\s\S]*?)(?=(?:\d+\. Вопрос:|$))/g

        let questionMatch
        let questionCounter = 0

        while ((questionMatch = questionRegex.exec(content)) !== null) {
            questionCounter++
            const questionNumber = questionMatch[1]
            const questionText = questionMatch[2].trim()
            const answersSection = questionMatch[3]

            // Регулярное выражение для извлечения ответов
            const answerRegex = /\d+\.\d+\. ([^\n]+)/g

            let answerMatch
            const answers: AnswerDTO[] = []
            let answerCounter = 0

            while ((answerMatch = answerRegex.exec(answersSection)) !== null) {
                answerCounter++

                // Очистка текста от лишних символов (*)
                let answerText = answerMatch[1].trim()
                answerText = answerText.replace(/\*/g, "").trim()

                answers.push({
                    id: `answer-${questionCounter}-${answerCounter}`,
                    text: answerText,
                    isCorrect: answerCounter === 1, // Первый ответ всегда правильный
                    sequencePosition: null,
                })
            }

            questions.push({
                id: `question-${questionCounter}`,
                text: questionText,
                type: "SINGLE_CHOICE",
                order: questionCounter,
                answers,
            })
        }

        logger.debug(`[${LOG_NAMESPACE}] Успешно распарсено ${questions.length} вопросов`)
        return questions
    }
}

export const gigaChatService = new GigaChatService()
