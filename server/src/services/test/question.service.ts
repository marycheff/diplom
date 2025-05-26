import { ApiError } from "@/exceptions"
import { mapQuestion, mapTest } from "@/mappers"
import { questionRepository, testRepository } from "@/repositories"
import { answerService, badWordsService, imageService } from "@/services"
import { QuestionDTO, TestDTO } from "@/types"
import { logger } from "@/utils/logger"
import { generateUUID } from "@/utils/math"
import { executeTransaction } from "@/utils/prisma-client"
import { deleteTestCache } from "@/utils/redis/redis.utils"
import { isValidUUID } from "@/utils/validator"
import fs from "fs"

const LOG_NAMESPACE = "QuestionService"
const UPLOAD_DIR = "uploads/questions"

// Создаем директорию для загрузок, если она не существует
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

class QuestionService {
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

                    // Обработка существующего вопроса
                    if (isValidUUID(questionId)) {
                        const belongs = await this.isQuestionBelongsToTest(questionId, testId)
                        if (!belongs) {
                            logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, { questionId, testId })
                            throw ApiError.BadRequest("Вопрос не принадлежит текущему тесту")
                        }

                        if (!existingQuestionsMap.has(questionId)) {
                            logger.warn(`[${LOG_NAMESPACE}] Вопрос с указанным ID не найден в текущем тесте`, {
                                questionId,
                                testId,
                            })
                            throw ApiError.NotFound("Вопрос с указанным ID не найден в текущем тесте")
                        }

                        logger.debug(`[${LOG_NAMESPACE}] Обновление существующего вопроса`, { questionId })

                        // Проверка принадлежности ответов
                        const validAnswers = question.answers.filter(answer => isValidUUID(answer.id))
                        for (const answer of validAnswers) {
                            const { belongsToQuestion } = await answerService.isAnswerBelongsToQuestion(
                                answer.id,
                                questionId
                            )
                            if (!belongsToQuestion) {
                                logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит вопросу`, {
                                    answerId: answer.id,
                                    questionId,
                                })
                                throw ApiError.BadRequest("Ответ не принадлежит указанному вопросу")
                            }
                        }

                        if (question.image) {
                            question.image = await imageService.processImage(question.image, questionId)
                        }

                        await questionRepository.update(questionId, question, tx)
                        processedQuestionIds.add(questionId)
                    }

                    // Обработка нового вопроса
                    else {
                        const tempId = generateUUID()

                        if (question.image) {
                            question.image = await imageService.processImage(question.image, tempId)
                        }
                        logger.debug(`[${LOG_NAMESPACE}] Создание нового вопроса`, { question })

                        const newQuestion = await questionRepository.create(question, testId, tx)

                        questionId = newQuestion.id
                        question.id = questionId
                        question.answers = newQuestion.answers.map(answer => ({ ...answer, id: answer.id }))
                        processedQuestionIds.add(questionId)
                    }

                    processedQuestions.push(question)
                } catch (error) {
                    if (error instanceof ApiError) {
                        throw error
                    }

                    logger.error(`[${LOG_NAMESPACE}] Ошибка при обработке вопроса`, {
                        questionId: question.id,
                        error,
                    })

                    throw error
                }
            }

            // Удаление вопросов, которых нет в новом списке
            const questionsToDelete = await questionRepository.findQuestionsToDelete(
                testId,
                Array.from(processedQuestionIds),
                tx
            )
            for (const questionToDelete of questionsToDelete) {
                logger.debug(`[${LOG_NAMESPACE}] Удаление вопроса, которого нет в обновленном списке`, {
                    questionId: questionToDelete.id,
                })
                await questionRepository.delete(questionToDelete.id, tx)
                if (questionToDelete.image) {
                    await imageService.deleteImage(questionToDelete.image)
                }
            }
            await testRepository.incrementVersion(testId, test.version, tx)
            await testRepository.cleanupUnusedSnapshots(testId, tx)
            const updatedTest = await testRepository.findDetailedById(testId, tx)
            if (!updatedTest) {
                throw ApiError.InternalError("Не удалось получить обновленный тест")
            }
            await testRepository.createSnapshot(updatedTest, tx)
            await testRepository.clearModeration(testId, tx)
            // Очистка кэша
            await deleteTestCache(testId)

            return processedQuestions
        })
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

    // Валидация вопросов с типом FILL_IN_THE_BLANK
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

    // Проверка вопросов на наличие недопустимых слов
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
                        `Обнаружены недопустимые слова в тексте ответа вопроса №${questionNumber} ${answer.text}`
                    )
                }
            }
        }

        logger.debug(`[${LOG_NAMESPACE}] Все вопросы и ответы прошли проверку на недопустимые слова`)
    }
}

export const questionService = new QuestionService()
