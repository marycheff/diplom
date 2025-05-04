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
import { logger } from "@/utils/logger"
import { redisClient } from "@/utils/redis-client"

const LOG_NAMESPACE = "TestService"

class TestService {
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Обновление настроек теста`, { testId })
        try {
            await testRepository.executeTransaction(async tx => {
                const test = await testRepository.findById(testId, tx)
                if (!test) {
                    logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                    throw ApiError.NotFound("Тест не найден")
                }

                const existingSettings = await testRepository.findSettingsById(testId, tx)
                if (existingSettings) {
                    await testRepository.updateSettings(testId, testSettings, tx)
                } else {
                    await testRepository.createSettings(testId, testSettings, tx)
                }

                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)

                const updatedTest = await testRepository.findDetailedTestById(testId, tx)
                if (!updatedTest) {
                    logger.error(`[${LOG_NAMESPACE}] Не удалось получить обновленный тест`, { testId })
                    throw ApiError.InternalError("Не удалось получить обновленный тест")
                }

                await testRepository.createSnapshot(updatedTest, tx)
            })
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.info(`[${LOG_NAMESPACE}] Настройки теста успешно обновлены`, { testId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении настроек теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при обновлении настроек теста")
        }
    }

    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Обновление краткой информации о тесте`, { testId })
        try {
            const test = await testRepository.findById(testId)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }

            await testRepository.executeTransaction(async tx => {
                const updatedTest = await testRepository.updateShortInfo(testId, updatedShortInfo, tx)
                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)
                await testRepository.createSnapshot(updatedTest, tx)
                return true
            })

            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.info(`[${LOG_NAMESPACE}] Краткая информация о тесте успешно обновлена`, { testId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении краткой информации о тесте`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при обновлении краткой информации о тесте")
        }
    }

    async createTest(authorId: string, testData: CreateTest): Promise<TestDTO> {
        logger.info(`[${LOG_NAMESPACE}] Создание теста`, { authorId })
        try {
            const result = await testRepository.executeTransaction(async tx => {
                const { createdTest, settings } = await testRepository.create(authorId, testData, tx)

                await testRepository.createSnapshot(
                    {
                        ...createdTest,
                        settings,
                        questions: [],
                    },
                    tx
                )

                await testRepository.updateVersion(createdTest.id, 1, tx)

                return { createdTest, settings }
            })

            await redisClient.del(`user_tests:${authorId}`)

            const testDTO = mapTest({
                ...result.createdTest,
                settings: result.settings,
                questions: [],
            })
            logger.info(`[${LOG_NAMESPACE}] Тест успешно создан`, { testId: result.createdTest.id })
            return testDTO
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при создании теста`, {
                authorId,
                error: error instanceof Error ? error.message : String(error),
            })
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при создании теста")
        }
    }

    async addQuestions(testId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        logger.info(`[${LOG_NAMESPACE}] Добавление вопросов к тесту`, { testId })
        try {
            const { updatedTest, questions } = await testRepository.executeTransaction(async tx => {
                const test = await testRepository.findWithQuestionsAndAuthor(testId, tx)
                if (!test) {
                    logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                    throw ApiError.NotFound("Тест не найден")
                }

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

                await testRepository.incrementTestVersion(testId, test.version, tx)
                await testRepository.cleanupUnusedSnapshots(testId, tx)

                const testWithUpdatedQuestions = {
                    ...test,
                    questions: [...validQuestions],
                }
                await testRepository.createSnapshot(testWithUpdatedQuestions, tx)
                return { updatedTest: test, questions: validQuestions }
            })

            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.info(`[${LOG_NAMESPACE}] Вопросы успешно добавлены к тесту`, { testId })
            return mapTest({
                ...updatedTest,
                questions,
            })
        } catch (error) {
            logger.error(`[${LOG_NAMESPACE}] Ошибка при добавлении вопросов к тесту`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при добавлении вопросов к тесту")
        }
    }

    async getMyTests(userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение тестов пользователя`, { userId, page, limit })
        try {
            const skip = (page - 1) * limit
            const tests = await testRepository.findByAuthor(userId, skip, limit)
            const total = await testRepository.countByAuthor(userId)

            logger.debug(`[${LOG_NAMESPACE}] Тесты пользователя успешно получены`, { userId, count: tests.length })
            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении тестов пользователя`, {
                userId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении тестов пользователя")
        }
    }

    async getAllTests(page = 1, limit = 10): Promise<TestsListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение всех тестов`, { page, limit })
        try {
            const skip = (page - 1) * limit
            const tests = await testRepository.findAll(skip, limit)
            const total = await testRepository.count()

            logger.debug(`[${LOG_NAMESPACE}] Все тесты успешно получены`, { count: tests.length })
            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении всех тестов`, {
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении всех тестов")
        }
    }

    async deleteTest(testId: string): Promise<void> {
        logger.info(`[${LOG_NAMESPACE}] Удаление теста`, { testId })
        try {
            await testRepository.deleteById(testId)
            await redisClient.del(`test:${testId}`)
            await redisClient.del(`user-test:${testId}`)
            logger.info(`[${LOG_NAMESPACE}] Тест успешно удален`, { testId })
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении теста`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при удалении теста")
        }
    }

    async getTestById(testId: string): Promise<TestDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение теста по ID`, { testId })
        try {
            const cacheKey = `test:${testId}`
            const cachedTest = await redisClient.get(cacheKey)
            if (cachedTest) {
                logger.debug(`[${LOG_NAMESPACE}] Тест получен из кэша`, { testId })
                return JSON.parse(cachedTest)
            }

            const test = await testRepository.findDetailedTestById(testId)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }

            const testDTO = mapTest(test)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))
            logger.debug(`[${LOG_NAMESPACE}] Тест успешно получен`, { testId })
            return testDTO
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении теста по ID`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении теста по ID")
        }
    }

    async getTestForUserById(testId: string): Promise<UserTestDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение теста для пользователя по ID`, { testId })
        try {
            const cacheKey = `user-test:${testId}`
            const cachedTest = await redisClient.get(cacheKey)

            if (cachedTest) {
                logger.debug(`[${LOG_NAMESPACE}] Тест для пользователя получен из кэша`, { testId })
                return JSON.parse(cachedTest)
            }

            const test = await testRepository.findDetailedTestById(testId)
            if (!test) {
                logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
                throw ApiError.NotFound("Тест не найден")
            }

            const testDTO = mapUserTest(test)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))
            logger.debug(`[${LOG_NAMESPACE}] Тест для пользователя успешно получен`, { testId })
            return testDTO
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении теста для пользователя по ID`, {
                testId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении теста для пользователя по ID")
        }
    }

    async searchTests(query: string, page = 1, limit = 10): Promise<TestsListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск тестов`, { query, page, limit })
        try {
            const skip = (page - 1) * limit
            const whereCondition = testRepository.getSearchConditions(query)

            const tests = await testRepository.search(query, skip, limit)
            const total = await testRepository.count(whereCondition)

            logger.debug(`[${LOG_NAMESPACE}] Результаты поиска тестов получены`, { query, count: tests.length })
            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске тестов`, {
                query,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при поиске тестов")
        }
    }

    async searchUserTests(query: string, userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Поиск тестов пользователя`, { query, userId, page, limit })
        try {
            const skip = (page - 1) * limit
            const whereCondition = {
                authorId: userId,
                OR: testRepository.getSearchConditions(query).OR,
            }

            const tests = await testRepository.searchUserTests(query, userId, skip, limit)
            const total = await testRepository.count(whereCondition)

            logger.debug(`[${LOG_NAMESPACE}] Результаты поиска тестов пользователя получены`, {
                query,
                userId,
                count: tests.length,
            })
            return {
                tests: tests.map(test => mapTest(test)),
                total,
            }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске тестов пользователя`, {
                query,
                userId,
                page,
                limit,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.BadRequest("Ошибка при поиске тестов пользователя")
        }
    }

    async getTestSnapshot(snapshotId: string): Promise<SnapshotWithOriginalTestDTO> {
        logger.debug(`[${LOG_NAMESPACE}] Получение снимка теста`, { snapshotId })
        try {
            const cacheKey = `test_snapshot:${snapshotId}`
            const cachedSnapshot = await redisClient.get(cacheKey)
            if (cachedSnapshot) {
                logger.debug(`[${LOG_NAMESPACE}] Снимок теста получен из кэша`, { snapshotId })
                return JSON.parse(cachedSnapshot)
            }

            const snapshot = await testRepository.findSnapshot(snapshotId)
            if (!snapshot) {
                logger.warn(`[${LOG_NAMESPACE}] Снимок теста не найден`, { snapshotId })
                throw ApiError.NotFound("Снимок теста не найден")
            }

            const result = {
                snapshot: mapToTestSnapshotDTO(snapshot),
                originalTest: mapTest(snapshot.originalTest),
            }

            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
            logger.debug(`[${LOG_NAMESPACE}] Снимок теста успешно получен`, { snapshotId })
            return result
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            logger.error(`[${LOG_NAMESPACE}] Ошибка при получении снимка теста`, {
                snapshotId,
                error: error instanceof Error ? error.message : String(error),
            })
            throw ApiError.InternalError("Ошибка при получении снимка теста")
        }
    }
}

export default new TestService()
