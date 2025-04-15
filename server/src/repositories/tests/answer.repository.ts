import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class AnswerRepository {
    async findAnswersByQuestionId(questionId: string) {
        return prisma.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })
    }

    async findAnswerWithDetails(answerId: string) {
        return prisma.answer.findUnique({
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
                },
            },
        })
    }

    async findCorrectAnswers(questionId: string) {
        return prisma.answer.findMany({
            where: {
                questionId,
                isCorrect: true,
            },
        })
    }

    async findOtherAnswers(questionId: string, excludeAnswerId: string) {
        return prisma.answer.findMany({
            where: {
                questionId,
                id: { not: excludeAnswerId },
            },
        })
    }

    async deleteAnswer(answerId: string) {
        return prisma.answer.delete({ where: { id: answerId } })
    }

    async deleteAllByQuestionId(questionId: string) {
        return prisma.answer.deleteMany({
            where: { questionId },
        })
    }
}

export default new AnswerRepository()
