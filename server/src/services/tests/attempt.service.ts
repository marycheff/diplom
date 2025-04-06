import ApiError from "@/exceptions/api-error"
import { mapToTestAttemptDTO } from "@/services/mappers/test.mappers"
import { PreTestUserData, PreTestUserDataLabels } from "@/types/inputFields"
import { AttemptsListDTO, TestAttemptDTO } from "@/types/test.types"
import { redisClient } from "@/utils/redis-client"
import { isValidUUID } from "@/utils/validator"
import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AttemptService {
    async startTestAttempt(
        testId: string,
        userData?: Record<string, any>,
        userId?: string
    ): Promise<{ attemptId: string }> {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: { settings: true, questions: true },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")
        if (!test.questions || test.questions.length === 0) {
            throw ApiError.BadRequest("Невозможно начать прохождение теста без вопросов")
        }
        const settings = test.settings
        if (settings?.requireRegistration && !userId) {
            throw ApiError.BadRequest("Для прохождения этого теста необходимо зарегистрироваться")
        }

        if (settings?.requiredFields) {
            const requiredFields = settings.requiredFields as PreTestUserData[]
            if (!userData || requiredFields.some(field => userData[field] == null)) {
                const missingLabels = requiredFields.filter(field => userData?.[field] == null)
                const missingLabelsRu = requiredFields
                    .filter(field => userData?.[field] == null)
                    .map(f => PreTestUserDataLabels[f])
                throw ApiError.BadRequest(
                    `Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(", ")})`
                )
            }
        }

        const attempt = await prisma.testAttempt.create({
            data: {
                testId,
                userId,
                userData: test.settings?.requireRegistration ? Prisma.JsonNull : userData,
                status: "IN_PROGRESS",
            },
        })
        await prisma.test.update({
            where: { id: testId },
            data: { totalAttempts: test.totalAttempts + 1 },
        })

        return { attemptId: attempt.id }
    }

    // Сохранение ответа
    async saveAnswer(attemptId: string, questionId: string, answerId: string, timeSpent?: number): Promise<void> {
        const attempt = await prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: { test: true },
        })

        if (!attempt) {
            throw ApiError.BadRequest("Попытка не существует")
        }
        if (attempt.status === "COMPLETED" || attempt.completedAt) {
            throw ApiError.BadRequest("Попытка уже завершена")
        }

        // Проверка принадлежности вопроса тесту
        const question = await prisma.question.findUnique({
            where: { id: questionId, testId: attempt.testId },
        })

        if (!question) throw ApiError.BadRequest("Вопрос не принадлежит тесту")

        // Проверка принадлежности ответа вопросу
        const answer = await prisma.answer.findUnique({
            where: { id: answerId, questionId },
        })

        if (!answer) throw ApiError.BadRequest("Ответ не принадлежит вопросу")

        // Удаляем предыдущий ответ на этот вопрос (если есть)
        await prisma.userAnswer.deleteMany({
            where: { attemptId, questionId },
        })

        // Сохраняем новый ответ
        await prisma.userAnswer.create({
            data: {
                attemptId,
                questionId,
                answerId,
                timeSpent,
                answeredAt: new Date(),
            },
        })
        await redisClient.del(`attempt:${attemptId}`)
    }

    // Завершение теста и подсчет результатов
    async completeTestAttempt(attemptId: string): Promise<{ score: number }> {
        return prisma.$transaction(async tx => {
            const attempt = await tx.testAttempt.findUnique({
                where: { id: attemptId },
                include: {
                    answers: {
                        include: {
                            answer: true,
                        },
                    },
                    test: {
                        include: {
                            questions: {
                                include: {
                                    answers: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!attempt) throw ApiError.BadRequest("Попытка не найдена")
            if (attempt.completedAt) throw ApiError.BadRequest("Тест уже завершен")

            // Подсчет правильных ответов
            const totalQuestions = attempt.test.questions.length
            const correctAnswers = attempt.answers.filter(a => a.answer.isCorrect).length
            const score = (correctAnswers / totalQuestions) * 100

            // Обновление попытки
            await tx.testAttempt.update({
                where: { id: attemptId },
                data: {
                    score: Math.round(score * 100) / 100,
                    status: "COMPLETED",
                    completedAt: new Date(),
                },
            })

            await redisClient.del(`attempt:${attemptId}`)
            return { score }
        })
    }

    async getAllAttempts(page = 1, limit = 10): Promise<AttemptsListDTO> {
        const skip = (page - 1) * limit
        const attempts = await prisma.testAttempt.findMany({
            skip,
            take: limit,
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
            },
            orderBy: { startedAt: "desc" },
        })
        const total = await prisma.testAttempt.count()

        return {
            attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
            total,
        }
    }

    async getAttempt(attemptId: string): Promise<TestAttemptDTO> {
        if (!isValidUUID(attemptId)) {
            throw ApiError.BadRequest("Некорректный ID попытки прохождения теста")
        }

        const cacheKey = `attempt:${attemptId}`
        const cachedData = await redisClient.get(cacheKey)
        if (cachedData) {
            return JSON.parse(cachedData)
        }

        const attempt = await prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: {
                answers: {
                    // Явно указываем все нужные поля UserAnswer
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
                            include: {
                                answers: true,
                            },
                        },
                        author: true,
                    },
                },
                user: true,
            },
        })

        // Проверка, существует ли попытка
        if (!attempt) {
            throw ApiError.BadRequest("Попытка не найдена")
        }

        const result = mapToTestAttemptDTO(attempt)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
        return result
    }

    async getUserAttempts(userId: string): Promise<TestAttemptDTO[]> {
        if (!isValidUUID(userId)) {
            throw ApiError.BadRequest("Некорректный ID пользователя")
        }

        const attempts = await prisma.testAttempt.findMany({
            where: { userId: userId },
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
            },
            orderBy: { startedAt: "desc" },
        })

        return attempts.map(attempt => mapToTestAttemptDTO(attempt))
    }

    async getTestAttempts(testId: string, page = 1, limit = 10): Promise<AttemptsListDTO> {
        const skip = (page - 1) * limit
        const attempts = await prisma.testAttempt.findMany({
            skip,
            take: limit,
            where: { testId: testId },
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
            },
            orderBy: { startedAt: "desc" },
        })
        const total = await prisma.testAttempt.count({ where: { testId: testId } })

        return {
            attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
            total,
        }
    }
}

export default new AttemptService()
