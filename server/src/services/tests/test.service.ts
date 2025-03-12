import ApiError from "@/exceptions/api-error"
import { testSettingsSchema } from "@/schemas/test.schema"
import { mapToResponseTest } from "@/types/mappers"
import { QuestionDTO, TestDTO, TestSettingsDTO, UpdateTestDTO } from "@/types/test.types"
import { Answer, PrismaClient, Question } from "@prisma/client"
import { ObjectId } from "mongodb"

const prisma = new PrismaClient()

class TestService {
    // ТЕСТ
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO) {
        await prisma.testSettings.update({
            where: { testId },
            data: testSettings,
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
            })
            const settings = await tx.testSettings.create({
                data: {
                    testId: createdTest.id,
                    requireRegistration: testData.settings?.requireRegistration ?? false,
                    inputFields: testData.settings?.inputFields ?? [],
                    requiredFields: testData.settings?.requiredFields ?? [],
                    showDetailedResults: testData.settings?.showDetailedResults ?? false,
                },
            })
            return mapToResponseTest({
                ...createdTest,
                settings,
            })
        })
    }

    // Добавление вопросов к существующему тесту
    async addQuestions(testId: string, userId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        return prisma.$transaction(async transaction => {
            if (!ObjectId.isValid(testId)) {
                throw ApiError.NotFound("Тест не найден")
            }

            const existingTest = await transaction.test.findUnique({
                where: { id: testId },
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
            },
        })

        return tests.map(test => mapToResponseTest(test))
    }

    // Получение всех тестов
    async getAllTests(): Promise<TestDTO[]> {
        const tests = await prisma.test.findMany({
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
            },
            orderBy: { createdAt: "desc" },
        })
        return tests.map(test => mapToResponseTest(test))
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

    // ВОПРОСЫ

    // ОТВЕТЫ

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
                settings: true, // settings будет null, если их нет
            },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")
        return mapToResponseTest(test)
    }

    async getTestQuestions(testId: string): Promise<QuestionDTO[]> {
        const questions = await prisma.question.findMany({
            where: { testId },
            include: { answers: true },
            orderBy: { order: "asc" },
        })

        return questions.map(q => ({
            id: q.id,
            text: q.text,
            order: q.order,
            type: q.type,
            answers: q.answers.map(a => ({
                id: a.id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        }))
    }
}

export default new TestService()
