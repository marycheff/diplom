import ApiError from "@/exceptions/api-error"
import answerRepository from "@/repositories/tests/answer.repository"
import { mapAnswer, mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types"
import { logger } from "@/utils/logger"

const LOG_NAMESPACE = "AnswerService"

class AnswerService {
    async getQuestionAnswers(questionId: string): Promise<AnswerDTO[]> {
        logger.debug(`[${LOG_NAMESPACE}] Получение ответов на вопрос`, { questionId })
        try {
            const question = await answerRepository.findAnswersByQuestionId(questionId)
            if (!question) {
                logger.warn(`[${LOG_NAMESPACE}] Вопрос не найден`, { questionId })
                throw ApiError.NotFound("Вопрос не найден")
            }
            const answers = question.answers.map(mapAnswer)
            logger.debug(`[${LOG_NAMESPACE}] Ответы на вопрос успешно получены`, { questionId, count: answers.length })
            return answers
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении ответов на вопрос`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении ответов")
        }
    }

    async isAnswerBelongsToAnyTest(answerId: string): Promise<{
        answer: AnswerDTO | null
        question: QuestionDTO | null
        test: TestDTO | null
        belongsToTest: boolean
    }> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка принадлежности ответа к тесту`, { answerId })
        try {
            const answer = await answerRepository.findAnswerWithDetails(answerId)

            if (!answer) {
                logger.warn(`[${LOG_NAMESPACE}] Ответ не найден`, { answerId })
                return { answer: null, question: null, test: null, belongsToTest: false }
            }

            if (!answer.question || !answer.question.test) {
                logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит тесту`, { answerId })
                return {
                    answer,
                    question: answer.question ? mapQuestion(answer.question) : null,
                    test: null,
                    belongsToTest: false,
                }
            }

            logger.debug(`[${LOG_NAMESPACE}] Ответ принадлежит тесту`, { answerId })
            return {
                answer,
                question: mapQuestion(answer.question),
                test: mapTest(answer.question.test),
                belongsToTest: true,
            }
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке принадлежности ответа к тесту`, {
                answerId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при проверке принадлежности ответа к тесту")
        }
    }

    async deleteAnswer(answer: AnswerDTO): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление ответа`, { answerId: answer.id })
        if (!answer.id || !answer.questionId) {
            logger.warn(`[${LOG_NAMESPACE}] Недостаточно данных для удаления ответа`, { answerId: answer.id })
            throw ApiError.BadRequest("Недостаточно данных для удаления ответа")
        }
        try {
            const correctAnswers = await answerRepository.findCorrectAnswers(answer.questionId)

            if (correctAnswers.length === 1 && correctAnswers[0].id === answer.id) {
                const otherAnswers = await answerRepository.findOtherAnswers(answer.questionId, answer.id)

                if (otherAnswers.length > 0 && otherAnswers.every(a => !a.isCorrect)) {
                    logger.warn(`[${LOG_NAMESPACE}] Нельзя удалить единственный правильный ответ`, {
                        answerId: answer.id,
                    })
                    throw ApiError.BadRequest("Нельзя удалить единственный правильный ответ")
                }
            }
            await answerRepository.deleteAnswer(answer.id)
            logger.info(`[${LOG_NAMESPACE}] Ответ успешно удален`, { answerId: answer.id })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении ответа`, {
                answerId: answer.id,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.BadRequest("Ошибка при удалении ответа")
        }
    }

    async deleteAllAnswers(questionId: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление всех ответов на вопрос`, { questionId })
        try {
            await answerRepository.deleteAllByQuestionId(questionId)
            logger.info(`[${LOG_NAMESPACE}] Все ответы на вопрос успешно удалены`, { questionId })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении всех ответов на вопрос`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.BadRequest("Ошибка при удалении ответов")
        }
    }
}

export default new AnswerService()
