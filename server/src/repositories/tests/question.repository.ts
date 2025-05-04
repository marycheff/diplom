import { QuestionDTO } from "@/types"
import { logger } from "@/utils/logger"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const LOG_NAMESPACE = "QuestionRepository"

class QuestionRepository {
    async findManyByTestId(testId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск всех вопросов по ID теста`, { testId })
        try {
            const questions = await prisma.question.findMany({
                where: { testId },
                include: { answers: true },
                orderBy: { order: "asc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Вопросы успешно найдены`, { testId, count: questions.length })
            return questions
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске вопросов по ID теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findById(questionId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск вопроса по ID`, { questionId })
        try {
            const question = await prisma.question.findUnique({
                where: { id: questionId },
            })
            logger.debug(`[${LOG_NAMESPACE}] Вопрос успешно найден`, { questionId, found: !!question })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске вопроса по ID`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findByIdWithTestId(questionId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск вопроса по ID с ID теста`, { questionId })
        try {
            const question = await prisma.question.findUnique({
                where: { id: questionId },
                select: { testId: true },
            })
            logger.debug(`[${LOG_NAMESPACE}] Вопрос с ID теста успешно найден`, { questionId, found: !!question })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске вопроса по ID с ID теста`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findByIdWithDetails(questionId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск вопроса по ID с деталями`, { questionId })
        try {
            const question = await prisma.question.findUnique({
                where: { id: questionId },
                include: {
                    answers: true,
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
            })
            logger.debug(`[${LOG_NAMESPACE}] Вопрос с деталями успешно найден`, { questionId, found: !!question })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске вопроса по ID с деталями`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async delete(questionId: string) {
        logger.info(`[${LOG_NAMESPACE}] Удаление вопроса по ID`, { questionId })
        try {
            const question = await prisma.question.delete({
                where: { id: questionId },
            })
            logger.info(`[${LOG_NAMESPACE}] Вопрос успешно удален`, { questionId })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении вопроса по ID`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async deleteAllByTestId(testId: string) {
        logger.info(`[${LOG_NAMESPACE}] Удаление всех вопросов по ID теста`, { testId })
        try {
            const result = await prisma.question.deleteMany({
                where: { testId },
            })
            logger.info(`[${LOG_NAMESPACE}] Все вопросы успешно удалены`, { testId, count: result.count })
            return result
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении всех вопросов по ID теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async update(questionId: string, updateData: QuestionDTO) {
        logger.info(`[${LOG_NAMESPACE}] Обновление вопроса по ID`, { questionId })
        try {
            const result = prisma.$transaction(async transaction => {
                await transaction.question.update({
                    where: { id: questionId },
                    data: {
                        text: updateData.text,
                        order: updateData.order,
                    },
                })

                await transaction.answer.deleteMany({
                    where: { questionId },
                })

                await transaction.answer.createMany({
                    data: updateData.answers.map(answer => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        questionId: questionId,
                        isGenerated: false,
                    })),
                })
            })
            logger.info(`[${LOG_NAMESPACE}] Вопрос успешно обновлен`, { questionId })
            return result
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении вопроса по ID`, {
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }
}

export default new QuestionRepository()
