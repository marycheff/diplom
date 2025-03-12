import ApiError from "@/exceptions/api-error"
import answerService from "@/services/tests/answer.service"
import testService from "@/services/tests/test.service"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types/test.types"
import { Answer, PrismaClient, Question } from "@prisma/client"

const prisma = new PrismaClient()

class QuestionService {
    public mapToResponseQuestion(question: Question & { answers?: Answer[] }): QuestionDTO {
        return {
            id: question.id,
            text: question.text,
            order: question.order,
            type: question.type,
            answers: question.answers?.map(answer => answerService.mapToResponseAnswer(answer)) || [],
        }
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
                question: this.mapToResponseQuestion(question),
                test: null,
                belongsToTest: false,
            }
        }

        // 4. Если вопрос принадлежит тесту
        return {
            question: this.mapToResponseQuestion(question),
            test: testService.mapToResponseTest(question.test),
            belongsToTest: true,
        }
    }

    async getQuestionById(questionId: string): Promise<QuestionDTO> {
        const question = await prisma.question.findUnique({ where: { id: questionId } })
        if (!question) {
            throw ApiError.NotFound("Вопрос не найден")
        }
        return this.mapToResponseQuestion(question)
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
    async getQuestionAnswers(questionId: string): Promise<AnswerDTO[]> {
        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })

        if (!question) throw ApiError.NotFound("Вопрос не найден")

        return question.answers.map(a => ({
            id: a.id,
            text: a.text,
            isCorrect: a.isCorrect,
        }))
    }
}

export default new QuestionService()
