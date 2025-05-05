import ApiError from "@/exceptions/api-error"
import questionRepository from "@/repositories/tests/question.repository"
import testRepository from "@/repositories/tests/test.repository"
import { mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { QuestionDTO, TestDTO, UpdateTestDTO } from "@/types"
import { logger } from "@/utils/logger"
import { executeTransaction, prisma } from "@/utils/prisma-client"
import { redisClient } from "@/utils/redis-client"

const LOG_NAMESPACE = "QuestionService"

class QuestionService {
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
    async addQuestions(testId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        logger.info(`[${LOG_NAMESPACE}] Добавление вопросов к тесту`, { testId })
        try {
            const { updatedTest, questions } = await executeTransaction(async tx => {
                const test = await testRepository.findWithQuestionsAndAuthor(testId, tx)
                if (!test) {
                    logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                    throw ApiError.NotFound("Тест не найден")
                }

                const createdQuestions = await Promise.all(
                    updateTestData.questions.map(async (questionData, index) => {
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

    async upsertQuestions(testId: string, questions: QuestionDTO[]): Promise<QuestionDTO[]> {
        logger.info(`[${LOG_NAMESPACE}] Обновление/добавление вопросов теста`, {
            testId,
            questionsCount: questions.length,
        })

        try {
            // Проверяем существование теста
            const test = await testRepository.findById(testId)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }

            // Получаем текущие вопросы теста
            const existingQuestions = await questionRepository.findManyByTestId(testId)
            const existingQuestionsMap = new Map(existingQuestions.map(q => [q.id, q]))

            // Результаты обработки
            const result: QuestionDTO[] = []

            // Используем транзакцию для атомарности операции
            await prisma.$transaction(async transaction => {
                // Обрабатываем каждый вопрос из входящего массива
                for (const question of questions) {
                    try {
                        let processedQuestion: QuestionDTO

                        if (question.id && existingQuestionsMap.has(question.id)) {
                            // Обновляем существующий вопрос
                            logger.debug(`[${LOG_NAMESPACE}] Обновление существующего вопроса`, {
                                questionId: question.id,
                            })

                            await transaction.question.update({
                                where: { id: question.id },
                                data: {
                                    text: question.text,
                                    order: question.order,
                                    type: question.type,
                                },
                            })

                            // Удаляем старые ответы
                            await transaction.answer.deleteMany({
                                where: { questionId: question.id },
                            })

                            // Создаем новые ответы
                            for (const answer of question.answers) {
                                await transaction.answer.create({
                                    data: {
                                        text: answer.text,
                                        isCorrect: answer.isCorrect,
                                        questionId: question.id,
                                        isGenerated: false,
                                    },
                                })
                            }

                            processedQuestion = question
                        } else {
                            // Создаем новый вопрос
                            logger.debug(`[${LOG_NAMESPACE}] Создание нового вопроса`)

                            const newQuestion = await transaction.question.create({
                                data: {
                                    text: question.text,
                                    order: question.order,
                                    type: question.type,
                                    testId: testId,
                                    answers: {
                                        create: question.answers.map(answer => ({
                                            text: answer.text,
                                            isCorrect: answer.isCorrect,
                                            isGenerated: false,
                                        })),
                                    },
                                },
                                include: {
                                    answers: true,
                                },
                            })

                            processedQuestion = mapQuestion(newQuestion)
                        }

                        result.push(processedQuestion)
                    } catch (error) {
                        logger.error(`[${LOG_NAMESPACE}] Ошибка при обработке вопроса`, {
                            questionId: question.id,
                            error: error instanceof Error ? error.message : String(error),
                        })
                        throw error // Прокидываем ошибку для отмены транзакции
                    }
                }

                // Определяем ID вопросов, которые нужно удалить (те, которых нет в обновленном списке)
                const updatedQuestionIds = new Set(questions.filter(q => q.id).map(q => q.id))
                const questionsToDelete = existingQuestions.filter(q => !updatedQuestionIds.has(q.id))

                // Удаляем вопросы, которых нет в обновленном списке (опционально, в зависимости от требований)
                for (const questionToDelete of questionsToDelete) {
                    logger.debug(`[${LOG_NAMESPACE}] Удаление вопроса`, { questionId: questionToDelete.id })
                    await transaction.answer.deleteMany({
                        where: { questionId: questionToDelete.id },
                    })
                    await transaction.question.delete({
                        where: { id: questionToDelete.id },
                    })
                }
            })

            logger.info(`[${LOG_NAMESPACE}] Вопросы теста успешно обновлены/добавлены`, {
                testId,
                processedQuestionsCount: result.length,
            })

            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении/добавлении вопросов теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при обновлении/добавлении вопросов теста")
        }
    }
}

export default new QuestionService()
