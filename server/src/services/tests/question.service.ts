import ApiError from "@/exceptions/api-error"
import questionRepository from "@/repositories/tests/question.repository"
import testRepository from "@/repositories/tests/test.repository"
import { badWordsService } from "@/services/bad-words-service"
import { mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import answerService from "@/services/tests/answer.service"
import { QuestionDTO, TestDTO } from "@/types"
import { logger } from "@/utils/logger"
import { executeTransaction } from "@/utils/prisma-client"
import { redisClient } from "@/utils/redis-client"
import { isValidUUID } from "@/utils/validator"

const LOG_NAMESPACE = "QuestionService"

class QuestionService {
    /**
     * Получение вопросов теста по его идентификатору
     * @param testId Идентификатор теста
     * @returns Массив DTO вопросов теста
     */
    async getTestQuestions(testId: string): Promise<QuestionDTO[]> {
        logger.debug(`[${LOG_NAMESPACE}] Получение вопросов теста`, { testId })
        try {
            const questions = await questionRepository.findManyByTestId(testId)
            logger.debug(`[${LOG_NAMESPACE}] Вопросы теста успешно получены`, { testId, count: questions.length })
            return questions.map(q => ({
                id: q.id,
                text: q.text,
                order: q.order,
                type: q.type,
                answers: q.answers.map(a => ({
                    id: a.id,
                    text: a.text,
                    isCorrect: a.isCorrect,
                })),
            }))
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении вопросов теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении вопросов теста")
        }
    }

    /**
     * Добавление новых вопросов к тесту
     * @param testId Идентификатор теста
     * @param data Массив DTO данных для новых вопросов
     * @returns Обновленный DTO теста с добавленными вопросами
     */
    async addQuestions(testId: string, data: QuestionDTO[]): Promise<TestDTO> {
        logger.info(`[${LOG_NAMESPACE}] Добавление вопросов к тесту`, { testId })
        try {
            const { updatedTest, questions } = await executeTransaction(async tx => {
                const test = await testRepository.findWithQuestionsAndAuthor(testId, tx)
                if (!test) {
                    logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                    throw ApiError.NotFound("Тест не найден")
                }
                const createdQuestions = await Promise.all(
                    data.map(async (questionData, index) => {
                        const createdQuestion = await testRepository.createQuestion(
                            testId,
                            {
                                text: questionData.text,
                                type: questionData.type,
                                order: index + 1,
                            },
                            tx
                        )
                        await testRepository.createAnswersForQuestion(createdQuestion.id, questionData.answers, tx)
                        return testRepository.getQuestionWithAnswers(createdQuestion.id, tx)
                    })
                )
                const validQuestions = createdQuestions.filter(question => question !== null)
                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)
                const testWithUpdatedQuestions = {
                    ...test,
                    questions: [...validQuestions],
                }
                await testRepository.createSnapshot(testWithUpdatedQuestions, tx)
                return { updatedTest: test, questions: validQuestions }
            })
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.info(`[${LOG_NAMESPACE}] Вопросы успешно добавлены к тесту`, { testId })
            return mapTest({
                ...updatedTest,
                questions,
            })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при добавлении вопросов к тесту`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при добавлении вопросов к тесту")
        }
    }

    /**
     * Проверка принадлежности вопроса к тесту
     * @param questionId Идентификатор вопроса
     * @param testId Идентификатор теста
     * @returns Флаг принадлежности вопроса к тесту
     */
    async isQuestionBelongsToTest(questionId: string, testId: string): Promise<boolean> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка принадлежности вопроса к тесту`, { questionId, testId })
        try {
            const question = await questionRepository.findByIdWithTestId(questionId)
            if (!question) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не найден`, { questionId })
                throw ApiError.NotFound("Вопрос не найден")
            }
            const belongsToTest = question.testId === testId
            logger.debug(`[${LOG_NAMESPACE}] Результат проверки принадлежности вопроса к тесту`, {
                questionId,
                testId,
                belongsToTest,
            })
            return belongsToTest
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке принадлежности вопроса к тесту`, {
                questionId,
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при проверке принадлежности вопроса к тесту")
        }
    }

    /**
     * Проверка принадлежности вопроса к любому тесту
     *
     * @param questionId Идентификатор вопроса
     * @returns Объект с данными вопроса, теста и флагом принадлежности
     */
    async isQuestionBelongsToAnyTest(
        questionId: string
    ): Promise<{ question: QuestionDTO | null; test: TestDTO | null; belongsToTest: boolean }> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка принадлежности вопроса к любому тесту`, { questionId })
        try {
            const question = await questionRepository.findByIdWithDetails(questionId)
            if (!question) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не найден`, { questionId })
                return { question: null, test: null, belongsToTest: false }
            }
            if (!question.test) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, { questionId })
                return {
                    question: mapQuestion(question),
                    test: null,
                    belongsToTest: false,
                }
            }
            logger.debug(`[${LOG_NAMESPACE}] Вопрос принадлежит тесту`, { questionId })
            return {
                question: mapQuestion(question),
                test: mapTest(question.test),
                belongsToTest: true,
            }
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке принадлежности вопроса к любому тесту`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при проверке принадлежности вопроса к любому тесту")
        }
    }

    /**
     * Получение вопроса по идентификатору
     * @param questionId Идентификатор вопроса
     * @returns DTO вопроса
     */
    async getQuestionById(questionId: string): Promise<QuestionDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение вопроса по ID`, { questionId })
        try {
            const question = await questionRepository.findById(questionId)
            if (!question) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не найден`, { questionId })
                throw ApiError.NotFound("Вопрос не найден")
            }
            logger.debug(`[${LOG_NAMESPACE}] Вопрос успешно получен`, { questionId })
            return mapQuestion(question)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении вопроса по ID`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении вопроса по ID")
        }
    }

    /**
     * Удаление вопроса по идентификатору
     * @param questionId Идентификатор вопроса
     * @returns void
     */
    async deleteQuestion(questionId: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление вопроса`, { questionId })
        try {
            await questionRepository.delete(questionId)
            logger.info(`[${LOG_NAMESPACE}] Вопрос успешно удален`, { questionId })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении вопроса`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.BadRequest("Ошибка при удалении вопроса")
        }
    }

    /**
     * Удаление всех вопросов теста
     * @param testId Идентификатор теста
     * @returns void
     */
    async deleteAllQuestions(testId: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление всех вопросов теста`, { testId })
        try {
            const test = await testRepository.findById(testId)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.BadRequest("Тест не найден")
            }
            await questionRepository.deleteAllByTestId(testId)
            logger.info(`[${LOG_NAMESPACE}] Все вопросы теста успешно удалены`, { testId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении всех вопросов теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при удалении всех вопросов теста")
        }
    }

    /**
     * Обновление данных вопроса
     * @param questionId Идентификатор вопроса
     * @param updateData DTO с обновленными данными вопроса
     * @returns void
     */
    async updateQuestion(questionId: string, updateData: QuestionDTO): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Обновление вопроса`, { questionId })
        try {
            const question = await questionRepository.findById(questionId)
            if (!question) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не найден`, { questionId })
                throw ApiError.NotFound("Вопрос не найден")
            }
            await questionRepository.update(questionId, updateData)
            logger.info(`[${LOG_NAMESPACE}] Вопрос успешно обновлен`, { questionId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении вопроса`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.BadRequest("Ошибка при обновлении вопроса")
        }
    }
    private checkForBadWords(questions: QuestionDTO[]): void {
        logger.debug(`[${LOG_NAMESPACE}] Начало проверки вопросов на недопустимые слова`)

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i]
            const questionNumber = i + 1 // порядковый номер

            // Проверка текста вопроса
            const questionCheck = badWordsService.checkText(question.text)
            if (questionCheck.hasBadWords) {
                logger.warn(`[${LOG_NAMESPACE}] Обнаружены недопустимые слова в тексте вопроса`, {
                    questionNumber,
                    questionText: question.text,
                    foundWords: questionCheck.foundWords,
                })
                throw ApiError.BadRequest(`Обнаружены недопустимые слова в тексте вопроса №${questionNumber}`)
            }

            // Проверка вариантов ответов
            for (const answer of question.answers) {
                const answerCheck = badWordsService.checkText(answer.text)
                if (answerCheck.hasBadWords) {
                    logger.warn(`[${LOG_NAMESPACE}] Обнаружены недопустимые слова в тексте ответа`, {
                        questionNumber,
                        answerText: answer.text,
                        foundWords: answerCheck.foundWords,
                    })
                    throw ApiError.BadRequest(
                        `Обнаружены недопустимые слова в тексте ответа вопроса №${questionNumber}`
                    )
                }
            }
        }

        logger.debug(`[${LOG_NAMESPACE}] Все вопросы и ответы прошли проверку на недопустимые слова`)
    }

    /**
     * Полное обновление (вставка или обновление) вопросов теста
     * @param testId Идентификатор теста
     * @param questions Массив DTO с данными вопросов
     * @returns Массив DTO обновленных вопросов
     */
    async upsertQuestions(testId: string, questions: QuestionDTO[]): Promise<QuestionDTO[]> {
        logger.info(`[${LOG_NAMESPACE}] Полное обновление вопросов теста`, {
            testId,
            questionsCount: questions.length,
        })

        // Проверка на недопустимые слова перед обновлением
        this.checkForBadWords(questions)
        this.validateFillInTheBlankQuestions(questions)
        return executeTransaction(async tx => {
            // Проверка существования теста
            const test = await testRepository.findById(testId, tx)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }
            // Получение всех существующих вопросов теста
            const existingQuestions = await questionRepository.findManyByTestId(testId, tx)
            // Создание мапы для быстрого поиска существующих вопросов
            const existingQuestionsMap = new Map(existingQuestions.map(q => [q.id, q]))
            // Инициализация отслеживания обработанных вопросов
            const processedQuestionIds = new Set<string>()
            const processedQuestions = []
            // Обработка каждого вопроса из входящего массива
            for (const [index, question] of questions.entries()) {
                try {
                    question.order = index + 1
                    let questionId = question.id
                    // Проверка валидности UUID вопроса
                    if (isValidUUID(questionId)) {
                        // Проверка принадлежности вопроса к тесту
                        const belongs = await this.isQuestionBelongsToTest(questionId, testId)
                        if (!belongs) {
                            logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, {
                                questionId: questionId,
                                testId,
                            })
                            throw ApiError.BadRequest("Вопрос не принадлежит текущему тесту")
                        }
                        // Обновление существующего вопроса
                        if (existingQuestionsMap.has(questionId)) {
                            logger.debug(`[${LOG_NAMESPACE}] Обновление существующего вопроса`, {
                                questionId: questionId,
                            })
                            // Проверка принадлежности ответов к вопросу
                            const answersWithValidIds = question.answers.filter(answer => isValidUUID(answer.id))
                            for (const answer of answersWithValidIds) {
                                const { belongsToQuestion } = await answerService.isAnswerBelongsToQuestion(
                                    answer.id,
                                    questionId
                                )
                                if (!belongsToQuestion) {
                                    logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит вопросу`, {
                                        answerId: answer.id,
                                        questionId: questionId,
                                    })
                                    throw ApiError.BadRequest("Ответ не принадлежит указанному вопросу")
                                }
                            }
                            // Обновление вопроса и его ответов через репозиторий
                            await questionRepository.update(questionId, question, tx)
                            processedQuestionIds.add(questionId)
                        } else {
                            logger.warn(`[${LOG_NAMESPACE}] Вопрос с указанным ID не найден в текущем тесте`, {
                                questionId: questionId,
                                testId,
                            })
                            throw ApiError.NotFound("Вопрос с указанным ID не найден в текущем тесте")
                        }
                    } else {
                        // Создание нового вопроса
                        logger.debug(`[${LOG_NAMESPACE}] Создание нового вопроса`, { question })
                        const newQuestion = await questionRepository.create(question, testId, tx)
                        questionId = newQuestion.id
                        question.id = questionId // Сохранение ID вопроса
                        // Сохранение ответов с их ID
                        question.answers = newQuestion.answers.map(answer => ({
                            ...answer,
                            id: answer.id,
                        }))
                        processedQuestionIds.add(questionId)
                    }
                    processedQuestions.push(question)
                } catch (error) {
                    if (error instanceof ApiError) {
                        throw error
                    }
                    logger.error(`[${LOG_NAMESPACE}] Ошибка при обработке вопроса`, {
                        questionId: question.id,
                        error: error,
                    })
                    throw error
                }
            }
            // Удаление вопросов, которых нет в новом списке
            const questionsToDelete = await questionRepository.getQuestionsToDelete(
                testId,
                Array.from(processedQuestionIds),
                tx
            )
            for (const questionToDelete of questionsToDelete) {
                logger.debug(`[${LOG_NAMESPACE}] Удаление вопроса, которого нет в обновленном списке`, {
                    questionId: questionToDelete.id,
                })
                await questionRepository.delete(questionToDelete.id, tx)
            }
            // Очистка кэша
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            return processedQuestions
        })
    }
    private validateFillInTheBlankQuestions(questions: QuestionDTO[]): void {
        for (const question of questions) {
            if (question.type === "FILL_IN_THE_BLANK") {
                // Проверяем наличие маркера {blank} в тексте вопроса
                const blankCount = (question.text.match(/{blank}/g) || []).length
                if (blankCount === 0) {
                    logger.warn(`[${LOG_NAMESPACE}] В вопросе типа FILL_IN_THE_BLANK отсутствует маркер {blank}`, {
                        questionId: question.id,
                    })
                    throw ApiError.BadRequest("В вопросе с пропуском должен быть указан маркер {blank}")
                }
                if (blankCount > 1) {
                    logger.warn(
                        `[${LOG_NAMESPACE}] В вопросе типа FILL_IN_THE_BLANK должно быть только одно поле {blank}`,
                        {
                            questionId: question.id,
                        }
                    )
                    throw ApiError.BadRequest("В вопросе с пропуском должно быть только одно поле {blank}")
                }

                // Проверяем количество правильных ответов (должен быть только один)
                const correctAnswers = question.answers.filter(answer => answer.isCorrect)
                if (correctAnswers.length !== 1) {
                    logger.warn(
                        `[${LOG_NAMESPACE}] В вопросе типа FILL_IN_THE_BLANK должен быть ровно один правильный ответ`,
                        {
                            questionId: question.id,
                        }
                    )
                    throw ApiError.BadRequest("В вопросе с пропуском должен быть ровно один правильный ответ")
                }
            }
        }
    }
}

export default new QuestionService()
