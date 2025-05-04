import { AttemptAnswer, PreTestUserDataType } from "@/types"
import { logger } from "@/utils/logger"
import { Prisma, PrismaClient, TestAttempt, TestAttemptStatus } from "@prisma/client"

const prisma = new PrismaClient()
const LOG_NAMESPACE = "AttemptRepository"

class AttemptRepository {
    async createAttempt(data: {
        testId: string
        testSnapshotId: string
        userId?: string
        preTestUserData?: PreTestUserDataType | null
    }) {
        logger.debug(`[${LOG_NAMESPACE}] Создание новой попытки теста`, { testId: data.testId })
        return prisma.$transaction(async tx => {
            const testSnapshot = await tx.testSnapshot.findUnique({
                where: { id: data.testSnapshotId },
                include: { settings: true },
            })

            const timeLimit = testSnapshot?.settings?.timeLimit
            let expirationTime = null
            if (timeLimit && timeLimit > 0) {
                expirationTime = new Date(Date.now() + timeLimit * 1000)
            }

            const attempt = await tx.testAttempt.create({
                data: {
                    testId: data.testId,
                    testSnapshotId: data.testSnapshotId,
                    userId: data.userId,
                    preTestUserData: data.preTestUserData === null ? Prisma.JsonNull : data.preTestUserData,
                    status: TestAttemptStatus.IN_PROGRESS,
                    expirationTime,
                },
            })

            await tx.test.update({
                where: { id: data.testId },
                data: {
                    totalAttempts: {
                        increment: 1,
                    },
                },
            })

            logger.debug(`[${LOG_NAMESPACE}] Новая попытка создана`, { attemptId: attempt.id })
            return attempt
        })
    }

