import ApiError from "@/exceptions/api-error"
import attemptRepository from "@/repositories/tests/attempt.repository"
import testRepository from "@/repositories/tests/test.repository"
import { mapToTestAttemptDTO } from "@/services/mappers/test.mappers"
import { AttemptAnswer, AttemptsListDTO, PreTestUserData, PreTestUserDataLabels, TestAttemptDTO } from "@/types"
import { redisClient } from "@/utils/redis-client"

class AttemptService {
    async startAttempt(
        testId: string,
        userData?: Record<string, any>,
        userId?: string
    ): Promise<{ attemptId: string }> {
        try {
            const test = await testRepository.findById(testId)

            if (!test) throw ApiError.NotFound("Тест не найден")
            if (!test.questions || test.questions.length === 0) {
                throw ApiError.BadRequest("Невозможно начать прохождение теста без вопросов")
            }

            const settings = test.settings
            if (settings?.requireRegistration && !userId) {
                throw ApiError.BadRequest("Для прохождения этого теста необходимо зарегистрироваться")
            }

            if (settings?.inputFields && Array.isArray(settings.inputFields) && settings.inputFields.length > 0) {
                const inputFields = settings.inputFields as PreTestUserData[]
                if (!userData || inputFields.some(field => userData[field] == null)) {
                    const missingLabels = inputFields.filter(field => userData?.[field] == null)
                    const missingLabelsRu = inputFields
                        .filter(field => userData?.[field] == null)
                        .map(f => PreTestUserDataLabels[f])
                    throw ApiError.BadRequest(
                        `Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(
                            ", "
                        )})`
                    )
                }
            }

            const latestSnapshot = await testRepository.findLatestSnapshot(testId)
            if (!latestSnapshot) {
                throw ApiError.NotFound("Не найден актуальный снапшот теста")
            }
            if (userId) {
                const attemptInProgress = await attemptRepository.findInProgressByUserId(userId)
                if (attemptInProgress) {
                    throw ApiError.BadRequest(
                        "У вас уже есть незавершенная попытка прохождения теста. Завершите текущую попытку прежде чем начинать новую."
                    )
                }
            }
            const newAttempt = await attemptRepository.createAttempt({
                testId,
                snapshotId: latestSnapshot.id,
                userId,
                userData: settings?.requireRegistration ? null : userData,
            })

            return { attemptId: newAttempt.id }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при начале теста")
        }
    }

