import ApiError from "@/exceptions/api-error"
import attemptRepository from "@/repositories/tests/attempt.repository"
import testRepository from "@/repositories/tests/test.repository"
import {
    mapToAttemptWithResultsDTO,
    mapToAttemptWithSnapshotDTO,
    mapToTestAttemptDTO,
    mapToTestAttemptUserDTO,
} from "@/services/mappers/test.mappers"
import {
    AttemptAnswer,
    AttemptsListDTO,
    AttemptsWithSnapshotListDTO,
    PreTestUserData,
    PreTestUserDataLabels,
    PreTestUserDataType,
    TestAttemptDTO,
    TestAttemptResultDTO,
    TestAttemptUserDTO,
    UserDTO,
} from "@/types"
import { logger } from "@/utils/logger"
import { calculateTestScore } from "@/utils/math"
import { redisClient } from "@/utils/redis-client"
import { Role, TestAttemptStatus } from "@prisma/client"

const LOG_NAMESPACE = "AttemptService"

class AttemptService {
    async startAttempt(
        testId: string,
        preTestUserData?: PreTestUserDataType,
        userId?: string
    ): Promise<{ attemptId: string }> {
        logger.debug(`[${LOG_NAMESPACE}] Начало попытки теста`, { testId, userId })
        try {
            const test = await testRepository.findById(testId)

            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }
            if (!test.questions || test.questions.length === 0) {
                logger.warn(`[${LOG_NAMESPACE}] Невозможно начать прохождение теста без вопросов`, { testId })
                throw ApiError.BadRequest("Невозможно начать прохождение теста без вопросов")
            }

            const settings = test.settings
            if (settings?.requireRegistration && !userId) {
                logger.warn(`[${LOG_NAMESPACE}] Для прохождения этого теста необходимо зарегистрироваться`, { testId })
                throw ApiError.BadRequest("Для прохождения этого теста необходимо зарегистрироваться")
            }

            if (settings?.inputFields && Array.isArray(settings.inputFields) && settings.inputFields.length > 0) {
                const requiredFields = [PreTestUserData.LastName, PreTestUserData.City]

                // Проверяем, что все обязательные поля присутствуют
                if (!preTestUserData || requiredFields.some(field => !preTestUserData[field])) {
                    const missingLabels = requiredFields.filter(field => !preTestUserData?.[field])
                    const missingLabelsRu = missingLabels.map(f => PreTestUserDataLabels[f])
                    logger.warn(`[${LOG_NAMESPACE}] Не все обязательные поля заполнены`, {
                        testId,
                        missingLabels,
                        missingLabelsRu,
                    })
                    throw ApiError.BadRequest(
                        `Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(
                            ", "
                        )})`
                    )
                }

                // Проверка на лишние поля
                const extraFields = Object.keys(preTestUserData).filter(
                    field => !requiredFields.includes(field as PreTestUserData)
                )
                if (extraFields.length > 0) {
                    logger.warn(`[${LOG_NAMESPACE}] Обнаружены недопустимые поля`, {
                        testId,
                        extraFields,
                    })
                    throw ApiError.BadRequest(`Обнаружены недопустимые поля: ${extraFields.join(", ")}`)
                }
            }

            const latestSnapshot = await testRepository.findLatestSnapshot(testId)
            if (!latestSnapshot) {
                logger.warn(`[${LOG_NAMESPACE}] Не найден актуальный снапшот теста`, { testId })
                throw ApiError.NotFound("Не найден актуальный снапшот теста")
            }
            if (userId) {
                const attemptInProgress = await attemptRepository.findInProgressByUserId(userId)
                if (attemptInProgress) {
                    logger.warn(`[${LOG_NAMESPACE}] У пользователя уже есть незавершенная попытка`, { userId })
                    throw ApiError.BadRequest(
                        "У вас уже есть незавершенная попытка прохождения теста. Завершите текущую попытку прежде чем начинать новую."
                    )
                }
            }
            const newAttempt = await attemptRepository.createAttempt({
                testId,
                testSnapshotId: latestSnapshot.id,
                userId,
                preTestUserData: preTestUserData,
            })

            // Чтобы сбрасывалось кол-во попыток
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.debug(`[${LOG_NAMESPACE}] Попытка теста успешно начата`, { attemptId: newAttempt.id })

            return { attemptId: newAttempt.id }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при начале теста`, {
                testId,
                userId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при начале теста")
        }
    }

    async saveAnswer(attemptId: string, questionId: string, answersIds: string[], timeSpent = 0): Promise<void> {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение ответа`, { attemptId, questionId })
        try {
            const attempt = await attemptRepository.findAttemptWithTest(attemptId)

            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не существует`, { attemptId })
                throw ApiError.BadRequest("Попытка не существует")
            }
            if (attempt.status === TestAttemptStatus.COMPLETED || attempt.completedAt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка уже завершена`, { attemptId })
                throw ApiError.BadRequest("Попытка уже завершена")
            }

            const question = await testRepository.getQuestionWithAnswers(questionId)
            if (!question || question.testId !== attempt.testId) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, { questionId, testId: attempt.testId })
                throw ApiError.BadRequest("Вопрос не принадлежит тесту")
            }

            if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
                logger.warn(`[${LOG_NAMESPACE}] Для вопроса с одиночным выбором можно указать только один ответ`, {
                    questionId,
                })
                throw ApiError.BadRequest("Для вопроса с одиночным выбором можно указать только один ответ")
            }

            if (answersIds.length > 0) {
                const validAnswerIds = question.answers.map(a => a.id)
                const allAnswersValid = answersIds.every(id => validAnswerIds.includes(id))

                if (!allAnswersValid) {
                    if (question.type == "MULTIPLE_CHOICE") {
                        logger.warn(`[${LOG_NAMESPACE}] Один или несколько ответов не принадлежат вопросу`, {
                            questionId,
                        })
                        throw ApiError.BadRequest("Один или несколько ответов не принадлежат вопросу")
                    }
                    logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит вопросу`, { questionId })
                    throw ApiError.BadRequest("Ответ не принадлежит вопросу")
                }

                await attemptRepository.saveUserAnswer(attemptId, questionId, answersIds, timeSpent)
                await redisClient.del(`attempt:${attemptId}`)
                await redisClient.del(`user-attempt:${attemptId}`)
                logger.debug(`[${LOG_NAMESPACE}] Ответ успешно сохранен`, { attemptId, questionId })
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении ответа`, {
                attemptId,
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при сохранении ответа")
        }
    }

    async saveAnswers(attemptId: string, answers: AttemptAnswer[]): Promise<void> {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение всех ответов`, { attemptId })
        try {
            const attempt = await attemptRepository.findAttemptWithTest(attemptId)
            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не существует`, { attemptId })
                throw ApiError.BadRequest("Попытка не существует")
            }
            if (attempt.status === TestAttemptStatus.COMPLETED || attempt.completedAt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка уже завершена`, { attemptId })
                throw ApiError.BadRequest("Попытка уже завершена")
            }

            for (const answer of answers) {
                const { questionId, answersIds, timeSpent = 0 } = answer

                const question = await testRepository.getQuestionWithAnswers(questionId)
                if (!question || question.testId !== attempt.testId) {
                    logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, {
                        questionId,
                        testId: attempt.testId,
                    })
                    throw ApiError.BadRequest(`Вопрос ${questionId} не принадлежит тесту`)
                }

                if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
                    logger.warn(`[${LOG_NAMESPACE}] Для вопроса с одиночным выбором можно указать только один ответ`, {
                        questionId,
                    })
                    throw ApiError.BadRequest(
                        `Для вопроса ${questionId} с одиночным выбором можно указать только один ответ`
                    )
                }

                if (answersIds.length > 0) {
                    const validAnswerIds = question.answers.map(a => a.id)
                    const allAnswersValid = answersIds.every(id => validAnswerIds.includes(id))
                    if (!allAnswersValid) {
                        if (question.type == "MULTIPLE_CHOICE") {
                            logger.warn(`[${LOG_NAMESPACE}] Один или несколько ответов не принадлежат вопросу`, {
                                questionId,
                            })
                            throw ApiError.BadRequest(`Один или несколько ответов не принадлежат вопросу ${questionId}`)
                        }
                        logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит вопросу`, { questionId })
                        throw ApiError.BadRequest(`Ответ не принадлежит вопросу ${questionId}`)
                    }
                }
            }

            await attemptRepository.saveUserAnswers(attemptId, answers)
            await redisClient.del(`attempt:${attemptId}`)
            await redisClient.del(`user-attempt:${attemptId}`)
            logger.debug(`[${LOG_NAMESPACE}] Все ответы успешно сохранены`, { attemptId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении ответов`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при сохранении ответов")
        }
    }

    async completeAttempt(attemptId: string): Promise<{ score: number }> {
        logger.debug(`[${LOG_NAMESPACE}] Завершение попытки теста`, { attemptId })
        try {
            const attempt = await attemptRepository.findAttemptWithDetails(attemptId)

            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
                throw ApiError.BadRequest("Попытка не найдена")
            }
            if (attempt.completedAt) {
                logger.warn(`[${LOG_NAMESPACE}] Тест уже завершен`, { attemptId })
                throw ApiError.BadRequest("Тест уже завершен")
            }

            const questionsWithAnswers = await attemptRepository.getQuestionsWithCorrectAnswers(attempt.testId)
            const score = calculateTestScore(questionsWithAnswers, attempt.answers)

            await attemptRepository.updateAttemptScore(attemptId, score)
            await redisClient.del(`attempt:${attemptId}`)
            await redisClient.del(`user-attempt:${attemptId}`)
            logger.debug(`[${LOG_NAMESPACE}] Попытка теста успешно завершена`, { attemptId, score })

            return { score }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при завершении теста`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при завершении теста")
        }
    }

    async getAll(page = 1, limit = 10): Promise<AttemptsListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение всех попыток`, { page, limit })
        try {
            const attempts = await attemptRepository.findAll(page, limit)
            const total = await attemptRepository.count()

            logger.debug(`[${LOG_NAMESPACE}] Все попытки успешно получены`, { count: attempts.length })
            return {
                attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
                total,
            }
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении списка попыток`, {
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении списка попыток")
        }
    }

    async get(attemptId: string): Promise<TestAttemptDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение попытки по ID`, { attemptId })
        try {
            const cacheKey = `attempt:${attemptId}`
            const cachedData = await redisClient.get(cacheKey)
            if (cachedData) {
                logger.debug(`[${LOG_NAMESPACE}] Попытка получена из кэша`, { attemptId })
                return JSON.parse(cachedData)
            }
            const attempt = await attemptRepository.findById(attemptId)
            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
                throw ApiError.BadRequest("Попытка не найдена")
            }
            const result = mapToTestAttemptDTO(attempt)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
            logger.debug(`[${LOG_NAMESPACE}] Попытка успешно получена`, { attemptId })
            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }

    async getWithResults(attemptId: string, user?: UserDTO): Promise<TestAttemptResultDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение попытки с результатами`, { attemptId })
        try {
            const attempt = await attemptRepository.findById(attemptId)
            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
                throw ApiError.BadRequest("Попытка не найдена")
            }
            if (attempt.status !== TestAttemptStatus.COMPLETED) {
                if (user?.role !== Role.ADMIN) {
                    logger.warn(`[${LOG_NAMESPACE}] Попытка не завершена`, { attemptId })
                    throw ApiError.BadRequest("Попытка не завершена")
                }
            }

            const result = mapToAttemptWithResultsDTO(attempt)
            logger.debug(`[${LOG_NAMESPACE}] Попытка с результатами успешно получена`, { attemptId })
            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки с результатами`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }

    async getForUserById(attemptId: string): Promise<TestAttemptUserDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение попытки для пользователя по ID`, { attemptId })
        try {
            const cacheKey = `user-attempt:${attemptId}`
            const cachedData = await redisClient.get(cacheKey)
            if (cachedData) {
                logger.debug(`[${LOG_NAMESPACE}] Попытка для пользователя получена из кэша`, { attemptId })
                return JSON.parse(cachedData)
            }
            const attempt = await attemptRepository.findForUserById(attemptId)
            if (!attempt) {
                logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
                throw ApiError.BadRequest("Попытка не найдена")
            }

            const result = mapToTestAttemptUserDTO(attempt)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
            logger.debug(`[${LOG_NAMESPACE}] Попытка для пользователя успешно получена`, { attemptId })
            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки для пользователя`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }

    async getUserAttempts(userId: string, page = 1, limit = 10): Promise<AttemptsWithSnapshotListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение попыток пользователя`, { userId, page, limit })
        try {
            const attempts = await attemptRepository.findManyByUserId(userId, page, limit)
            const total = await attemptRepository.count({ userId })

            logger.debug(`[${LOG_NAMESPACE}] Попытки пользователя успешно получены`, { userId, count: attempts.length })
            return {
                attempts: attempts.map(attempt => mapToAttemptWithSnapshotDTO(attempt)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попыток пользователя`, {
                userId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении попыток пользователя")
        }
    }

    async getTestAttempts(testId: string, page = 1, limit = 10): Promise<AttemptsListDTO> {
        try {
            const attempts = await attemptRepository.findManyByTestId(testId, page, limit)
            const total = await attemptRepository.count({ testId })
            logger.debug(`[${LOG_NAMESPACE}] Попытки теста успешно получены`, { testId, count: attempts.length })
            return {
                attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попыток теста`, {
                testId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении попытки")
        }
    }
}

export default new AttemptService()
