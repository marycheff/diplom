import ApiError from "@/exceptions/api-error"
import { testSettingsSchema } from "@/schemas/test.schema"
import { InputFieldKey, InputFieldLabels } from "@/types/inputFields"
import { AnswerDTO, QuestionDTO, TestDTO, TestSettingsDTO, UpdateTestDTO } from "@/types/test.types"
import { Answer, PrismaClient, Question, Test } from "@prisma/client"
import { ObjectId } from "mongodb"

const prisma = new PrismaClient()

class TestService {
    private mapToResponseTest(
        test: Test & { settings?: TestSettingsDTO | null } & { questions?: (Question & { answers: Answer[] })[] }
    ): TestDTO {
        return {
            id: test.id,
            authorId: test.authorId,
            title: test.title,
            description: test.description || "",
            settings: test.settings
                ? {
                      requireRegistration: test.settings.requireRegistration,
                      inputFields: test.settings.inputFields,
                      showDetailedResults: test.settings.showDetailedResults,
                  }
                : {},
            questions: test.questions?.map(question => this.mapToResponseQuestion(question)) || [],
        }
    }

    private mapToResponseQuestion(question: Question & { answers?: Answer[] }): QuestionDTO {
        return {
            id: question.id,
            text: question.text,
            order: question.order,
            type: question.type,
            answers: question.answers?.map(answer => this.mapToResponseAnswer(answer)) || [],
        }
    }

    private mapToResponseAnswer(answer: Answer): AnswerDTO {
        return {
            id: answer.id,
            text: answer.text,
            isCorrect: answer.isCorrect,
        }
    }