    // Сохранение ответа
    async saveAnswer(attemptId: string, questionId: string, answersIds: string[], timeSpent = 0): Promise<void> {
        try {
            const attempt = await attemptRepository.findAttemptWithTest(attemptId)

            if (!attempt) {
                throw ApiError.BadRequest("Попытка не существует")
            }
            if (attempt.status === "COMPLETED" || attempt.completedAt) {
                throw ApiError.BadRequest("Попытка уже завершена")
            }

            const question = await testRepository.getQuestionWithAnswers(questionId)
            if (!question || question.testId !== attempt.testId) {
                throw ApiError.BadRequest("Вопрос не принадлежит тесту")
            }

            if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
                throw ApiError.BadRequest("Для вопроса с одиночным выбором можно указать только один ответ")
            }

            if (answersIds.length > 0) {
                const validAnswerIds = question.answers.map(a => a.id)
                const allAnswersValid = answersIds.every(id => validAnswerIds.includes(id))

                if (!allAnswersValid) {
                    if (question.type == "MULTIPLE_CHOICE") {
                        throw ApiError.BadRequest("Один или несколько ответов не принадлежат вопросу")
                    }
                    throw ApiError.BadRequest("Ответ не принадлежат вопросу")
                }

                await attemptRepository.saveUserAnswer(attemptId, questionId, answersIds, timeSpent)
                await redisClient.del(`attempt:${attemptId}`)
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при сохранении ответа")
        }
    }
    // Сохранение всех ответов
    async saveAnswers(attemptId: string, answers: AttemptAnswer[]): Promise<void> {
        try {
            const attempt = await attemptRepository.findAttemptWithTest(attemptId)
            if (!attempt) {
                throw ApiError.BadRequest("Попытка не существует")
            }
            if (attempt.status === "COMPLETED" || attempt.completedAt) {
                throw ApiError.BadRequest("Попытка уже завершена")
            }

            // Проверка всех ответов перед сохранением
            for (const answer of answers) {
                const { questionId, answersIds, timeSpent = 0 } = answer

                const question = await testRepository.getQuestionWithAnswers(questionId)
                if (!question || question.testId !== attempt.testId) {
                    throw ApiError.BadRequest(`Вопрос ${questionId} не принадлежит тесту`)
                }

                if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
                    throw ApiError.BadRequest(
                        `Для вопроса ${questionId} с одиночным выбором можно указать только один ответ`
                    )
                }

                if (answersIds.length > 0) {
                    const validAnswerIds = question.answers.map(a => a.id)
                    const allAnswersValid = answersIds.every(id => validAnswerIds.includes(id))
                    if (!allAnswersValid) {
                        if (question.type == "MULTIPLE_CHOICE") {
                            throw ApiError.BadRequest(`Один или несколько ответов не принадлежат вопросу ${questionId}`)
                        }
                        throw ApiError.BadRequest(`Ответ не принадлежит вопросу ${questionId}`)
                    }
                }
            }

            // Сохранение всех ответов в одной транзакции
            await attemptRepository.saveUserAnswers(attemptId, answers)
            await redisClient.del(`attempt:${attemptId}`)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при сохранении ответов")
        }
    }

    // Завершение теста и подсчет результатов
    async completeAttempt(attemptId: string): Promise<{ score: number }> {
        try {
            const attempt = await attemptRepository.findAttemptWithDetails(attemptId)

            if (!attempt) {
                throw ApiError.BadRequest("Попытка не найдена")
            }
            if (attempt.completedAt) {
                throw ApiError.BadRequest("Тест уже завершен")
            }

            const questionsWithAnswers = await attemptRepository.getQuestionsWithCorrectAnswers(attempt.testId)
            let correctQuestionsCount = 0

            for (const question of questionsWithAnswers) {
                const userAnswersForQuestion = attempt.answers.filter(a => a.questionId === question.id)
                const correctAnswerIds = question.answers.map(a => a.id)
                const userAnswerIds = userAnswersForQuestion.map(a => a.answerId)

                if (
                    correctAnswerIds.length === userAnswerIds.length &&
                    correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
                    userAnswerIds.every(id => correctAnswerIds.includes(id))
                ) {
                    correctQuestionsCount++
                }
            }

            const totalQuestions = questionsWithAnswers.length
            const score = (correctQuestionsCount / totalQuestions) * 100

            await attemptRepository.updateAttemptScore(attemptId, score)
            await redisClient.del(`attempt:${attemptId}`)

            return { score }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при завершении теста")
        }
    }

    async getAll(page = 1, limit = 10): Promise<AttemptsListDTO> {
        try {
            const attempts = await attemptRepository.findAll(page, limit)
            const total = await attemptRepository.count()

            return {
                attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении списка попыток")
        }
    }

    async get(attemptId: string): Promise<TestAttemptDTO> {
        try {
            const cacheKey = `attempt:${attemptId}`
            const cachedData = await redisClient.get(cacheKey)
            // if (cachedData) {
            //     return JSON.parse(cachedData)
            // }

            const attempt = await attemptRepository.findById(attemptId)
            console.log(attempt)
            if (!attempt) {
                throw ApiError.BadRequest("Попытка не найдена")
            }

            const result = mapToTestAttemptDTO(attempt)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }

    async getUserAttempts(userId: string, page = 1, limit = 10): Promise<AttemptsListDTO> {
        try {
            const attempts = await attemptRepository.findByUserId(userId, page, limit)
            const total = await attemptRepository.count({ userId })

            return {
                attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }

    async getTestAttempts(testId: string, page = 1, limit = 10): Promise<AttemptsListDTO> {
        try {
            const attempts = await attemptRepository.findManyByTestId(testId, page, limit)
            const total = await attemptRepository.count({ testId })

            return {
                attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }
}

export default new AttemptService()
