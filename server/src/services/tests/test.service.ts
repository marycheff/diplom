import ApiError from "@/exceptions/api-error"
import testRepository from "@/repositories/test.repository"
import { mapToResponseTest, mapToTestSnapshotDTO } from "@/services/mappers/test.mappers"
import {
    ShortTestInfo,
    SnapshotWithOriginalTestDTO,
    TestDTO,
    TestSettingsDTO,
    TestsListDTO,
    UpdateTestDTO,
} from "@/types/test.types"
import { redisClient } from "@/utils/redis-client"

class TestService {
    // Обновление настроек теста
    async updateTestSettings(testId: string, testSettings: TestSettingsDTO) {
        try {
            await testRepository.updateSettingsWithSnapshot(testId, testSettings)
            await redisClient.del(`test:${testId}`)
            return { success: true }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при обновлении настроек теста")
        }
    }

    // Обновление краткой информации о тесте
    async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo) {
        try {
            await testRepository.updateShortInfoWithSnapshot(testId, updatedShortInfo)
            await redisClient.del(`test:${testId}`)
            return { success: true }
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw ApiError.InternalError("Ошибка при обновлении настроек теста")
        }
    }
    // дальше есть другие методы, но я их пока не писал

    // --------------
    // Создание теста без вопросов

    async createTest(authorId: string, testData: TestDTO): Promise<TestDTO> {
        try {
            const { createdTest, settings } = await testRepository.createWithSnapshot(authorId, {
                title: testData.title,
                description: testData.description || null,
                settings: testData.settings || null,
            })

            await redisClient.del(`user_tests:${authorId}`)

            return mapToResponseTest({
                ...createdTest,
                settings,
                questions: [],
            })
        } catch (error) {
            throw ApiError.InternalError("Ошибка при создании теста")
        }
    }
    async addQuestions(testId: string, updateTestData: UpdateTestDTO): Promise<TestDTO> {
        try {
            const { test, questions } = await testRepository.addQuestionsToTest(testId, updateTestData.questions)

            await redisClient.del(`test:${testId}`)

            return mapToResponseTest({
                ...test,
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

    // ......

    // Получение всех тестов пользователя
    async getMyTests(userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const tests = await testRepository.findByAuthor(userId, skip, limit)
            const total = await testRepository.countByAuthor(userId)

            return {
                tests: tests.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
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
                tests: tests.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении тестов")
        }
    }

    async deleteTest(testId: string): Promise<void> {
        try {
            await testRepository.deleteById(testId)
            await redisClient.del(`test:${testId}`)
            await redisClient.del("tests:all")
        } catch (error) {
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
            const testDTO = mapToResponseTest(test)
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))

            return testDTO
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении теста")
        }
    }

    async searchTests(query: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const { result, total } = await testRepository.search(query, skip, limit)

            return {
                tests: result.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при поиске тестов")
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
                originalTest: mapToResponseTest(snapshot.originalTest),
            }

            await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))

            return result
        } catch (error) {
            console.error(error)
            throw ApiError.InternalError("Ошибка при получении снимка")
        }
    }

    async searchUserTests(query: string, userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
        try {
            const skip = (page - 1) * limit
            const { result, total } = await testRepository.searchUserTests(query, userId, skip, limit)

            return {
                tests: result.map(test => mapToResponseTest(test)),
                total,
            }
        } catch (error) {
            console.error(error)
            throw ApiError.BadRequest("Ошибка при поиске тестов")
        }
    }
}

export default new TestService()
