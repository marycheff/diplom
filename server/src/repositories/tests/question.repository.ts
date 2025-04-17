import { QuestionDTO } from "@/types/test.types"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

class QuestionRepository {
    async findManyByTestId(testId: string) {
        return prisma.question.findMany({
            where: { testId },
            include: { answers: true },
            orderBy: { order: "asc" },
        })
    }

    async findById(questionId: string) {
        return prisma.question.findUnique({
            where: { id: questionId },
        })
    }

    async findByIdWithTestId(questionId: string) {
        return prisma.question.findUnique({
            where: { id: questionId },
            select: { testId: true },
        })
    }

    async findByIdWithDetails(questionId: string) {
        return prisma.question.findUnique({
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
    }

    async delete(questionId: string) {
        return await prisma.question.delete({
            where: { id: questionId },
        })
    }

    async deleteAllByTestId(testId: string) {
        return await prisma.question.deleteMany({
            where: { testId },
        })
    }

    async update(questionId: string, updateData: QuestionDTO) {
        return prisma.$transaction(async transaction => {
            await transaction.question.update({
                where: { id: questionId },
                data: {
                    text: updateData.text,
                    order: updateData.order,
                },
            })

            await transaction.answer.deleteMany({
                where: { questionId },
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

export default new QuestionRepository()
