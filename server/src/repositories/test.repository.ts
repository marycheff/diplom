import { ShortTestInfo, TestSettingsDTO } from "@/types/test.types"
import { isValidUUID } from "@/utils/validator"
import { Answer, Prisma, PrismaClient, Question, QuestionType, Test, TestSettings } from "@prisma/client"

const prisma = new PrismaClient()
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
                status: test.status,
            },
        })

        for (const question of test.questions) {
            const questionSnapshot = await client.questionSnapshot.create({
                data: {
                    snapshotId: newSnapshot.id,
                    originalId: question.id,
                    text: question.text,
                    order: question.order,
                    type: question.type,
                },
            })

            await client.answerSnapshot.createMany({
                data: question.answers.map(answer => ({
                    questionId: questionSnapshot.id,
                    originalId: answer.id,
                    text: answer.text,
                    isCorrect: answer.isCorrect,
                })),
            })
        }

        if (test.settings) {
            await client.testSettingsSnapshot.create({
                data: {
                    snapshotId: newSnapshot.id,
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

    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo, tx?: Prisma.TransactionClient) {
        const client = tx || prisma
        return client.test.update({
            where: { id: testId },
            data: {
                title: updatedShortInfo.title,
                description: updatedShortInfo.description,
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

    // Транзакционные операции
    async executeTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
        return prisma.$transaction(callback)
    }

    async updateSettingsWithSnapshot(
        testId: string,
        testSettings: TestSettingsDTO,
        test: TestWithQuestionsAndSettings
    ) {
        return this.executeTransaction(async tx => {
            const existingSettings = await this.findSettingsById(testId, tx)

            if (existingSettings) {
                await this.updateSettings(testId, testSettings, tx)
            } else {
                await this.createSettings(testId, testSettings, tx)
            }

            await this.createSnapshot(test, tx)
            await this.incrementTestVersion(testId, test.version, tx)

            return true
        })
    }

    async updateShortInfoWithSnapshot(
        testId: string,
        updatedShortInfo: ShortTestInfo,
        test: TestWithQuestionsAndSettings
    ) {
        return this.executeTransaction(async tx => {
            await this.updateShortInfo(testId, updatedShortInfo, tx)
            await this.createSnapshot(test, tx)
            await this.incrementTestVersion(testId, test.version, tx)

            return true
        })
    }

    async create(
        authorId: string,
        testData: {
            title: string
            description: string | null
            settings?: TestSettingsDTO | null
        },
        tx?: Prisma.TransactionClient
    ) {
        const client = tx || prisma

        const createdTest = await client.test.create({
            data: {
                title: testData.title,
                description: testData.description || "",
                authorId: authorId,
                status: "PENDING",
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
                requireRegistration: testData.settings?.requireRegistration ?? false,
                inputFields: testData.settings?.inputFields ?? [],
                shuffleAnswers: testData.settings?.shuffleAnswers,
                shuffleQuestions: testData.settings?.shuffleQuestions,
                showDetailedResults: testData.settings?.showDetailedResults ?? false,
                timeLimit: testData.settings?.timeLimit ?? null,
            },
        })

        return { createdTest, settings }
    }

    async createWithSnapshot(
        authorId: string,
        testData: {
            title: string
            description: string | null
            settings?: TestSettingsDTO | null
        }
    ) {
        return this.executeTransaction(async tx => {
            const { createdTest, settings } = await this.create(authorId, testData, tx)

            await this.createSnapshot(
                {
                    ...createdTest,
                    settings,
                    questions: [],
                },
                tx
            )

            await tx.test.update({
                where: { id: createdTest.id },
                data: { version: 1 },
            })

            return { createdTest, settings }
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

    async createQuestion(
        testId: string,
        questionData: {
            text: string
            type: QuestionType
            order: number
        },
        tx?: Prisma.TransactionClient
    ) {
        const client = tx || prisma
        return client.question.create({
            data: {
                text: questionData.text,
                order: questionData.order,
                testId: testId,
                type: questionData.type,
            },
        })
    }

    async createAnswersForQuestion(
        questionId: string,
        answersData: {
            text: string
            isCorrect: boolean
        }[],
        tx?: Prisma.TransactionClient
    ) {
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

    async addQuestionsToTest(
        testId: string,
        questionsData: {
            text: string
            type: QuestionType
            answers: {
                text: string
                isCorrect: boolean
            }[]
        }[],
        test: TestWithAuthor
    ) {
        return this.executeTransaction(async tx => {
            const createdQuestions = await Promise.all(
                questionsData.map(async (questionData, index) => {
                    const createdQuestion = await this.createQuestion(
                        testId,
                        {
                            text: questionData.text,
                            type: questionData.type,
                            order: index + 1,
                        },
                        tx
                    )

                    await this.createAnswersForQuestion(createdQuestion.id, questionData.answers, tx)

                    return this.getQuestionWithAnswers(createdQuestion.id, tx)
                })
            )

            const validQuestions = createdQuestions.filter(question => question !== null)

            await this.incrementTestVersion(testId, test.version, tx)
            await this.createSnapshot(test, tx)

            return { test, questions: validQuestions }
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

    async findAll(skip: number, limit: number) {
        return prisma.test.findMany({
            skip,
            take: limit,
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
        return prisma.$transaction(async transaction => {
            await transaction.answerSnapshot.deleteMany({
                where: {
                    question: {
                        snapshot: {
                            testId: testId,
                        },
                    },
                },
            })

            await transaction.questionSnapshot.deleteMany({
                where: {
                    snapshot: {
                        testId: testId,
                    },
                },
            })

            await transaction.testSettingsSnapshot.deleteMany({
                where: {
                    snapshot: {
                        testId: testId,
                    },
                },
            })

            await transaction.testSnapshot.deleteMany({
                where: { testId: testId },
            })

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

            await transaction.testSettings.deleteMany({
                where: {
                    testId: testId,
                },
            })

            await transaction.test.delete({
                where: { id: testId },
            })
        })
    }

    async findDetailedTestById(testId: string) {
        return prisma.test.findUnique({
            where: { id: testId },
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
                settings: true,
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

    // Предполагаю, что метод getSearchConditions может быть полезен для переиспользования
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

    async findSnapshot(snapshotId: string) {
        return prisma.testSnapshot.findUnique({
            where: { id: snapshotId },
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
}

export default new TestRepository()
