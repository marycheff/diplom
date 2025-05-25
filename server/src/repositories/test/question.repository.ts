import { QuestionDTO } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { isValidUUID } from "@/utils/validator"
import { Prisma } from "@prisma/client"

class QuestionRepository {
    // CREATE
    async create(questionData: QuestionDTO, testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.create({
            data: {
                text: questionData.text,
                order: questionData.order || -1,
                type: questionData.type,
                image: questionData.image,
                testId: testId,
                answers: {
                    create: questionData.answers.map(answer => ({
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        isGenerated: false,
                        sequencePosition: answer.sequencePosition,
                    })),
                },
            },
            include: {
                answers: true,
            },
        })
    }

    // FIND
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

    async findQuestionsToDelete(testId: string, updatedQuestionIds: string[], tx?: Prisma.TransactionClient) {
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

    async findWithAnswers(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })
    }

    async findWithCorrectAnswers(testId: string) {
        return prisma.$transaction(async tx => {
            return tx.question.findMany({
                where: { testId },
                include: {
                    answers: {
                        where: { isCorrect: true },
                        select: { id: true },
                    },
                },
            })
        })
    }

    // UPDATE
    async update(questionId: string, updateData: QuestionDTO, tx?: Prisma.TransactionClient) {
        const client = tx || prisma

        // Обновление основных данных вопроса
        await client.question.update({
            where: { id: questionId },
            data: {
                text: updateData.text,
                order: updateData.order,
                type: updateData.type,
                image: updateData.image,
            },
        })

        // Получение текущих ответов
        const currentAnswers = await client.answer.findMany({
            where: { questionId },
        })

        const currentAnswersMap = new Map(currentAnswers.map(a => [a.id, a]))

        // Обработка каждого ответа
        for (const answer of updateData.answers) {
            if (isValidUUID(answer.id) && currentAnswersMap.has(answer.id)) {
                // Обновление существующего ответа
                await client.answer.update({
                    where: { id: answer.id },
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        sequencePosition: answer.sequencePosition,
                    },
                })
            } else {
                // Создание нового ответа
                await client.answer.create({
                    data: {
                        text: answer.text,
                        isCorrect: answer.isCorrect,
                        questionId: questionId,
                        isGenerated: false,
                        sequencePosition: answer.sequencePosition,
                    },
                })
            }
        }

        // Поиск и удаление ответов, которых нет в обновленном списке
        const updatedAnswerIds = updateData.answers.filter(a => isValidUUID(a.id)).map(a => a.id)
        const answersToDelete = Array.from(currentAnswersMap.keys()).filter(id => !updatedAnswerIds.includes(id))

        if (answersToDelete.length > 0) {
            await client.answer.deleteMany({
                where: {
                    id: { in: answersToDelete },
                },
            })
        }

        // Возврат обновленного вопроса с ответами
        const updatedQuestion = await client.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })

        return {
            ...updateData,
            answers: updatedQuestion?.answers,
        }
    }
    async updateImage(questionId: string, image: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return await client.question.update({
            where: { id: questionId },
            data: { image },
        })
    }

    // DELETE
    async delete(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        // Удаление всех связанных ответов
        await client.answer.deleteMany({
            where: { questionId },
        })

        // Удаление самого вопроса
        return await client.question.delete({
            where: { id: questionId },
        })
    }

    async deleteAllByTestId(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        // Удаление всех ответов для вопросов теста
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

        // Удаление всех вопросов теста
        return await client.question.deleteMany({
            where: { testId },
        })
    }
}

export const questionRepository = new QuestionRepository()
