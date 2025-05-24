import { prisma } from "@/utils/prisma"

class AnswerRepository {
    // FIND
    async findWithDetails(answerId: string) {
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
}

export const answerRepository = new AnswerRepository()
