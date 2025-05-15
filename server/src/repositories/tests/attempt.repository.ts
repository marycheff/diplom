import { AttemptAnswer, PreTestUserDataType } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { Prisma, TestAttempt, TestAttemptStatus } from "@prisma/client"

class AttemptRepository {
    async createAttempt(data: {
        testId: string
        testSnapshotId: string
        userId?: string
        preTestUserData?: PreTestUserDataType | null
    }) {
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

            return attempt
        })
    }

    async findAttemptWithTest(attemptId: string) {
        return prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: { test: true },
        })
    }

    async findQuestionWithAnswers(questionId: string, testId: string) {
        return prisma.question.findUnique({
            where: {
                id: questionId,
                testId: testId,
            },
            include: { answers: true },
        })
    }

    async saveUserAnswer(attemptId: string, questionId: string, answersIds: string[], timeSpent: number) {
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
    }
    async saveUserAnswers(attemptId: string, answers: AttemptAnswer[]) {
        return prisma.$transaction(async tx => {
            for (const answer of answers) {
                const { questionId, answersIds, textAnswer, timeSpent = 0, answeredAt } = answer

                // Получаем тип вопроса
                const question = await tx.question.findUnique({
                    where: { id: questionId },
                    select: { type: true },
                })

                // Удаляем предыдущие ответы на этот вопрос
                await tx.userAnswer.deleteMany({
                    where: { attemptId, questionId },
                })

                // Для вопросов с текстовым вводом
                if (question?.type === "TEXT_INPUT" && textAnswer !== undefined) {
                    // Получаем правильный ответ из теста
                    const correctAnswer = await tx.answer.findFirst({
                        where: {
                            questionId,
                            isCorrect: true,
                        },
                    })

                    // Определяем, правильный ли ответ 
                    const isCorrect = correctAnswer?.text.toLowerCase() === textAnswer?.toLowerCase()

                    // Создаем запись ответа пользователя с текстовым ответом и флагом правильности
                    await tx.userAnswer.create({
                        data: {
                            attemptId,
                            questionId,
                            answerId: correctAnswer?.id || "", // Связываем с правильным ответом
                            textAnswer, // Сохраняем текстовый ответ пользователя
                            isCorrect, // Добавить это поле в модель UserAnswer
                            timeSpent,
                            answeredAt: answeredAt || new Date(),
                        },
                    })
                }
                // Для вопросов с выбором ответов
                else if (answersIds.length > 0) {
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
    }
    async findAttemptWithDetails(attemptId: string) {
        return prisma.testAttempt.findUnique({
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
    }
    async getQuestionsWithCorrectAnswers(testId: string) {
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
    }
    async updateAttemptScore(attemptId: string, score: number) {
        return prisma.testAttempt.update({
            where: { id: attemptId },
            data: {
                score: Math.round(score * 100) / 100,
                status: TestAttemptStatus.COMPLETED,
                completedAt: new Date(),
            },
        })
    }
    async findAll(page: number, limit: number) {
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
        return attempts
    }
    async findById(attemptId: string) {
        return prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: {
                answers: {
                    select: {
                        id: true,
                        attemptId: true,
                        questionId: true,
                        answerId: true,
                        textAnswer: true,
                        isCorrect: true,
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
    }
    async findForUserById(attemptId: string) {
        return prisma.testAttempt.findUnique({
            where: { id: attemptId },

            include: {
                answers: {
                    select: {
                        id: true,
                        attemptId: true,
                        questionId: true,
                        textAnswer: true,
                        answerId: true,
                        isCorrect: true,
                        answeredAt: true,
                        timeSpent: true,
                        createdAt: true,
                    },
                },
            },
        })
    }
    async findInProgressByUserId(userId: string): Promise<boolean> {
        const inProgressAttempt = await prisma.testAttempt.findFirst({
            where: {
                userId: userId,
                status: TestAttemptStatus.IN_PROGRESS,
            },
        })

        return inProgressAttempt !== null
    }
    async findManyByTestId(testId: string, page: number, limit: number) {
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
        return attempts
    }
    async findManyByUserId(userId: string, page: number, limit: number) {
        const skip = (page - 1) * limit
        const attempts = await prisma.testAttempt.findMany({
            skip,
            take: limit,
            where: { userId },
            include: {
                user: true,
                snapshot: true,
            },
            orderBy: { startedAt: "desc" },
        })
        return attempts
    }
    async count(where?: Prisma.TestAttemptWhereInput): Promise<number> {
        return prisma.testAttempt.count({
            where,
        })
    }

    async findExpiredAttempts(batchSize: number): Promise<TestAttempt[]> {
        return prisma.testAttempt.findMany({
            where: {
                status: TestAttemptStatus.IN_PROGRESS,
                expirationTime: { lt: new Date() },
            },
            take: batchSize,
        })
    }

    async updateStatuses(attemptIds: string[], status: TestAttemptStatus) {
        return prisma.testAttempt.updateMany({
            where: { id: { in: attemptIds } },
            data: { status },
        })
    }
    async updateTimeSpent(attemptId: string, timeSpent: number) {
        return prisma.testAttempt.update({
            where: { id: attemptId },
            data: { timeSpent: timeSpent },
        })
    }
}

export default new AttemptRepository()