    // ТЕСТ
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO) {
        await prisma.testSettings.update({
            where: { testId },
            data: testSettings,
        })
    }
    // Создание теста без вопросов
    async createTest(authorId: string, testData: TestDTO): Promise<TestDTO> {
        if (testData.settings) {
            const validation = testSettingsSchema.safeParse(testData.settings)
            if (!validation.success) {
                throw ApiError.BadRequest(validation.error.errors[0].message)
            }
        }

        return prisma.$transaction(async tx => {
            const createdTest = await tx.test.create({
                data: {
                    title: testData.title,
                    description: testData.description,
                    authorId: authorId,
                    status: "PENDING",
                },
            })
            const settings = await tx.testSettings.create({
                data: {
                    testId: createdTest.id,
                    requireRegistration: testData.settings?.requireRegistration ?? false,
                    inputFields: testData.settings?.inputFields ?? [],
                    requiredFields: testData.settings?.requiredFields ?? [],
                    showDetailedResults: testData.settings?.showDetailedResults ?? false,
                },
            })
            return this.mapToResponseTest({
                ...createdTest,
                settings,
            })
        })
    }

    // Добавление вопросов к существующему тесту
    async addQuestions(testId: string, userId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        return prisma.$transaction(async transaction => {
            if (!ObjectId.isValid(testId)) {
                throw ApiError.NotFound("Тест не найден")
            }

            const existingTest = await transaction.test.findUnique({
                where: { id: testId },
            })

            if (!existingTest) throw ApiError.NotFound("Тест не найден")
            if (existingTest.authorId !== userId) {
                throw ApiError.Forbidden()
            }

            // Создание новых вопросов с ответами
            const createdQuestions = await Promise.all(
                updateTestData.questions.map(async (questionData, index) => {
                    const createdQuestion = await transaction.question.create({
                        data: {
                            text: questionData.text,
                            order: index + 1,
                            testId: testId,
                            type: questionData.type,
                        },
                    })

                    await transaction.answer.createMany({
                        data: questionData.answers.map(answerData => ({
                            text: answerData.text,
                            isCorrect: answerData.isCorrect,
                            questionId: createdQuestion.id,
                            isGenerated: false,
                        })),
                    })

                    return transaction.question.findUnique({
                        where: { id: createdQuestion.id },
                        include: { answers: true },
                    })
                })
            )

            // Фильтруем null значения
            const validQuestions = createdQuestions.filter(
                (question): question is Question & { answers: Answer[] } => question !== null
            )

            return this.mapToResponseTest({
                ...existingTest,
                questions: validQuestions,
            })
        })
    }

    // Получение всех тестов пользователя
    async getUserTests(userId: string): Promise<TestDTO[]> {
        const tests = await prisma.test.findMany({
            where: { authorId: userId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
            },
        })

        return tests.map(test => this.mapToResponseTest(test))
    }

    // Получение всех тестов
    async getAllTests(): Promise<TestDTO[]> {
        const tests = await prisma.test.findMany({
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                },
                settings: true,
            },
            orderBy: { createdAt: "desc" },
        })
        return tests.map(test => this.mapToResponseTest(test))
    }
    // Удаление теста
    async deleteTest(testId: string): Promise<void> {
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
            test: this.mapToResponseTest(question.test),
            belongsToTest: true,
        }
    }
    // ВОПРОСЫ
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

    // ОТВЕТЫ

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
                question: answer.question ? this.mapToResponseQuestion(answer.question) : null,
                test: null,
                belongsToTest: false,
            }
        }
        return {
            answer,
            question: this.mapToResponseQuestion(answer.question),
            test: this.mapToResponseTest(answer.question.test),
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

    async getTestById(testId: string): Promise<TestDTO> {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: {
                questions: {
                    include: {
                        answers: true,
                    },
                    orderBy: { order: "asc" },
                },
                settings: true, // settings будет null, если их нет
            },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")
        return this.mapToResponseTest(test)
    }

    async getTestQuestions(testId: string): Promise<QuestionDTO[]> {
        const questions = await prisma.question.findMany({
            where: { testId },
            include: { answers: true },
            orderBy: { order: "asc" },
        })

        return questions.map(q => ({
            id: q.id,
            text: q.text,
            order: q.order,
            type: q.type,
            answers: q.answers.map(a => ({
                id: a.id,
                text: a.text,
                isCorrect: a.isCorrect,
            })),
        }))
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

    async startTestAttempt(
        testId: string,
        userData?: Record<string, any>,
        userId?: string
    ): Promise<{ attemptId: string }> {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: { settings: true },
        })

        if (!test) throw ApiError.NotFound("Тест не найден")

        const settings = test.settings
        if (settings?.requireRegistration && !userId) {
            throw ApiError.Forbidden()
        }

        if (settings?.requiredFields) {
            const requiredFields = settings.requiredFields as InputFieldKey[]
            if (!userData || requiredFields.some(field => userData[field] == null)) {
                const missingLabels = requiredFields.filter(field => userData?.[field] == null)
                const missingLabelsRu = requiredFields
                    .filter(field => userData?.[field] == null)
                    .map(f => InputFieldLabels[f])
                throw ApiError.BadRequest(
                    `Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(", ")})`
                )
            }
        }

        const attempt = await prisma.testAttempt.create({
            data: {
                testId,
                userId,
                userData: test.settings?.requireRegistration ? null : userData,
                status: "IN_PROGRESS",
            },
        })

        return { attemptId: attempt.id }
    }
    // Сохранение ответа
    async saveAnswer(attemptId: string, questionId: string, answerId: string): Promise<void> {
        const attempt = await prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: { test: true },
        })

        if (!attempt || attempt.completedAt) {
            throw ApiError.BadRequest("Попытка завершена или не существует")
        }

        // Проверка принадлежности вопроса тесту
        const question = await prisma.question.findUnique({
            where: { id: questionId, testId: attempt.testId },
        })

        if (!question) throw ApiError.BadRequest("Вопрос не принадлежит тесту")

        // Проверка принадлежности ответа вопросу
        const answer = await prisma.answer.findUnique({
            where: { id: answerId, questionId },
        })

        if (!answer) throw ApiError.BadRequest("Ответ не принадлежит вопросу")

        // Удаляем предыдущий ответ на этот вопрос (если есть)
        await prisma.userAnswer.deleteMany({
            where: { attemptId, questionId },
        })

        // Сохраняем новый ответ
        await prisma.userAnswer.create({
            data: { attemptId, questionId, answerId },
        })
    }

    // Завершение теста и подсчет результатов
    async completeTestAttempt(attemptId: string): Promise<{ score: number }> {
        return prisma.$transaction(async tx => {
            const attempt = await tx.testAttempt.findUnique({
                where: { id: attemptId },
                include: {
                    answers: {
                        include: {
                            answer: true,
                        },
                    },
                    test: {
                        include: {
                            questions: {
                                include: {
                                    answers: true,
                                },
                            },
                        },
                    },
                },
            })

            if (!attempt) throw ApiError.BadRequest("Попытка не найдена")
            if (attempt.completedAt) throw ApiError.BadRequest("Тест уже завершен")

            // Подсчет правильных ответов
            const totalQuestions = attempt.test.questions.length
            const correctAnswers = attempt.answers.filter(a => a.answer.isCorrect).length
            const score = (correctAnswers / totalQuestions) * 100

            // Обновление попытки
            await tx.testAttempt.update({
                where: { id: attemptId },
                data: {
                    score: Math.round(score * 100) / 100,
                    status: "COMPLETED",
                    completedAt: new Date(),
                },
            })

            return { score }
        })
    }
    async getAllAttempts(): Promise<any[]> {
        const attempts = await prisma.testAttempt.findMany({
            include: {
                test: {
                    include: {
                        author: true,
                        questions: {
                            include: {
                                answers: true,
                            },
                            orderBy: { order: "asc" },
                        },
                    },
                },
                user: true,
                answers: {
                    include: {
                        question: true,
                        answer: true,
                    },
                },
            },
            orderBy: { startedAt: "desc" },
        })

        return attempts.map(attempt => ({
            id: attempt.id,
            startedAt: attempt.startedAt,
            completedAt: attempt.completedAt,
            score: attempt.score,
            user: attempt.user ? { id: attempt.user.id, email: attempt.user.email } : attempt.userData,

            test: {
                id: attempt.test.id,
                title: attempt.test.title,
                author: {
                    id: attempt.test.author.id,
                    email: attempt.test.author.email,
                },
            },
            questions: attempt.test.questions.map(q => {
                const userAnswer = attempt.answers.find(a => a.questionId === q.id)?.answer
                return {
                    question: {
                        id: q.id,
                        text: q.text,
                    },
                    answers: q.answers.map(a => ({
                        id: a.id,
                        text: a.text,
                        isCorrect: a.isCorrect,
                    })),
                    userAnswer: userAnswer
                        ? {
                              id: userAnswer.id,
                              text: userAnswer.text,
                              isCorrect: userAnswer.isCorrect,
                          }
                        : null,
                }
            }),
        }))
    }

    async getAttempt(attemptId: string): Promise<any> {
        if (!ObjectId.isValid(attemptId)) {
            throw ApiError.BadRequest("Некорректный ID попытки прохождения теста")
        }

        const attempt = await prisma.testAttempt.findUnique({
            where: { id: attemptId },
            include: {
                test: {
                    include: {
                        author: true,
                        questions: {
                            include: {
                                answers: true,
                            },
                            orderBy: { order: "asc" },
                        },
                    },
                },
                user: true,
                answers: {
                    include: {
                        question: true,
                        answer: true,
                    },
                },
            },
        })

        // Проверка, существует ли попытка
        if (!attempt) {
            throw ApiError.BadRequest("Попытка не найдена")
        }

        return {
            id: attempt.id,
            startedAt: attempt.startedAt,
            completedAt: attempt.completedAt,
            score: attempt.score,
            user: attempt.user ? { id: attempt.user.id, email: attempt.user.email } : attempt.userData,

            test: {
                id: attempt.test.id,
                title: attempt.test.title,
                author: {
                    id: attempt.test.author.id,
                    email: attempt.test.author.email,
                },
            },
            questions: attempt.test.questions.map(q => {
                const userAnswer = attempt.answers.find(a => a.questionId === q.id)?.answer
                return {
                    question: {
                        id: q.id,
                        text: q.text,
                    },
                    answers: q.answers.map(a => ({
                        id: a.id,
                        text: a.text,
                        isCorrect: a.isCorrect,
                    })),
                    userAnswer: userAnswer
                        ? {
                              id: userAnswer.id,
                              text: userAnswer.text,
                              isCorrect: userAnswer.isCorrect,
                          }
                        : null,
                }
            }),
        }
    }

    async getUserAttempts(userId: string): Promise<any[]> {
        if (!ObjectId.isValid(userId)) {
            throw ApiError.BadRequest("Некорректный ID пользователя")
        }
        const attempts = await prisma.testAttempt.findMany({
            where: { userId: userId },
            include: {
                test: {
                    include: {
                        author: true,
                        questions: {
                            include: {
                                answers: true,
                            },
                            orderBy: { order: "asc" },
                        },
                    },
                },
                user: true,
                answers: {
                    include: {
                        question: true,
                        answer: true,
                    },
                },
            },
            orderBy: { startedAt: "desc" },
        })

        return attempts.map(attempt => ({
            id: attempt.id,
            startedAt: attempt.startedAt,
            completedAt: attempt.completedAt,
            score: attempt.score,
            user: attempt.user ? { id: attempt.user.id, email: attempt.user.email } : attempt.userData,

            test: {
                id: attempt.test.id,
                title: attempt.test.title,
                author: {
                    id: attempt.test.author.id,
                    email: attempt.test.author.email,
                },
            },
            questions: attempt.test.questions.map(q => {
                const userAnswer = attempt.answers.find(a => a.questionId === q.id)?.answer
                return {
                    question: {
                        id: q.id,
                        text: q.text,
                    },
                    answers: q.answers.map(a => ({
                        id: a.id,
                        text: a.text,
                        isCorrect: a.isCorrect,
                    })),
                    userAnswer: userAnswer
                        ? {
                              id: userAnswer.id,
                              text: userAnswer.text,
                              isCorrect: userAnswer.isCorrect,
                          }
                        : null,
                }
            }),
        }))
    }
}

export default new TestService()
