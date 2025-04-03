import ApiError from "@/exceptions/api-error"
import { testSettingsSchema } from "@/schemas/test.schema"
import { mapToResponseTest } from "@/services/mappers/test.mappers"
import { QuestionDTO, ShortTestInfo, TestDTO, TestSettingsDTO, TestsListDTO, UpdateTestDTO } from "@/types/test.types"
import { redisClient } from "@/utils/redis-client"
import { isValidObjectId } from "@/utils/validator"
import { Answer, Prisma, PrismaClient, Question } from "@prisma/client"

const prisma = new PrismaClient()

class TestService {
    // Обновление настроек теста
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO) {
        const existingSettings = await prisma.testSettings.findUnique({
            where: { testId },
        })

        if (existingSettings) {
            await prisma.testSettings.update({
                where: { testId },
                data: testSettings,
            })
        } else {
            await prisma.testSettings.create({
                data: {
                    ...testSettings,
                    testId,
                },
            })
        }
        await redisClient.del(`test:${testId}`)!
    }
    // Обновление краткой информации о тесте
    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo) {
        return prisma.$transaction(async tx => {
            await tx.test.update({
                where: { id: testId },
                data: {
                    title: updatedShortInfo.title,
                    description: updatedShortInfo.description,
                },
            })
            await redisClient.del(`test:${testId}`)
        })
    }
    // Создание теста без вопросов
    async createTest(authorId: string, testData: TestDTO): Promise<TestDTO> {
        if (testData.settings) {
            const validation = testSettingsSchema.safeParse(testData.settings)
            if (!validation.success) {
                throw ApiError.BadRequest(validation.error.errors[0].message)
            }
        }

        return prisma.$transaction(async tx => {
            const createdTest = await tx.test.create({
                data: {
                    title: testData.title,
                    description: testData.description,
                    authorId: authorId,
                    status: "PENDING",
                },
                include: {
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
            })

            const settings = await tx.testSettings.create({
                data: {
                    testId: createdTest.id,
                    requireRegistration: testData.settings?.requireRegistration ?? false,
                    inputFields: testData.settings?.inputFields ?? [],
                    requiredFields: testData.settings?.requiredFields ?? [],
                    showDetailedResults: testData.settings?.showDetailedResults ?? false,
                    timeLimit: testData.settings?.timeLimit ?? null,
                },
            })
            await redisClient.del(`user_tests:${authorId}`)

            return mapToResponseTest({
                ...createdTest,
                settings,
                questions: [],
            })
        })
    }

    // Добавление вопросов к существующему тесту
    async addQuestions(testId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        return prisma.$transaction(async transaction => {
            if (!isValidObjectId(testId)) {
                throw ApiError.NotFound("Тест не найден")
            }

            const existingTest = await transaction.test.findUnique({
                where: { id: testId },
                include: {
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
            })

            if (!existingTest) throw ApiError.NotFound("Тест не найден")
            // Создание новых вопросов с ответами
            const createdQuestions = await Promise.all(
                updateTestData.questions.map(async (questionData, index) => {
                    const createdQuestion = await transaction.question.create({
                        data: {
                            text: questionData.text,
                            order: index + 1,
                            testId: testId,
                            type: questionData.type,
                        },
                    })

                    await transaction.answer.createMany({
                        data: questionData.answers.map(answerData => ({
                            text: answerData.text,
                            isCorrect: answerData.isCorrect,
                            questionId: createdQuestion.id,
                            isGenerated: false,
                        })),
                    })

                    return transaction.question.findUnique({
                        where: { id: createdQuestion.id },
                        include: { answers: true },
                    })
                })
            )

            // Фильтруем null значения
            const validQuestions = createdQuestions.filter(
                (question): question is Question & { answers: Answer[] } => question !== null
            )
            await redisClient.del(`test:${testId}`)

            return mapToResponseTest({
                ...existingTest,
                questions: validQuestions,
            })
        })
    }
    async updateTestQuestions(testId: string, questions: QuestionDTO[]) {
        const lastOrderQuestion = await prisma.question.findFirst({
            where: { testId },
            orderBy: { order: "desc" },
            select: { order: true },
        })

        let nextOrder = (lastOrderQuestion?.order || 0) + 1

        return await prisma.$transaction(async tx => {
            const existingQuestions = questions.filter(q => isValidObjectId(q.id))
            const newQuestions = questions.filter(q => !isValidObjectId(q.id))

            // Update existing questions
            await Promise.all(
                existingQuestions.map(async question => {
                    // First delete related UserAnswer records
                    await tx.userAnswer.deleteMany({
                        where: {
                            answer: {
                                questionId: question.id,
                            },
                        },
                    })

                    // Then update the question and its answers
                    return tx.question.update({
                        where: { id: question.id },
                        data: {
                            text: question.text,
                            order: question.order,
                            type: question.type,
                            answers: {
                                deleteMany: {},
                                create: question.answers.map(answer => ({
                                    text: answer.text,
                                    isCorrect: answer.isCorrect,
                                })),
                            },
                        },
                    })
                })
            )

            // Rest of the code remains the same...
            if (newQuestions.length > 0) {
                await tx.question.createMany({
                    data: newQuestions.map(question => ({
                        text: question.text,
                        order: nextOrder++,
                        type: question.type,
                        testId,
                    })),
                })

                const createdQuestions = await tx.question.findMany({
                    where: {
                        testId,
                        order: { gte: nextOrder - newQuestions.length },
                    },
                    select: { id: true, order: true },
                })

                await Promise.all(
                    createdQuestions.map(createdQuestion => {
                        const question = newQuestions.find(
                            q => q.order === createdQuestion.order - (nextOrder - newQuestions.length - 1)
                        )
                        const answers = question?.answers || []

                        // Only create answers if there are any
                        if (answers.length > 0) {
                            return tx.answer.createMany({
                                data: answers.map(answer => ({
                                    text: answer.text,
                                    isCorrect: answer.isCorrect,
                                    questionId: createdQuestion.id,
                                })),
                            })
                        }
                        return Promise.resolve()
                    })
                )
            }

            await redisClient.del(`test:${testId}`)
            return tx.test.findUnique({
                where: { id: testId },
                include: { questions: { include: { answers: true } } },
            })
        })
    }

    // Получение всех тестов пользователя
    async getMyTests(userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        const skip = (page - 1) * limit
        // const cacheKey = `user_tests:${userId}`
        // const cached = await redisClient.get(cacheKey)
        // if (cached) return JSON.parse(cached)
        const tests = await prisma.test.findMany({
            skip,
            take: limit,
            where: { authorId: userId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,

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
            orderBy: { createdAt: "desc" },
        })
        const total = await prisma.test.count({
            where: { authorId: userId },
        })
        return {
            tests: tests.map(test => mapToResponseTest(test)),
            total,
        }
    }

    async getAllTests(page = 1, limit = 10): Promise<TestsListDTO> {
        const skip = (page - 1) * limit
        const total = await prisma.test.count()
        const tests = await prisma.test.findMany({
            skip,
            take: limit,
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
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
            orderBy: { createdAt: "desc" },
        })

        return {
            tests: tests.map(test => mapToResponseTest(test)),
            total,
        }
    }
    // Удаление теста
    async deleteTest(testId: string): Promise<void> {
        await prisma.$transaction(async transaction => {
            await transaction.answer.deleteMany({
                where: {
                    question: {
                        testId: testId,
                    },
                },
            })

            await transaction.question.deleteMany({
                where: {
                    testId: testId,
                },
            })
            await transaction.testSettings.deleteMany({
                where: {
                    testId: testId,
                },
            })

            await transaction.test.delete({
                where: { id: testId },
            })
        })
        await redisClient.del(`test:${testId}`)
        await redisClient.del("tests:all")
    }

    async getTestById(testId: string): Promise<TestDTO> {
        const cacheKey = `test:${testId}`
        const cachedTest = await redisClient.get(cacheKey)
        if (cachedTest) return JSON.parse(cachedTest)

        const test = await prisma.test.findUnique({
            where: { id: testId },
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
                settings: true,
            },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")
        const testDTO = mapToResponseTest(test)
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))

        return testDTO
    }

    async searchTests(query: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit

            // Явно указываем тип для условий поиска
            const orConditions: Prisma.TestWhereInput[] = [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                {
                    questions: {
                        some: {
                            text: { contains: query, mode: "insensitive" },
                        },
                    },
                },
                {
                    questions: {
                        some: {
                            answers: {
                                some: {
                                    text: { contains: query, mode: "insensitive" },
                                },
                            },
                        },
                    },
                },
                {
                    author: {
                        OR: [
                            { email: { contains: query, mode: "insensitive" } },
                            { name: { contains: query, mode: "insensitive" } },
                            { surname: { contains: query, mode: "insensitive" } },
                            { patronymic: { contains: query, mode: "insensitive" } },
                        ],
                    },
                },
            ]

            if (isValidObjectId(query)) {
                orConditions.unshift({ id: { equals: query } })
            }

            const result = await prisma.test.findMany({
                skip,
                take: limit,
                where: { OR: orConditions },
                include: {
                    questions: {
                        include: {
                            answers: true,
                        },
                        orderBy: { order: "asc" },
                    },
                    settings: true,
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
                orderBy: { createdAt: "desc" },
            })

            const total = await prisma.test.count({
                where: { OR: orConditions },
            })

            return {
                tests: result.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.BadRequest("Ошибка при поиске тестов")
        }
    }
    async searchUserTests(query: string, userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit

            const orConditions: Prisma.TestWhereInput[] = [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                {
                    questions: {
                        some: {
                            text: { contains: query, mode: "insensitive" },
                        },
                    },
                },
                {
                    questions: {
                        some: {
                            answers: {
                                some: {
                                    text: { contains: query, mode: "insensitive" },
                                },
                            },
                        },
                    },
                },
                {
                    author: {
                        OR: [
                            { email: { contains: query, mode: "insensitive" } },
                            { name: { contains: query, mode: "insensitive" } },
                            { surname: { contains: query, mode: "insensitive" } },
                            { patronymic: { contains: query, mode: "insensitive" } },
                        ],
                    },
                },
            ]

            if (isValidObjectId(query)) {
                orConditions.unshift({ id: { equals: query } })
            }

            const result = await prisma.test.findMany({
                skip,
                take: limit,
                where: {
                    authorId: userId,
                    OR: orConditions,
                },
                include: {
                    questions: {
                        include: {
                            answers: true,
                        },
                        orderBy: { order: "asc" },
                    },
                    settings: true,
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
                orderBy: { createdAt: "desc" },
            })

            const total = await prisma.test.count({
                where: { authorId: userId, OR: orConditions },
            })

            return {
                tests: result.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.BadRequest("Ошибка при поиске тестов")
        }
    }
}

export default new TestService()
