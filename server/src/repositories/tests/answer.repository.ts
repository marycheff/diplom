import { PrismaClient } from "@prisma/client"
import { logger } from "@/utils/logger"

const prisma = new PrismaClient()
const LOG_NAMESPACE = "AnswerRepository"

class AnswerRepository {
    async findAnswersByQuestionId(questionId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск ответов по ID вопроса`, { questionId })
        try {
            const question = await prisma.question.findUnique({
                where: { id: questionId },
                include: { answers: true },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска ответов по ID вопроса`, { questionId, found: !!question })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске ответов по ID вопроса`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findAnswerWithDetails(answerId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск деталей ответа по ID`, { answerId })
        try {
            const answer = await prisma.answer.findUnique({
                where: { id: answerId },
                include: {
                    question: {
                        include: {
                            test: {
                                include: {
                                    questions: {
                                        include: {
                                            answers: true,
                                        },
                                        orderBy: { order: "asc" },
                                    },
                                    author: {
                                        select: {
                                            id: true,
                                            email: true,
                                            name: true,
                                            surname: true,
                                            patronymic: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска деталей ответа по ID`, { answerId, found: !!answer })
            return answer
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске деталей ответа по ID`, {
                answerId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findCorrectAnswers(questionId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск правильных ответов по ID вопроса`, { questionId })
        try {
            const answers = await prisma.answer.findMany({
                where: {
                    questionId,
                    isCorrect: true,
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска правильных ответов по ID вопроса`, {
                questionId,
                count: answers.length,
            })
            return answers
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске правильных ответов по ID вопроса`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findOtherAnswers(questionId: string, excludeAnswerId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск других ответов по ID вопроса`, { questionId, excludeAnswerId })
        try {
            const answers = await prisma.answer.findMany({
                where: {
                    questionId,
                    id: { not: excludeAnswerId },
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска других ответов по ID вопроса`, {
                questionId,
                excludeAnswerId,
                count: answers.length,
            })
            return answers
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске других ответов по ID вопроса`, {
                questionId,
                excludeAnswerId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async deleteAnswer(answerId: string) {
        logger.info(`[${LOG_NAMESPACE}] Удаление ответа по ID`, { answerId })
        try {
            const answer = await prisma.answer.delete({ where: { id: answerId } })
            logger.info(`[${LOG_NAMESPACE}] Ответ успешно удален`, { answerId })
            return answer
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении ответа по ID`, {
                answerId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async deleteAllByQuestionId(questionId: string) {
        logger.info(`[${LOG_NAMESPACE}] Удаление всех ответов по ID вопроса`, { questionId })
        try {
            const result = await prisma.answer.deleteMany({
                where: { questionId },
            })
            logger.info(`[${LOG_NAMESPACE}] Все ответы успешно удалены`, { questionId, count: result.count })
            return result
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении всех ответов по ID вопроса`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }
}

export default new AnswerRepository()