    async findAttemptWithTest(attemptId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск попытки с тестом`, { attemptId })
        try {
            const attempt = await prisma.testAttempt.findUnique({
                where: { id: attemptId },
                include: { test: true },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска попытки`, { attemptId, found: !!attempt })
            return attempt
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска попытки`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findQuestionWithAnswers(questionId: string, testId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск вопроса с ответами`, { questionId, testId })
        try {
            const question = await prisma.question.findUnique({
                where: {
                    id: questionId,
                    testId: testId,
                },
                include: { answers: true },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска вопроса`, { questionId, testId, found: !!question })
            return question
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска вопроса`, {
                questionId,
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async saveUserAnswer(attemptId: string, questionId: string, answersIds: string[], timeSpent: number) {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение ответа пользователя`, { attemptId, questionId })
        try {
            return prisma.$transaction(async tx => {
                await tx.userAnswer.deleteMany({
                    where: { attemptId, questionId },
                })

                await tx.userAnswer.createMany({
                    data: answersIds.map(answerId => ({
                        attemptId,
                        questionId,
                        answerId,
                        timeSpent,
                        answeredAt: new Date(),
                    })),
                })
            })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка сохранения ответа пользователя`, {
                attemptId,
                questionId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async saveUserAnswers(attemptId: string, answers: AttemptAnswer[]) {
        logger.debug(`[${LOG_NAMESPACE}] Сохранение ответов пользователя`, { attemptId })
        try {
            return prisma.$transaction(async tx => {
                for (const answer of answers) {
                    const { questionId, answersIds, timeSpent = 0, answeredAt } = answer

                    // Удаляем предыдущие ответы на этот вопрос
                    await tx.userAnswer.deleteMany({
                        where: { attemptId, questionId },
                    })

                    // Создаем новые ответы
                    if (answersIds.length > 0) {
                        await tx.userAnswer.createMany({
                            data: answersIds.map(answerId => ({
                                attemptId,
                                questionId,
                                answerId,
                                timeSpent,
                                answeredAt: answeredAt || new Date(),
                            })),
                        })
                    }
                }
            })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка сохранения ответов пользователя`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findAttemptWithDetails(attemptId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск попытки с деталями`, { attemptId })
        try {
            const attempt = await prisma.testAttempt.findUnique({
                where: { id: attemptId },
                include: {
                    answers: {
                        include: { answer: true },
                    },
                    test: {
                        include: {
                            questions: {
                                include: { answers: true },
                            },
                        },
                    },
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска попытки с деталями`, { attemptId, found: !!attempt })
            return attempt
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска попытки с деталями`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async getQuestionsWithCorrectAnswers(testId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Получение вопросов с правильными ответами`, { testId })
        try {
            return prisma.$transaction(async tx => {
                return tx.question.findMany({
                    where: { testId },
                    include: {
                        answers: {
                            where: { isCorrect: true },
                            select: { id: true },
                        },
                    },
                })
            })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка получения вопросов с правильными ответами`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async updateAttemptScore(attemptId: string, score: number) {
        logger.debug(`[${LOG_NAMESPACE}] Обновление оценки попытки`, { attemptId, score })
        try {
            const attempt = await prisma.testAttempt.update({
                where: { id: attemptId },
                data: {
                    score: Math.round(score * 100) / 100,
                    status: TestAttemptStatus.COMPLETED,
                    completedAt: new Date(),
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Оценка попытки успешно обновлена`, { attemptId })
            return attempt
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка обновления оценки попытки`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findAll(page: number, limit: number) {
        logger.debug(`[${LOG_NAMESPACE}] Получение всех попыток`, { page, limit })
        try {
            const skip = (page - 1) * limit
            const attempts = await prisma.testAttempt.findMany({
                skip,
                take: limit,
                include: {
                    test: {
                        include: {
                            author: true,
                            questions: {
                                include: { answers: true },
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                    user: true,
                    answers: {
                        include: {
                            question: true,
                            answer: true,
                        },
                    },
                },
                orderBy: { startedAt: "desc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Все попытки успешно получены`, { count: attempts.length })
            return attempts
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка получения всех попыток`, {
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findById(attemptId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск попытки по ID`, { attemptId })
        try {
            const attempt = await prisma.testAttempt.findUnique({
                where: { id: attemptId },
                include: {
                    answers: {
                        select: {
                            id: true,
                            attemptId: true,
                            questionId: true,
                            answerId: true,
                            answeredAt: true,
                            timeSpent: true,
                            createdAt: true,
                        },
                    },
                    test: {
                        include: {
                            questions: {
                                include: { answers: true },
                            },
                            author: true,
                        },
                    },
                    user: true,
                    snapshot: {
                        include: {
                            questions: {
                                include: { answers: true },
                            },
                            settings: true,
                        },
                    },
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска попытки по ID`, { attemptId, found: !!attempt })
            return attempt
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска попытки по ID`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findForUserById(attemptId: string) {
        logger.debug(`[${LOG_NAMESPACE}] Поиск попытки для пользователя по ID`, { attemptId })
        try {
            const attempt = await prisma.testAttempt.findUnique({
                where: { id: attemptId },
                include: {
                    answers: {
                        select: {
                            id: true,
                            attemptId: true,
                            questionId: true,
                            answerId: true,
                            answeredAt: true,
                            timeSpent: true,
                            createdAt: true,
                        },
                    },
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат поиска попытки для пользователя по ID`, {
                attemptId,
                found: !!attempt,
            })
            return attempt
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска попытки для пользователя по ID`, {
                attemptId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findInProgressByUserId(userId: string): Promise<boolean> {
        logger.debug(`[${LOG_NAMESPACE}] Проверка наличия активной попытки для пользователя`, { userId })
        try {
            const inProgressAttempt = await prisma.testAttempt.findFirst({
                where: {
                    userId: userId,
                    status: TestAttemptStatus.IN_PROGRESS,
                },
            })
            logger.debug(`[${LOG_NAMESPACE}] Результат проверки наличия активной попытки`, {
                userId,
                inProgress: !!inProgressAttempt,
            })
            return inProgressAttempt !== null
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка проверки наличия активной попытки для пользователя`, {
                userId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findManyByTestId(testId: string, page: number, limit: number) {
        logger.debug(`[${LOG_NAMESPACE}] Получение попыток по ID теста`, { testId, page, limit })
        try {
            const skip = (page - 1) * limit
            const attempts = await prisma.testAttempt.findMany({
                skip,
                take: limit,
                where: { testId },
                include: {
                    test: {
                        include: {
                            author: true,
                            questions: {
                                include: {
                                    answers: true,
                                },
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                    user: true,
                    answers: {
                        include: {
                            question: true,
                            answer: true,
                        },
                    },
                    snapshot: {
                        include: {
                            questions: {
                                include: {
                                    answers: true,
                                },
                            },
                            settings: true,
                        },
                    },
                },
                orderBy: { startedAt: "desc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Попытки по ID теста успешно получены`, { testId, count: attempts.length })
            return attempts
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка получения попыток по ID теста`, {
                testId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findByUserId(userId: string, page: number, limit: number) {
        logger.debug(`[${LOG_NAMESPACE}] Получение попыток по ID пользователя`, { userId, page, limit })
        try {
            const skip = (page - 1) * limit
            const attempts = await prisma.testAttempt.findMany({
                skip,
                take: limit,
                where: { userId },
                include: {
                    test: {
                        include: {
                            author: true,
                            questions: {
                                include: {
                                    answers: true,
                                },
                                orderBy: { order: "asc" },
                            },
                        },
                    },
                    user: true,
                    answers: {
                        include: {
                            question: true,
                            answer: true,
                        },
                    },
                    snapshot: {
                        include: {
                            questions: {
                                include: {
                                    answers: true,
                                },
                            },
                            settings: true,
                        },
                    },
                },
                orderBy: { startedAt: "desc" },
            })
            logger.debug(`[${LOG_NAMESPACE}] Попытки по ID пользователя успешно получены`, {
                userId,
                count: attempts.length,
            })
            return attempts
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка получения попыток по ID пользователя`, {
                userId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async count(where?: Prisma.TestAttemptWhereInput): Promise<number> {
        logger.debug(`[${LOG_NAMESPACE}] Подсчет количества попыток`, { where })
        try {
            const count = await prisma.testAttempt.count({
                where,
            })
            logger.debug(`[${LOG_NAMESPACE}] Количество попыток успешно получено`, { count })
            return count
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка подсчета количества попыток`, {
                where,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async findExpiredAttempts(batchSize: number): Promise<TestAttempt[]> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск истекших попыток`, { batchSize })
        try {
            const attempts = await prisma.testAttempt.findMany({
                where: {
                    status: TestAttemptStatus.IN_PROGRESS,
                    expirationTime: { lt: new Date() },
                },
                take: batchSize,
            })
            logger.debug(`[${LOG_NAMESPACE}] Истекшие попытки успешно найдены`, { count: attempts.length })
            return attempts
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка поиска истекших попыток`, {
                batchSize,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }

    async updateAttemptsStatus(attemptIds: string[], status: TestAttemptStatus) {
        logger.debug(`[${LOG_NAMESPACE}] Обновление статуса попыток`, { attemptIds, status })
        try {
            const result = await prisma.testAttempt.updateMany({
                where: { id: { in: attemptIds } },
                data: { status },
            })
            logger.debug(`[${LOG_NAMESPACE}] Статус попыток успешно обновлен`, { count: result.count })
            return result
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка обновления статуса попыток`, {
                attemptIds,
                status,
                error: error instanceof Error ? error.message : String(error),
            })
            throw error
        }
    }
}

export default new AttemptRepository()
