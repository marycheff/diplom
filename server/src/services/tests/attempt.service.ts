import ApiError from "@/exceptions/api-error"
import { mapToTestAttemptDTO } from "@/services/mappers/test.mappers"
import { PreTestUserData, PreTestUserDataLabels } from "@/types/inputFields"
import { AttemptsListDTO, TestAttemptDTO } from "@/types/test.types"
import { redisClient } from "@/utils/redis-client"
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
            include: {
                settings: true,
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")
        if (!test.questions || test.questions.length === 0) {
            throw ApiError.BadRequest("Невозможно начать прохождение теста без вопросов")
        }
        const settings = test.settings
        if (settings?.requireRegistration && !userId) {
            throw ApiError.BadRequest("Для прохождения этого теста необходимо зарегистрироваться")
        }

        if (settings?.inputFields && Array.isArray(settings.inputFields) && settings.inputFields.length > 0) {
            const inputFields = settings.inputFields as PreTestUserData[]
            if (!userData || inputFields.some(field => userData[field] == null)) {
                const missingLabels = inputFields.filter(field => userData?.[field] == null)
                const missingLabelsRu = inputFields
                    .filter(field => userData?.[field] == null)
                    .map(f => PreTestUserDataLabels[f])
                throw ApiError.BadRequest(
                    `Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(", ")})`
                )
            }
        }

        const latestSnapshot = await prisma.testSnapshot.findFirst({
            where: { testId: test.id },
            orderBy: { version: "desc" },
        })

        if (!latestSnapshot) {
            throw ApiError.NotFound("Не найден актуальный снапшот теста")
        }

        const attempt = await prisma.testAttempt.create({
            data: {
                testId,
                snapshotId: latestSnapshot.id,
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
    async saveAnswer(attemptId: string, questionId: string, answersIds: string[], timeSpent = 0): Promise<void> {
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
            include: { answers: true }, // Получаем все возможные ответы для вопроса
        })

        if (!question) throw ApiError.BadRequest("Вопрос не принадлежит тесту")

        // Проверка типа вопроса и количества ответов
        if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
            throw ApiError.BadRequest("Для вопроса с одиночным выбором можно указать только один ответ")
        }

        // Проверка принадлежности всех ответов вопросу
        if (answersIds.length > 0) {
            const validAnswerIds = question.answers.map(a => a.id)
            const allAnswersValid = answersIds.every(id => validAnswerIds.includes(id))

            if (!allAnswersValid) {
                if (question.type == "MULTIPLE_CHOICE")
                    throw ApiError.BadRequest("Один или несколько ответов не принадлежат вопросу")
                throw ApiError.BadRequest("Ответ не принадлежат вопросу")
            }
            // } else if (question.type !== "TEXT") {
            //     // Если это не текстовый вопрос
            //     throw ApiError.BadRequest("Необходимо указать хотя бы один ответ")
            // }

            // // Удаляем предыдущие ответы на этот вопрос (если есть)
            // await prisma.userAnswer.deleteMany({
            //     where: { attemptId, questionId },
            // })

            // // Сохраняем новые ответы
            // if (answersIds.length > 0) {
            //     await prisma.userAnswer.createMany({
            //         data: answersIds.map(answerId => ({
            //             attemptId,
            //             questionId,
            //             answerId,
            //             timeSpent,
            //             answeredAt: new Date(),
            //         })),
            //     })
            //     // } else {
            //     //     // Для текстового ответа (если будет добавлен в будущем)
            //     //     // Предполагаем, что в этом случае answersIds[0] содержит текст ответа
            //     //     await prisma.userAnswer.create({
            //     //         data: {
            //     //             attemptId,
            //     //             questionId,
            //     //             textAnswer: answersIds[0], // Текстовый ответ
            //     //             timeSpent,
            //     //             answeredAt: new Date(),
            //     //         },
            //     //     })
            // }
            await prisma.$transaction(async tx => {
                // Удаляем предыдущие ответы
                await tx.userAnswer.deleteMany({
                    where: { attemptId, questionId },
                })

                // Создаем новые
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

            await redisClient.del(`attempt:${attemptId}`)
        }
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

            // Получаем список всех вопросов теста с их правильными ответами
            const questionsWithAnswers = await tx.question.findMany({
                where: { testId: attempt.testId },
                include: {
                    answers: {
                        where: { isCorrect: true },
                        select: { id: true },
                    },
                },
            })

            // Для каждого вопроса проверяем, правильно ли на него ответил пользователь
            let correctQuestionsCount = 0

            for (const question of questionsWithAnswers) {
                // Получаем ответы пользователя на этот вопрос
                const userAnswersForQuestion = attempt.answers.filter(a => a.questionId === question.id)

                // Получаем ID правильных ответов для этого вопроса
                const correctAnswerIds = question.answers.map(a => a.id)

                // Получаем ID ответов пользователя
                const userAnswerIds = userAnswersForQuestion.map(a => a.answerId)

                // Проверяем, совпадают ли множества правильных ответов и ответов пользователя
                if (
                    correctAnswerIds.length === userAnswerIds.length &&
                    correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
                    userAnswerIds.every(id => correctAnswerIds.includes(id))
                ) {
                    correctQuestionsCount++
                }
            }

            const totalQuestions = questionsWithAnswers.length
            const score = (correctQuestionsCount / totalQuestions) * 100

            // Обновление попытки
            await tx.testAttempt.update({
                where: { id: attemptId },
                data: {
                    score: Math.round(score * 100) / 100,
                    // status: "COMPLETED",
                    // completedAt: new Date(),
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
        const total = await prisma.testAttempt.count({ where: { testId: testId } })

        return {
            attempts: attempts.map(attempt => mapToTestAttemptDTO(attempt)),
            total,
        }
    }
}

export default new AttemptService()
