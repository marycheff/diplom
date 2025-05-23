import { ApiError } from "@/exceptions/api-error"
import { answerRepository } from "@/repositories/tests/answer.repository"
import { mapAnswer, mapQuestion, mapTest } from "@/services/mappers/test.mappers"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types"
import { logger } from "@/utils/logger"

const LOG_NAMESPACE = "AnswerService"

class AnswerService {
    async isAnswerBelongsToAnyTest(answerId: string): Promise<{
        answer: AnswerDTO | null
        question: QuestionDTO | null
        test: TestDTO | null
        belongsToTest: boolean
    }> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка принадлежности ответа к тесту`, { answerId })
        try {
            const answer = await answerRepository.findWithDetails(answerId)

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

    async isAnswerBelongsToQuestion(
        answerId: string,
        questionId: string
    ): Promise<{
        answer: AnswerDTO | null
        belongsToQuestion: boolean
    }> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка принадлежности ответа к вопросу`, { answerId, questionId })
        try {
            const answer = await answerRepository.findWithDetails(answerId)

            if (!answer) {
                logger.warn(`[${LOG_NAMESPACE}] Ответ не найден`, { answerId })
                return { answer: null, belongsToQuestion: false }
            }

            if (!answer.question || answer.question.id !== questionId) {
                logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит указанному вопросу`, { answerId, questionId })
                return { answer: mapAnswer(answer), belongsToQuestion: false }
            }

            logger.debug(`[${LOG_NAMESPACE}] Ответ принадлежит указанному вопросу`, { answerId, questionId })
            return { answer: mapAnswer(answer), belongsToQuestion: true }
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при проверке принадлежности ответа к вопросу`, {
                answerId,
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при проверке принадлежности ответа к вопросу")
        }
    }
}

export const answerService = new AnswerService()
