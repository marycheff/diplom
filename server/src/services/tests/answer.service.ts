import ApiError from "@/exceptions/api-error"
import { mapToResponseQuestion, mapToResponseTest } from "@/types/mappers"
import { AnswerDTO, QuestionDTO, TestDTO } from "@/types/test.types"
import { Answer, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AnswerService {
    async isAnswerBelongsToAnyTest(answerId: string): Promise<{
        answer: AnswerDTO | null
        question: QuestionDTO | null
        test: TestDTO | null
        belongsToTest: boolean
    }> {
        const answer = await prisma.answer.findUnique({
            where: { id: answerId },
            include: {
                question: {
                    include: {
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
                },
            },
        })

        if (!answer) {
            return { answer: null, question: null, test: null, belongsToTest: false }
        }
        // Если ответ найден, но не принадлежит вопросу или тесту
        if (!answer.question || !answer.question.test) {
            return {
                answer,
                question: answer.question ? mapToResponseQuestion(answer.question) : null,
                test: null,
                belongsToTest: false,
            }
        }
        return {
            answer,
            question: mapToResponseQuestion(answer.question),
            test: mapToResponseTest(answer.question.test),
            belongsToTest: true,
        }
    }

    // Удаление ответа
    async deleteAnswer(answer: Answer): Promise<void> {
        const answerId = answer.id
        const correctAnswers = await prisma.answer.findMany({
            where: {
                questionId: answer.questionId,
                isCorrect: true,
            },
        })

        if (correctAnswers.length === 1 && correctAnswers[0].id === answerId) {
            const otherAnswers = await prisma.answer.findMany({
                where: {
                    questionId: answer.questionId,
                    id: { not: answerId },
                },
            })

            if (otherAnswers.length > 0 && otherAnswers.every(a => !a.isCorrect)) {
                throw ApiError.BadRequest("Нельзя удалить единственный правильный ответ")
            }
        }

        await prisma.answer.delete({ where: { id: answerId } })
    }

    // Удаление всех ответов к вопросу
    async deleteAllAnswers(questionId: string): Promise<void> {
        await prisma.answer.deleteMany({
            where: {
                questionId: questionId,
            },
        })
    }
}
export default new AnswerService()
