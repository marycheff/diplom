import { UserDto } from "@/dtos/user.dto"
import ApiError from "@/exceptions/api-error"
import { IAnswerResponse, IQuestion, IQuestionResponse, ITest, ITestResponse, IUpdateTest } from "@/types/test.types"
import { Answer, PrismaClient, Question, Test } from "@prisma/client"
import { ObjectId } from "mongodb"

const prisma = new PrismaClient()

class TestService {
    private mapToResponse(test: Test & { questions?: (Question & { answers: Answer[] })[] }): ITestResponse {
        return {
            id: test.id,
            authorId: test.authorId,
            title: test.title,
            description: test.description || "",
            questions: test.questions?.map(question => ({
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

    // Создание теста без вопросов
    async createTest(authorId: string, testData: ITest): Promise<ITestResponse> {
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
    async addQuestions(testId: string, userId: string, updateTestData: IUpdateTest): Promise<ITestResponse> {
        return prisma.$transaction(async transaction => {
            if (!ObjectId.isValid(testId)) {
                throw ApiError.BadRequest("Тест не найден")
            }

            const existingTest = await transaction.test.findUnique({
                where: { id: testId },
            })

            if (!existingTest) throw ApiError.BadRequest("Тест не найден")
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
                        },
                    })

                    await transaction.answer.createMany({
                        data: questionData.answers.map(answerData => ({
                            text: answerData.text,
                            is_correct: answerData.isCorrect,
                            questionId: createdQuestion.id,
                            is_generated: false,
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

            return this.mapToResponse({
                ...existingTest,
                questions: validQuestions,
            })
        })
    }

    // Получение всех тестов пользователя
    async getUserTests(userId: string): Promise<ITestResponse[]> {
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

        return tests.map(test => this.mapToResponse(test))
    }

    // Получение всех тестов
    async getAllTests(): Promise<ITestResponse[]> {
        const tests = await prisma.test.findMany({
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
            },
        })
        return tests.map(test => this.mapToResponse(test))
    }
    // Удаление теста
    async deleteTest(testId: string, user: UserDto): Promise<void> {
        if (!ObjectId.isValid(testId)) {
            throw ApiError.BadRequest("Тест не найден")
        }

        const test = await prisma.test.findUnique({ where: { id: testId } })
        if (!test) {
            throw ApiError.BadRequest("Тест не найден")
        }

        if (test.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }

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

            await transaction.test.delete({
                where: { id: testId },
            })
        })
    }

    // Удаление вопроса
    async deleteQuestion(questionId: string, user: UserDto): Promise<void> {
        if (!ObjectId.isValid(questionId)) {
            throw ApiError.BadRequest("Вопрос не найден")
        }
        const question = await prisma.question.findUnique({ where: { id: questionId } })
        if (!question) {
            throw ApiError.BadRequest("Вопрос не найден")
        }
        const test = await prisma.test.findUnique({ where: { id: question?.testId } })
        if (test?.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }
        await prisma.$transaction(async transaction => {
            await transaction.answer.deleteMany({
                where: {
                    questionId: questionId,
                },
            })
            await transaction.question.delete({
                where: { id: questionId },
            })
        })
    }

    // Удаление всех вопросов из теста
    async deleteAllQuestions(testId: string, user: UserDto): Promise<void> {
        if (!ObjectId.isValid(testId)) {
            throw ApiError.BadRequest("Тест не найден")
        }
        const existingTest = await prisma.test.findUnique({ where: { id: testId } })
        if (!existingTest) {
            throw ApiError.BadRequest("Тест не найден")
        }
        if (existingTest.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }
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
        })
    }

    // Удаление ответа
    async deleteAnswer(answerId: string, user: UserDto): Promise<void> {
        if (!ObjectId.isValid(answerId)) {
            throw ApiError.BadRequest("Ответ не найден")
        }
        const answer = await prisma.answer.findUnique({ where: { id: answerId } })
        if (!answer) {
            throw ApiError.BadRequest("Ответ не найден")
        }
        const question = await prisma.question.findUnique({ where: { id: answer.questionId } })
        const test = await prisma.test.findUnique({ where: { id: question?.testId } })
        if (test?.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }

        const correctAnswers = await prisma.answer.findMany({
            where: {
                questionId: question?.id,
                isCorrect: true,
            },
        })

        if (correctAnswers.length === 1 && correctAnswers[0].id === answerId) {
            const otherAnswers = await prisma.answer.findMany({
                where: {
                    questionId: question?.id,
                    id: { not: answerId },
                },
            })

            if (otherAnswers.length > 0 && otherAnswers.every(a => !a.isCorrect)) {
                throw ApiError.BadRequest("Нельзя удалить единственный правильный ответ")
            }
        }

        await prisma.answer.delete({
            where: { id: answerId },
        })
    }

    // Удаление всех ответов к вопросу
    async deleteAllAnswers(questionId: string, user: UserDto): Promise<void> {
        if (!ObjectId.isValid(questionId)) {
            throw ApiError.BadRequest("Вопрос не найден")
        }
        const question = await prisma.question.findUnique({ where: { id: questionId } })
        if (!question) {
            throw ApiError.BadRequest("Вопрос не найден")
        }
        const test = await prisma.test.findUnique({ where: { id: question?.testId } })
        if (test?.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }
        await prisma.answer.deleteMany({
            where: {
                questionId: questionId,
            },
        })
    }

    // Изменение вопроса
    async updateQuestion(questionId: string, user: UserDto, updateData: IQuestion): Promise<void> {
        if (!ObjectId.isValid(questionId)) {
            throw ApiError.BadRequest("Вопрос не найден")
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
        })
        if (!question) {
            throw ApiError.BadRequest("Вопрос не найден")
        }

        const test = await prisma.test.findUnique({
            where: { id: question.testId },
        })
        if (test?.authorId !== user.id && user.role !== "ADMIN") {
            throw ApiError.Forbidden()
        }

        await prisma.$transaction(async transaction => {
            await transaction.question.update({
                where: { id: questionId },
                data: {
                    text: updateData.text,
                    order: updateData.order,
                },
            })

            // Удаление существующих ответов
            await transaction.answer.deleteMany({
                where: { questionId: questionId },
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
    }

    async getTestById(testId: string): Promise<ITestResponse> {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                    orderBy: { order: "asc" },
                },
            },
        })

        if (!test) throw ApiError.BadRequest("Тест не найден")
        return this.mapToResponse(test)
    }

    async getTestQuestions(testId: string): Promise<IQuestionResponse[]> {
        const questions = await prisma.question.findMany({
            where: { testId },
            include: { answers: true },
            orderBy: { order: "asc" },
        })

        return questions.map(q => ({
            id: q.id,
            text: q.text,
            order: q.order,
            answers: q.answers.map(a => ({
                id: a.id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        }))
    }

    async getQuestionAnswers(questionId: string): Promise<IAnswerResponse[]> {
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })

        if (!question) throw ApiError.BadRequest("Вопрос не найден")

        return question.answers.map(a => ({
            id: a.id,
            text: a.text,
            isCorrect: a.isCorrect,
        }))
    }
}

export default new TestService()
