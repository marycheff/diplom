import ApiError from "@/exceptions/api-error"
import testRepository from "@/repositories/tests/test.repository"
import { mapTest, mapToTestSnapshotDTO, mapUserTest } from "@/services/mappers/test.mappers"
import {
    CreateTest,
    ShortTestInfo,
    SnapshotWithOriginalTestDTO,
    TestDTO,
    TestSettingsDTO,
    TestsListDTO,
    UpdateTestDTO,
    UserTestDTO,
} from "@/types"

import { redisClient } from "@/utils/redis-client"

class TestService {
    // Обновление настроек теста
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO): Promise<void> {
        try {
            await testRepository.executeTransaction(async tx => {
                // 1. Получаем актуальные данные внутри транзакции
                const test = await testRepository.findById(testId, tx)
                if (!test) throw ApiError.NotFound("Тест не найден")

                // 2. Обновляем настройки
                const existingSettings = await testRepository.findSettingsById(testId, tx)
                if (existingSettings) {
                    const res = await testRepository.updateSettings(testId, testSettings, tx)
                } else {
                    await testRepository.createSettings(testId, testSettings, tx)
                }

                // 3. Инкрементим версию с актуальными данными
                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)

                // 4. Получаем обновленные данные в рамках транзакции
                const updatedTest = await testRepository.findDetailedTestById(testId, tx) // <-- Добавляем tx

                // 5. Используем обновленные данные для снапшота
                if (!updatedTest) {
                    throw ApiError.InternalError("Не удалось получить обновленный тест")
                }

                await testRepository.createSnapshot(updatedTest, tx)
            })
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при обновлении настроек теста")
        }
    }

    // Обновление краткой информации о тесте
    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo): Promise<void> {
        try {
            const test = await testRepository.findById(testId)
            if (!test) throw ApiError.NotFound("Тест не найден")

            await testRepository.executeTransaction(async tx => {
                const updatedTest = await testRepository.updateShortInfo(testId, updatedShortInfo, tx)
                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)
                await testRepository.createSnapshot(updatedTest, tx)
                return true
            })

            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при обновлении настроек теста")
        }
    }
    // Создание теста без вопросов
    async createTest(authorId: string, testData: CreateTest): Promise<TestDTO> {
        try {
            const result = await testRepository.executeTransaction(async tx => {
                // Создание теста
                const { createdTest, settings } = await testRepository.create(authorId, testData, tx)

                // Создание снапшота
                await testRepository.createSnapshot(
                    {
                        ...createdTest,
                        settings,
                        questions: [],
                    },
                    tx
                )

                // Обновление версии
                await testRepository.updateVersion(createdTest.id, 1, tx)

                return { createdTest, settings }
            })

            // Обновление кэша
            await redisClient.del(`user_tests:${authorId}`)

            // Формирование ответа
            return mapTest({
                ...result.createdTest,
                settings: result.settings,
                questions: [],
            })
        } catch (error) {
            console.error(error)
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при создании теста")
        }
    }
    async addQuestions(testId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        try {
            const { updatedTest, questions } = await testRepository.executeTransaction(async tx => {
                const test = await testRepository.findWithQuestionsAndAuthor(testId, tx)
                if (!test) throw ApiError.NotFound("Тест не найден")

                // Создание вопросов и ответов
                const createdQuestions = await Promise.all(
                    updateTestData.questions.map(async (questionData, index) => {
                        const createdQuestion = await testRepository.createQuestion(
                            testId,
                            {
                                text: questionData.text,
                                type: questionData.type,
                                order: index + 1,
                            },
                            tx
                        )

                        await testRepository.createAnswersForQuestion(createdQuestion.id, questionData.answers, tx)

                        return testRepository.getQuestionWithAnswers(createdQuestion.id, tx)
                    })
                )

                const validQuestions = createdQuestions.filter(question => question !== null)

                // 2. Увеличиваем версию теста
                await testRepository.incrementTestVersion(testId, test.version, tx)

                // 3. Очищаем неиспользуемые снапшоты
                await testRepository.cleanupUnusedSnapshots(testId, tx)

                // 4. Создаем новый снапшот
                const testWithUpdatedQuestions = {
                    ...test,
                    questions: [...validQuestions],
                }
                await testRepository.createSnapshot(testWithUpdatedQuestions, tx)
                return { updatedTest: test, questions: validQuestions }
            })

            // Обновляем кэш
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)

            return mapTest({
                ...updatedTest,
                questions,
            })
        } catch (error) {
            console.error(error)
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при добавлении вопросов к тесту")
        }
    }

    // Получение всех тестов пользователя
    async getMyTests(userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const tests = await testRepository.findByAuthor(userId, skip, limit)
            const total = await testRepository.countByAuthor(userId)

            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении тестов")
        }
    }

    async getAllTests(page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const tests = await testRepository.findAll(skip, limit)
            const total = await testRepository.count()

            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении тестов")
        }
    }

    async deleteTest(testId: string): Promise<void> {
        try {
            await testRepository.deleteById(testId)
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при удалении теста")
        }
    }

    async getTestById(testId: string): Promise<TestDTO> {
        try {
            const cacheKey = `test:${testId}`
            const cachedTest = await redisClient.get(cacheKey)
            if (cachedTest) return JSON.parse(cachedTest)

            const test = await testRepository.findDetailedTestById(testId)

            if (!test) throw ApiError.NotFound("Тест не найден")
            const testDTO = mapTest(test)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))

            return testDTO
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении теста")
        }
    }
    async getTestForUserById(testId: string): Promise<UserTestDTO> {
        try {
            const cacheKey = `user-test:${testId}`
            const cachedTest = await redisClient.get(cacheKey)

            if (cachedTest) return JSON.parse(cachedTest)

            const test = await testRepository.findDetailedTestById(testId)
            if (!test) throw ApiError.NotFound("Тест не найден")

            const testDTO = mapUserTest(test)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))

            return testDTO
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении теста")
        }
    }

    async searchTests(query: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const whereCondition = testRepository.getSearchConditions(query)

            const tests = await testRepository.search(query, skip, limit)
            const total = await testRepository.count(whereCondition)

            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при поиске тестов")
        }
    }
    async searchUserTests(query: string, userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const whereCondition = {
                authorId: userId,
                OR: testRepository.getSearchConditions(query).OR,
            }

            const tests = await testRepository.searchUserTests(query, userId, skip, limit)
            const total = await testRepository.count(whereCondition)

            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.BadRequest("Ошибка при поиске тестов")
        }
    }

    async getTestSnapshot(snapshotId: string): Promise<SnapshotWithOriginalTestDTO> {
        try {
            const cacheKey = `test_snapshot:${snapshotId}`
            const cachedSnapshot = await redisClient.get(cacheKey)
            if (cachedSnapshot) {
                return JSON.parse(cachedSnapshot)
            }

            const snapshot = await testRepository.findSnapshot(snapshotId)

            if (!snapshot) {
                throw ApiError.NotFound("Снимок теста не найден")
            }

            const result = {
                snapshot: mapToTestSnapshotDTO(snapshot),
                originalTest: mapTest(snapshot.originalTest),
            }

            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))

            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении снимка")
        }
    }
}

export default new TestService()
