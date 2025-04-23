import { AttemptAnswer } from "@/types"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AttemptRepository {
    async createAttempt(data: {
        testId: string
        testSnapshotId: string
        userId?: string
        userData?: Record<string, any> | null
    }) {
        return prisma.$transaction(async tx => {
            const attempt = await tx.testAttempt.create({
                data: {
                    testId: data.testId,
                    testSnapshotId: data.testSnapshotId,
                    userId: data.userId,
                    userData: data.userData === null ? Prisma.JsonNull : data.userData,
                    status: "IN_PROGRESS",
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
                status: "COMPLETED",
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
    async findInProgressByUserId(userId: string): Promise<boolean> {
        const inProgressAttempt = await prisma.testAttempt.findFirst({
            where: {
                userId: userId,
                status: "IN_PROGRESS",
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
    async findByUserId(userId: string, page: number, limit: number) {
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
        return attempts
    }
    async count(where?: Prisma.TestAttemptWhereInput): Promise<number> {
        return prisma.testAttempt.count({
            where,
        })
    }
}

export default new AttemptRepository()
