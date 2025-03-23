import ApiError from "@/exceptions/api-error"
import { mapToResponseQuestion, mapToResponseTest } from "@/services/mappers/test.mappers"
import { QuestionDTO, TestDTO } from "@/types/test.types"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class QuestionService {
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
    async isQuestionBelongsToTest(questionId: string, testId: string): Promise<boolean> {
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            select: { testId: true },
        })
        if (!question) {
            throw ApiError.NotFound("Вопрос не найден")
        }
        return question.testId === testId
    }

    async isQuestionBelongsToAnyTest(
        questionId: string
    ): Promise<{ question: QuestionDTO | null; test: TestDTO | null; belongsToTest: boolean }> {
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: {
                answers: true,
                test: {
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
                    },
                },
            },
        })

        // 2. Если вопрос не найден
        if (!question) {
            return { question: null, test: null, belongsToTest: false }
        }

        // 3. Если вопрос найден, но не принадлежит тесту
        if (!question.test) {
            return {
                question: mapToResponseQuestion(question),
                test: null,
                belongsToTest: false,
            }
        }

        // 4. Если вопрос принадлежит тесту
        return {
            question: mapToResponseQuestion(question),
            test: mapToResponseTest(question.test),
            belongsToTest: true,
        }
    }

    async getQuestionById(questionId: string): Promise<QuestionDTO> {
        const question = await prisma.question.findUnique({ where: { id: questionId } })
        if (!question) {
            throw ApiError.NotFound("Вопрос не найден")
        }
        return mapToResponseQuestion(question)
    }

    // Удаление вопроса
    async deleteQuestion(questionId: string): Promise<void> {
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
    async deleteAllQuestions(testId: string): Promise<void> {
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

    // Изменение вопроса
    async updateQuestion(questionId: string, updateData: QuestionDTO): Promise<void> {
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
}

export default new QuestionService()
