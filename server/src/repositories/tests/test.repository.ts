import { CreateAnswerDTO, CreateQuestionDTO, CreateTest, ShortTestInfo, TestSettingsDTO } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { isValidUUID } from "@/utils/validator"
import { Answer, ModerationStatus, Prisma, Question, Test, TestSettings, TestVisibilityStatus } from "@prisma/client"

type TestWithQuestionsAndSettings = Test & {
    questions: (Question & { answers: Answer[] })[]
    settings: TestSettings | null
}
type TestWithAuthor = TestWithQuestionsAndSettings & {
    author: {
        id: string
        email: string
        name: string | null
        surname: string | null
        patronymic: string | null
    }
}

class TestRepository {
    async findById(testId: string, tx?: Prisma.TransactionClient): Promise<TestWithQuestionsAndSettings | null> {
        const client = tx || prisma
        return client.test.findUnique({
            where: { id: testId },
            include: {
                questions: { include: { answers: true } },
                settings: true,
            },
        })
    }

    async findSettingsById(testId: string, tx?: Prisma.TransactionClient): Promise<TestSettings | null> {
        const client = tx || prisma
        return client.testSettings.findUnique({
            where: { testId },
        })
    }

    async updateSettings(testId: string, testSettings: TestSettingsDTO, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.testSettings.update({
            where: { testId },
            data: {
                ...testSettings,
                inputFields: testSettings.inputFields as Prisma.InputJsonValue,
            },
        })
    }

    async createSettings(testId: string, testSettings: TestSettingsDTO, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.testSettings.create({
            data: {
                ...testSettings,
                testId,
                inputFields: testSettings.inputFields as Prisma.InputJsonValue,
                timeLimit: testSettings.timeLimit,
            },
        })
    }

    async createSnapshot(test: TestWithQuestionsAndSettings, tx?: Prisma.TransactionClient) {
        const client = tx || prisma

        const newSnapshot = await client.testSnapshot.create({
            data: {
                testId: test.id,
                version: test.version,
                title: test.title,
                description: test.description,
                moderationStatus: test.moderationStatus,
            },
        })

        for (const question of test.questions) {
            const questionSnapshot = await client.questionSnapshot.create({
                data: {
                    testSnapshotId: newSnapshot.id,
                    originalTestId: question.id, //TODO: переименовать в originalID
                    text: question.text,
                    order: question.order,
                    type: question.type,
                },
            })

            await client.answerSnapshot.createMany({
                data: question.answers.map(answer => ({
                    questionId: questionSnapshot.id,
                    originalTestId: answer.id, //TODO: переименовать в originalID
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                })),
            })
        }

        if (test.settings) {
            await client.testSettingsSnapshot.create({
                data: {
                    testSnapshotId: newSnapshot.id,
                    requireRegistration: test.settings.requireRegistration,
                    inputFields: test.settings.inputFields ?? [],
                    showDetailedResults: test.settings.showDetailedResults,
                    shuffleQuestions: test.settings.shuffleQuestions,
                    shuffleAnswers: test.settings.shuffleAnswers,
                    timeLimit: test.settings.timeLimit,
                },
            })
        }

        return newSnapshot
    }

