import ApiError from "@/exceptions/api-error"
import { testSettingsSchema } from "@/schemas/test.schema"
import { mapToResponseTest } from "@/services/mappers/test.mappers"
import { TestDTO, TestSettingsDTO, TestsListDTO, UpdateTestDTO } from "@/types/test.types"
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
            

            return mapToResponseTest({
                ...createdTest,
                settings,
                questions: [],
            })
        })
    }

    // Добавление вопросов к существующему тесту
    async addQuestions(testId: string, userId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
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
            if (existingTest.authorId !== userId) {
                throw ApiError.Forbidden()
            }

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

            return mapToResponseTest({
                ...existingTest,
                questions: validQuestions,
            })
        })
    }

    // Получение всех тестов пользователя
    async getUserTests(userId: string): Promise<TestDTO[]> {
        const tests = await prisma.test.findMany({
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
        })

        return tests.map(test => mapToResponseTest(test))
    }

    async getAllTests(page: number = 1, limit: number = 10): Promise<TestsListDTO> {
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
    }

    async getTestById(testId: string): Promise<TestDTO> {
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
        return mapToResponseTest(test)
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
}

export default new TestService()
