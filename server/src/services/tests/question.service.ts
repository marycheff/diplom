import ApiError from "@/exceptions/api-error"
import questionRepository from "@/repositories/tests/question.repository"
import testRepository from "@/repositories/tests/test.repository"
import { mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { QuestionDTO, TestDTO } from "@/types"
import { logger } from "@/utils/logger"

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
}

export default new QuestionService()
