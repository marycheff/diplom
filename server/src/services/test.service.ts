import ApiError from "@/exceptions/api-error"
import { CreateTest, TestResponse, UpdateTest } from "@/types/test.types" // Обновлено
import { Answer, PrismaClient, Question, Test } from "@prisma/client"
import { ObjectId } from "mongodb"
const prisma = new PrismaClient()

class TestService {
    // Создание теста без вопросов
    async createTest(authorId: string, testData: CreateTest): Promise<TestResponse> {
        try {
            const createdTest = await prisma.test.create({
                data: {
                    title: testData.title,
                    description: testData.description,
                    authorId: authorId,
                    status: "PENDING",
                },
            })
            return this.mapToResponse(createdTest)
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при создании теста")
        }
    }

    // Добавление вопросов к существующему тесту
    async addQuestions(testId: string, userId: string, updateTestData: UpdateTest): Promise<TestResponse> {
        return prisma.$transaction(async transaction => {
            if (!ObjectId.isValid(testId)) {
                throw ApiError.BadRequest("Тест не найден")
            }
            // Проверка существования теста
            const existingTest = await transaction.test.findUnique({ where: { id: testId } })

            if (!existingTest) throw ApiError.BadRequest("Тест не найден")
            if (existingTest.authorId !== userId) {
                throw ApiError.Forbidden()
            }
            // Удаление старых вопросов (опционально)
            // await transaction.question.deleteMany({ where: { testId } })

            // Создание новых вопросов с ответами
            const createdQuestions = await Promise.all(
                updateTestData.questions.map(async (questionData, index) => {
                    const createdQuestion = await transaction.question.create({
                        data: {
                            text: questionData.text,
                            order: index + 1,
                            testId: testId,
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

            return this.mapToResponse(existingTest, validQuestions)
        })
    }

    private mapToResponse(test: Test, questions?: (Question & { answers: Answer[] })[]): TestResponse {
        return {
            id: test.id,
            authorId: test.authorId,
            title: test.title,
            description: test.description || "",
            questions: questions?.map(question => ({
                id: question.id,
                text: question.text,
                order: question.order,
                answers: question.answers.map(answer => ({
                    id: answer.id,
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                })),
            })),
        }
    }

    async getUserTests(userId: string): Promise<TestResponse[]> {
        const tests = await prisma.test.findMany({
            where: { authorId: userId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        })

        return tests.map(test => this.mapToResponse(test, test.questions))
    }
    async getAllTests(): Promise<TestResponse[]> {
        const tests = await prisma.test.findMany({
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        })

        return tests.map(test => this.mapToResponse(test, test.questions))
    }
}

export default new TestService()