    // async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo, tx?: Prisma.TransactionClient) {
    //     const client = tx || prisma
    //     return client.test.update({
    //         where: { id: testId },
    //         data: {
    //             title: updatedShortInfo.title,
    //             description: updatedShortInfo.description,
    //         },
    //     })
    // }
    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: {
                title: updatedShortInfo.title,
                description: updatedShortInfo.description,
            },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
                author: true,
            },
        })
    }

    async incrementTestVersion(testId: string, currentVersion: number, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: { version: currentVersion + 1 },
        })
    }

    async create(authorId: string, testData: CreateTest, tx?: Prisma.TransactionClient) {
        const client = tx || prisma

        const createdTest = await client.test.create({
            data: {
                title: testData.title,
                description: testData.description,
                authorId: authorId,
            },
            include: {
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
        })

        const settings = await client.testSettings.create({
            data: {
                testId: createdTest.id,
                // requireRegistration: testData.settings?.requireRegistration ?? false,
                // inputFields: testData.settings?.inputFields ?? [],
                // shuffleAnswers: testData.settings?.shuffleAnswers,
                // shuffleQuestions: testData.settings?.shuffleQuestions,
                // showDetailedResults: testData.settings?.showDetailedResults ?? false,
                // timeLimit: testData.settings?.timeLimit ?? null,
            },
        })

        return { createdTest, settings }
    }

    async updateVersion(testId: string, version: number, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: { version },
        })
    }

    async findWithQuestionsAndAuthor(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.findUnique({
            where: { id: testId },
            include: {
                questions: { include: { answers: true } },
                settings: true,
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
        })
    }

    async createQuestion(testId: string, questionData: CreateQuestionDTO, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.create({
            data: {
                text: questionData.text,
                order: questionData.order!,
                testId: testId,
                type: questionData.type,
            },
        })
    }

    async createAnswersForQuestion(questionId: string, answersData: CreateAnswerDTO[], tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.answer.createMany({
            data: answersData.map(answerData => ({
                text: answerData.text,
                isCorrect: answerData.isCorrect,
                questionId: questionId,
                isGenerated: false,
            })),
        })
    }

    async getQuestionWithAnswers(questionId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.question.findUnique({
            where: { id: questionId },
            include: { answers: true },
        })
    }
    async findByAuthor(userId: string, skip: number, limit: number) {
        return prisma.test.findMany({
            skip,
            take: limit,
            where: { authorId: userId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
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
            orderBy: { createdAt: "desc" },
        })
    }

    async countByAuthor(userId: string) {
        return prisma.test.count({
            where: { authorId: userId },
        })
    }

    async findAll(skip: number, limit: number, where?: Prisma.TestWhereInput) {
        return prisma.test.findMany({
            skip,
            take: limit,
            where,
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
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
            orderBy: { createdAt: "desc" },
        })
    }

    async deleteById(testId: string) {
        return prisma.test.delete({
            where: { id: testId },
        })
    }

    async findDetailedTestById(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.findUnique({
            where: { id: testId },
            include: {
                settings: true,
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
        })
    }

    async findBasicTestInfo(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.findUnique({
            where: { id: testId },
            include: {
                settings: true,
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
        })
    }
    async search(query: string, skip: number, limit: number): Promise<TestWithAuthor[]> {
        const whereCondition = this.getSearchConditions(query)

        return prisma.test.findMany({
            skip,
            take: limit,
            where: whereCondition,
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                    orderBy: { order: "asc" },
                },
                settings: true,
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
            orderBy: { createdAt: "desc" },
        })
    }

    getSearchConditions(query: string): Prisma.TestWhereInput {
        const orConditions: Prisma.TestWhereInput[] = [
            { title: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            {
                questions: {
                    some: {
                        text: { contains: query, mode: "insensitive" },
                    },
                },
            },
            {
                questions: {
                    some: {
                        answers: {
                            some: {
                                text: { contains: query, mode: "insensitive" },
                            },
                        },
                    },
                },
            },
            {
                author: {
                    OR: [
                        { email: { contains: query, mode: "insensitive" } },
                        { name: { contains: query, mode: "insensitive" } },
                        { surname: { contains: query, mode: "insensitive" } },
                        { patronymic: { contains: query, mode: "insensitive" } },
                    ],
                },
            },
        ]

        if (isValidUUID(query)) {
            orConditions.unshift({ id: { equals: query } })
        }

        return { OR: orConditions }
    }
    async searchUserTests(query: string, userId: string, skip: number, limit: number) {
        const whereCondition = {
            authorId: userId,
            OR: this.getSearchConditions(query).OR,
        }

        return prisma.test.findMany({
            skip,
            take: limit,
            where: whereCondition,
            include: {
                questions: {
                    include: { answers: true },
                    orderBy: { order: "asc" },
                },
                settings: true,
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
            orderBy: { createdAt: "desc" },
        })
    }

    async findSnapshot(testSnapshotId: string) {
        return prisma.testSnapshot.findUnique({
            where: { id: testSnapshotId },
            include: {
                originalTest: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                email: true,
                                name: true,
                                surname: true,
                                patronymic: true,
                            },
                        },
                        questions: {
                            include: { answers: true },
                            orderBy: { order: "asc" },
                        },
                        settings: true,
                    },
                },
                questions: {
                    include: { answers: true },
                    orderBy: { order: "asc" },
                },
                settings: true,
            },
        })
    }
    async findLatestSnapshot(testId: string) {
        return prisma.testSnapshot.findFirst({
            where: { testId },
            orderBy: { version: "desc" },
        })
    }
    async count(where?: Prisma.TestWhereInput): Promise<number> {
        return prisma.test.count({ where })
    }

    async cleanupUnusedSnapshots(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma

        // Находим все снапшоты, к которым нет привязанных попыток
        const unusedSnapshots = await client.testSnapshot.findMany({
            where: {
                testId: testId,
                attempts: {
                    none: {}, // нет связанных attempts
                },
            },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
            },
        })

        // Удаляем найденные снапшоты и связанные данные
        for (const snapshot of unusedSnapshots) {
            // Сначала удаляем ответы для каждого вопроса
            for (const question of snapshot.questions) {
                await client.answerSnapshot.deleteMany({
                    where: {
                        questionId: question.id,
                    },
                })
            }

            // Затем удаляем вопросы
            await client.questionSnapshot.deleteMany({
                where: {
                    testSnapshotId: snapshot.id,
                },
            })

            // Удаляем настройки
            if (snapshot.settings) {
                await client.testSettingsSnapshot.delete({
                    where: {
                        testSnapshotId: snapshot.id,
                    },
                })
            }

            // Наконец удаляем сам снапшот
            await client.testSnapshot.delete({
                where: {
                    id: snapshot.id,
                },
            })
        }

        return unusedSnapshots.length
    }

    async updateVisibilityStatus(testId: string, status: TestVisibilityStatus, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: { visibilityStatus: status },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
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
        })
    }

    async updateModerationStatus(
        testId: string,
        status: ModerationStatus,
        moderatorId: string,
        tx?: Prisma.TransactionClient
    ) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: { moderationStatus: status, moderatedAt: new Date(), moderatedBy: moderatorId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
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
        })
    }
    async clearModeration(testId: string, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: { moderatedAt: null, moderatedBy: null },
        })
    }
}

export default new TestRepository()
