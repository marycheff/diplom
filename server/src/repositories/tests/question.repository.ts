import { QuestionDTO } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { isValidUUID } from "@/utils/validator"
import { Prisma } from "@prisma/client"

class QuestionRepository {
    async findManyByTestId(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findMany({
            where: { testId },
            include: { answers: true },
            orderBy: { order: "asc" },
        })
    }

    async findById(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findUnique({
            where: { id: questionId },
        })
    }

    async findByIdWithTestId(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findUnique({
            where: { id: questionId },
            select: { testId: true },
        })
    }

    async findByIdWithDetails(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findUnique({
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

    async delete(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        // Сначала удаляем все связанные ответы
        await client.answer.deleteMany({
            where: { questionId },
        })

        // Затем удаляем сам вопрос
        return await client.question.delete({
            where: { id: questionId },
        })
    }

    async deleteAllByTestId(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        // Удаляем все ответы для вопросов теста
        const questions = await this.findManyByTestId(testId, tx)
        const questionIds = questions.map(q => q.id)

        if (questionIds.length > 0) {
            await client.answer.deleteMany({
                where: {
                    questionId: {
                        in: questionIds,
                    },
                },
            })
        }

        // Удаляем все вопросы теста
        return await client.question.deleteMany({
            where: { testId },
        })
    }

    async update(questionId: string, updateData: QuestionDTO, tx?: Prisma.TransactionClient) {
        const client = tx || prisma

        // Обновляем основные данные вопроса
        await client.question.update({
            where: { id: questionId },
            data: {
                text: updateData.text,
                order: updateData.order,
                type: updateData.type,
            },
        })

        // Получаем текущие ответы
        const currentAnswers = await client.answer.findMany({
            where: { questionId },
        })

        const currentAnswersMap = new Map(currentAnswers.map(a => [a.id, a]))

        // Обрабатываем каждый ответ
        for (const answer of updateData.answers) {
            if (isValidUUID(answer.id) && currentAnswersMap.has(answer.id)) {
                // Обновляем существующий ответ
                await client.answer.update({
                    where: { id: answer.id },
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                    },
                })
            } else {
                // Создаем новый ответ
                await client.answer.create({
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        questionId: questionId,
                        isGenerated: false,
                    },
                })
            }
        }

        // Находим и удаляем ответы, которых нет в обновленном списке
        const updatedAnswerIds = updateData.answers.filter(a => isValidUUID(a.id)).map(a => a.id)

        const answersToDelete = Array.from(currentAnswersMap.keys()).filter(id => !updatedAnswerIds.includes(id))

        if (answersToDelete.length > 0) {
            await client.answer.deleteMany({
                where: {
                    id: { in: answersToDelete },
                },
            })
        }

        // Возвращаем обновленный вопрос с ответами
        const updatedQuestion = await client.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })

        return {
            ...updateData,
            answers: updatedQuestion?.answers,
        }
    }

    async createQuestion(questionData: QuestionDTO, testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.create({
            data: {
                text: questionData.text,
                order: questionData.order || -1,
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

    async getQuestionsToDelete(testId: string, updatedQuestionIds: string[], tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findMany({
            where: {
                testId,
                id: {
                    notIn: updatedQuestionIds,
                },
            },
        })
    }

    async deleteAnswers(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.answer.deleteMany({
            where: { questionId },
        })
    }

    async deleteQuestions(questionIds: string[], tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        // Сначала удаляем все связанные ответы
        await client.answer.deleteMany({
            where: {
                questionId: {
                    in: questionIds,
                },
            },
        })

        // Затем удаляем сами вопросы
        return client.question.deleteMany({
            where: {
                id: {
                    in: questionIds,
                },
            },
        })
    }
}

export default new QuestionRepository()
