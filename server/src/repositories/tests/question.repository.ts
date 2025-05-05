import { QuestionDTO } from "@/types"
import { prisma } from "@/utils/prisma-client"

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
    async createQuestion(questionData: Omit<QuestionDTO, "id">, testId: string) {
        return prisma.question.create({
            data: {
                text: questionData.text,
                order: questionData.order,
                type: questionData.type,
                testId: testId,
                answers: {
                    create: questionData.answers.map(answer => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        isGenerated: false,
                    })),
                },
            },
            include: {
                answers: true,
            },
        })
    }

    async findQuestionsNotInList(testId: string, questionIds: string[]) {
        return prisma.question.findMany({
            where: {
                testId,
                id: {
                    notIn: questionIds,
                },
            },
        })
    }

    // Метод для пакетного обновления вопросов в транзакции
    async upsertQuestions(testId: string, questions: QuestionDTO[], tx: any = prisma) {
        const result = []

        for (const question of questions) {
            if (question.id) {
                // Обновляем существующий вопрос
                await tx.question.update({
                    where: { id: question.id },
                    data: {
                        text: question.text,
                        order: question.order,
                        type: question.type,
                    },
                })

                // Обновляем ответы (удаляем старые и создаем новые)
                await tx.answer.deleteMany({
                    where: { questionId: question.id },
                })

                await tx.answer.createMany({
                    data: question.answers.map(answer => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        questionId: question.id,
                        isGenerated: false,
                    })),
                })

                result.push(question)
            } else {
                // Создаем новый вопрос
                const newQuestion = await tx.question.create({
                    data: {
                        text: question.text,
                        order: question.order,
                        type: question.type,
                        testId: testId,
                        answers: {
                            create: question.answers.map(answer => ({
                                text: answer.text,
                                isCorrect: answer.isCorrect,
                                isGenerated: false,
                            })),
                        },
                    },
                    include: {
                        answers: true,
                    },
                })

                result.push(newQuestion)
            }
        }

        return result
    }
}

export default new QuestionRepository()
