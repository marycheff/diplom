import { ApiError } from "@/exceptions"
import { mapTest, mapToTestSnapshotDTO, mapToTestSnapshotForAttemptDTO, mapUserTest } from "@/mappers"
import { attemptRepository, testRepository, userRepository } from "@/repositories"
import { mailService } from "@/services"
import {
	CreateTest,
	ShortTestInfo,
	SnapshotWithOriginalTestDTO,
	TestDTO,
	TestSettingsDTO,
	TestsListDTO,
	UserTestDTO
} from "@/types"
import { logger } from "@/utils/logger"
import { generateSeedFromAttemptId, shuffleArray } from "@/utils/math"
import { executeTransaction } from "@/utils/prisma-client"
import { redisClient } from "@/utils/redis/redis-client"

import { deleteTestCache } from "@/utils/redis/redis.utils"
import { sortInputFields } from "@/utils/sort"
import { ModerationStatus, Test, TestVisibilityStatus } from "@prisma/client"

const LOG_NAMESPACE = "TestService"

class TestService {
	// Создание пустого теста
	async createTest(authorId: string, testData: CreateTest): Promise<TestDTO> {
		logger.info(`[${LOG_NAMESPACE}] Создание теста`, { authorId })
		try {
			const result = await executeTransaction(async (tx) => {
				const { createdTest, settings } = await testRepository.create(authorId, testData, tx)

				await testRepository.createSnapshot(
					{
						...createdTest,
						settings,
						questions: []
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
				questions: []
			})
			logger.info(`[${LOG_NAMESPACE}] Тест успешно создан`, { testId: result.createdTest.id })
			return testDTO
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при создании теста`, {
				authorId,
				error: error instanceof Error ? error.message : String(error)
			})
			if (error instanceof ApiError) {
				throw error
			}
			throw ApiError.InternalError("Ошибка при создании теста")
		}
	}

	// Получение всех тестов
	async getAllTests(page = 1, limit = 10): Promise<TestsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение всех тестов`, { page, limit })
		try {
			const skip = (page - 1) * limit
			const tests = await testRepository.findMany(skip, limit)
			const total = await testRepository.count()

			// Получение totalAttempts для каждого теста
			const testsWithAttempts = await Promise.all(
				tests.map(async (test) => {
					const totalAttempts = await attemptRepository.count({ testId: test.id })
					return { ...test, totalAttempts }
				})
			)

			logger.debug(`[${LOG_NAMESPACE}] Все тесты успешно получены`, { count: testsWithAttempts.length })
			return {
				tests: testsWithAttempts.map((test) => mapTest(test)),
				total
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении всех тестов`, {
				page,
				limit,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении всех тестов")
		}
	}

	// Получение всех тестов, требующих модерации
	async getAllUnmoderatedTests(page = 1, limit = 10): Promise<TestsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение всех тестов`, { page, limit })
		try {
			const skip = (page - 1) * limit
			const tests = await testRepository.findMany(skip, limit, { moderatedAt: null })
			const total = await testRepository.count({ moderatedAt: null })

			// Получение totalAttempts для каждого теста
			const testsWithAttempts = await Promise.all(
				tests.map(async (test) => {
					const totalAttempts = await attemptRepository.count({ testId: test.id })
					return { ...test, totalAttempts }
				})
			)

			logger.debug(`[${LOG_NAMESPACE}] Все немодерированные тесты успешно получены`, {
				count: testsWithAttempts.length
			})
			return {
				tests: testsWithAttempts.map((test) => mapTest(test)),
				total
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении всех немодерированных тестов`, {
				page,
				limit,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении всех немодерированных тестов")
		}
	}

	// Получение теста по id
	async getTestById(testId: string): Promise<TestDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение теста по ID`, { testId })
		try {
			const cacheKey = `test:${testId}`
			const cachedTest = await redisClient.get(cacheKey)
			if (cachedTest) {
				logger.debug(`[${LOG_NAMESPACE}] Тест получен из кэша`, { testId })
				return JSON.parse(cachedTest)
			}

			const test = await testRepository.findDetailedById(testId)
			if (!test) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}

			// Подсчет кол-ва попыток для теста
			const totalAttempts = await attemptRepository.count({ testId })
			// Добавление totalAttempts к объекту теста
			const testWithAttempts = { ...test, totalAttempts }

			const testDTO = mapTest(testWithAttempts)
			await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))
			logger.debug(`[${LOG_NAMESPACE}] Тест успешно получен`, { testId })
			return testDTO
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении теста по ID`, {
				testId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении теста по ID")
		}
	}

	// Получение краткой информации о тесте
	async getBasicTestInfo(testId: string): Promise<UserTestDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение базовой информации о тесте`, { testId })
		try {
			const cacheKey = `user-test-basic:${testId}`
			const cachedTest = await redisClient.get(cacheKey)

			if (cachedTest) {
				logger.debug(`[${LOG_NAMESPACE}] Базовая информация о тесте получена из кэша`, { testId })

				const parsedTest = JSON.parse(cachedTest)
				if (
					parsedTest.visibilityStatus === TestVisibilityStatus.HIDDEN ||
					parsedTest?.status === ModerationStatus.REJECTED ||
					parsedTest?.status === ModerationStatus.PENDING
				) {
					logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
					throw ApiError.NotFound("Тест не найден")
				}
				return parsedTest
			}

			const test = await testRepository.findBasicInfo(testId)
			if (!test) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}
			if (
				test.visibilityStatus === TestVisibilityStatus.HIDDEN ||
				test.moderationStatus === ModerationStatus.PENDING ||
				test.moderationStatus === ModerationStatus.REJECTED
			) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}

			const testDTO = mapUserTest(test)
			await redisClient.setEx(cacheKey, 3600, JSON.stringify(testDTO))
			logger.debug(`[${LOG_NAMESPACE}] Базовая информация о тесте успешно получена`, { testId })

			return testDTO
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении базовой информации о тесте`, {
				testId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении базовой информации о тесте")
		}
	}

	// Получение теста для попытки
	async getTestForAttempt(testId: string, attemptId: string): Promise<UserTestDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение полной информации о тесте`, { testId, attemptId })
		try {
			const cacheKey = `user-test:${testId}:attempt:${attemptId}`
			const cachedTest = await redisClient.get(cacheKey)

			if (cachedTest) {
				logger.debug(`[${LOG_NAMESPACE}] Полная информация о тесте получена из кэша`, { testId, attemptId })

				const parsedTest = JSON.parse(cachedTest)
				if (
					parsedTest.visibilityStatus === TestVisibilityStatus.HIDDEN ||
					parsedTest?.status === ModerationStatus.REJECTED ||
					parsedTest?.status === ModerationStatus.PENDING
				) {
					logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
					throw ApiError.NotFound("Тест не найден")
				}
				return parsedTest
			}

			const test = await testRepository.findDetailedById(testId)
			if (!test) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}
			if (
				test.visibilityStatus === TestVisibilityStatus.HIDDEN ||
				test.moderationStatus === ModerationStatus.PENDING ||
				test.moderationStatus === ModerationStatus.REJECTED
			) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}

			let testDTO = mapUserTest(test)

			// Генерация seed на основе attemptId для детерминированного перемешивания
			const seed = generateSeedFromAttemptId(attemptId)

			// Перемешивание вопросов с привязкой к попытке
			if (test.settings?.shuffleQuestions && testDTO.questions) {
				testDTO.questions = shuffleArray(testDTO.questions, seed)
			}

			// Перемешивание вариантов ответов с привязкой к попытке
			if (test.settings?.shuffleAnswers && testDTO.questions) {
				testDTO.questions = testDTO.questions.map((question, index) => ({
					...question,
					answers: question.answers ? shuffleArray(question.answers, seed + index) : question.answers
				}))
			}

			await redisClient.setEx(cacheKey, 3600 * 24, JSON.stringify(testDTO))
			logger.debug(`[${LOG_NAMESPACE}] Полная информация о тесте успешно получена`, { testId, attemptId })

			return testDTO
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении полной информации о тесте`, {
				testId,
				attemptId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении полной информации о тесте")
		}
	}

	// Получение тестов пользователя
	async getUserTests(userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение тестов пользователя`, { userId, page, limit })
		try {
			const skip = (page - 1) * limit
			const tests = await testRepository.findByAuthor(userId, skip, limit)
			const total = await testRepository.countByAuthor(userId)

			// Получение totalAttempts для каждого теста
			const testsWithAttempts = await Promise.all(
				tests.map(async (test) => {
					const totalAttempts = await attemptRepository.count({ testId: test.id })
					return { ...test, totalAttempts }
				})
			)
			logger.debug(`[${LOG_NAMESPACE}] Тесты пользователя успешно получены`, { userId, count: tests.length })
			return {
				tests: testsWithAttempts.map((test) => mapTest(test)),
				total
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении тестов пользователя`, {
				userId,
				page,
				limit,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении тестов пользователя")
		}
	}

	// Получение снимка теста
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
				originalTest: mapTest(snapshot.originalTest)
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
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении снимка теста")
		}
	}

	// Получение снимка теста для попытки
	async getTestSnapshotForAttempt(snapshotId: string, attemptId?: string): Promise<UserTestDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение снимка теста для пользователя`, { snapshotId, attemptId })
		try {
			const isPreview = !attemptId
			const cacheKey = isPreview
				? `user-test-snapshot-basic:${snapshotId}`
				: `user-test-snapshot:${snapshotId}:attempt:${attemptId}`

			const cachedSnapshot = await redisClient.get(cacheKey)
			if (cachedSnapshot) {
				logger.debug(`[${LOG_NAMESPACE}] Снимок теста для пользователя получен из кэша`, {
					snapshotId,
					attemptId
				})
				const parsedSnapshot = JSON.parse(cachedSnapshot)

				// Проверяем статус снимка
				if (parsedSnapshot.visibilityStatus === TestVisibilityStatus.HIDDEN) {
					logger.warn(`[${LOG_NAMESPACE}] Снимок теста не найден или недоступен`, { snapshotId })
					throw ApiError.NotFound("Снимок теста не найден")
				}
				return parsedSnapshot
			}

			const snapshot = await testRepository.findSnapshot(snapshotId)
			if (!snapshot) {
				logger.warn(`[${LOG_NAMESPACE}] Снимок теста не найден`, { snapshotId })
				throw ApiError.NotFound("Снимок теста не найден")
			}

			// Проверяем статус модерации снимка
			if (
				snapshot.moderationStatus === ModerationStatus.PENDING ||
				snapshot.moderationStatus === ModerationStatus.REJECTED
			) {
				logger.warn(`[${LOG_NAMESPACE}] Снимок теста не найден или недоступен`, { snapshotId })
				throw ApiError.NotFound("Снимок теста не найден")
			}

			let testDTO = mapToTestSnapshotForAttemptDTO(snapshot)

			if (!isPreview) {
				// Генерация seed на основе attemptId для детерминированного перемешивания
				const seed = generateSeedFromAttemptId(attemptId)

				// Перемешивание вопросов с привязкой к попытке
				if (snapshot.settings?.shuffleQuestions && testDTO.questions) {
					testDTO.questions = shuffleArray(testDTO.questions, seed)
				}

				// Перемешивание вариантов ответов с привязкой к попытке
				if (snapshot.settings?.shuffleAnswers && testDTO.questions) {
					testDTO.questions = testDTO.questions.map((question, index) => ({
						...question,
						answers: question.answers ? shuffleArray(question.answers, seed + index) : question.answers
					}))
				}
			}

			const cacheTime = isPreview ? 3600 : 3600 * 24
			await redisClient.setEx(cacheKey, cacheTime, JSON.stringify(testDTO))
			logger.debug(`[${LOG_NAMESPACE}] Снимок теста для пользователя успешно получен`, { snapshotId, attemptId })

			return testDTO
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении снимка теста для пользователя`, {
				snapshotId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при получении снимка теста для пользователя")
		}
	}

	// Изменение настроек теста
	async updateTestSettings(testId: string, testSettings: TestSettingsDTO): Promise<void> {
		logger.info(`[${LOG_NAMESPACE}] Обновление настроек теста`, { testId })
		try {
			await executeTransaction(async (tx) => {
				const test = await testRepository.findById(testId, tx)
				if (!test) {
					throw ApiError.NotFound("Тест не найден")
				}

				if (!testSettings.allowRetake && testSettings.retakeLimit) {
					throw ApiError.BadRequest("Указан лимит попыток, но не указан флаг 'Разрешить повтор'")
				}

				const sortedInputFields = Array.isArray(testSettings.inputFields)
					? sortInputFields(testSettings.inputFields.filter((field): field is string => typeof field === "string"))
					: []

				const settingsWithSortedFields = {
					...testSettings,
					inputFields: sortedInputFields
				}

				await testRepository.upsertSettings(testId, settingsWithSortedFields, tx)
				await testRepository.incrementVersion(testId, test.version, tx)
				await testRepository.cleanupUnusedSnapshots(testId, tx)

				const updatedTest = await testRepository.findDetailedById(testId, tx)
				if (!updatedTest) {
					throw ApiError.InternalError("Не удалось получить обновленный тест")
				}

				await testRepository.createSnapshot(updatedTest, tx)
			})
			await deleteTestCache(testId)

			logger.info(`[${LOG_NAMESPACE}] Настройки теста успешно обновлены`, { testId })
		} catch (error) {
			throw ApiError.InternalError("Ошибка при обновлении настроек теста")
		}
	}

	// Изменение статуса видимости теста
	async updateVisibilityStatus(testId: string, status: TestVisibilityStatus, test?: Test): Promise<void> {
		logger.info(`[${LOG_NAMESPACE}] Изменение статуса видимости теста`, { testId, status })

		try {
			await executeTransaction(async (tx) => {
				const existingTest = test ?? (await testRepository.findById(testId))

				if (!existingTest) {
					throw ApiError.NotFound("Тест не найден")
				}

				await testRepository.updateVisibilityStatus(testId, status, tx)
				// await testRepository.incrementTestVersion(testId, existingTest.version, tx)
				await testRepository.cleanupUnusedSnapshots(testId, tx)

				// const updatedTest = await testRepository.findDetailedTestById(testId, tx)
				// if (!updatedTest) {
				//     throw ApiError.InternalError("Не удалось получить обновленный тест")
				// }

				// await testRepository.createSnapshot(updatedTest, tx)
			})

			await deleteTestCache(testId)

			logger.info(`[${LOG_NAMESPACE}] Статус видимости теста успешно изменен`, { testId, status })
		} catch (error) {
			if (error instanceof ApiError) throw error

			logger.error(`[${LOG_NAMESPACE}] Ошибка при изменении статуса видимости теста`, {
				testId,
				status,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при изменении статуса видимости теста")
		}
	}

	// Изменение статуса модерации теста
	async updateModerationStatus(
		testId: string,
		status: ModerationStatus,
		moderatorId: string,
		test?: Test
	): Promise<void> {
		logger.info(`[${LOG_NAMESPACE}] Изменение статуса модерации теста`, { testId, status })

		try {
			await executeTransaction(async (tx) => {
				const existingTest = test ?? (await testRepository.findById(testId))

				if (!existingTest) {
					throw ApiError.NotFound("Тест не найден")
				}

				await testRepository.updateModerationStatus(testId, status, moderatorId, tx)

				const author = await userRepository.findById(existingTest.authorId)

				// Отправка письма в зависимости от статуса
				if (author?.email) {
					const fullName = author.name || author.email
					const testTitle = existingTest.title || "тест"

					switch (status) {
						case ModerationStatus.PENDING:
							await mailService.sendModerationPendingMail(author.email, fullName, testTitle)
							break
						case ModerationStatus.APPROVED:
							await mailService.sendModerationApprovedMail(author.email, fullName, testTitle)
							break
						case ModerationStatus.REJECTED:
							await mailService.sendModerationRejectedMail(author.email, fullName, testTitle)
							break
					}
				}

				// await testRepository.incrementTestVersion(testId, existingTest.version, tx)
				await testRepository.cleanupUnusedSnapshots(testId, tx)

				// const updatedTest = await testRepository.findDetailedTestById(testId, tx)
				// if (!updatedTest) {
				//     throw ApiError.InternalError("Не удалось получить обновленный тест")
				// }

				// await testRepository.createSnapshot(updatedTest, tx)
			})

			await deleteTestCache(testId)
			logger.info(`[${LOG_NAMESPACE}] Статус модерации теста успешно изменен`, { testId, status })
		} catch (error) {
			if (error instanceof ApiError) throw error

			logger.error(`[${LOG_NAMESPACE}] Ошибка при изменении статуса модерации теста`, {
				testId,
				status,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при изменении статуса модерации теста")
		}
	}

	// Обновление краткой информации о тесте
	async updateShortInfo(testId: string, updatedShortInfo: ShortTestInfo): Promise<void> {
		logger.info(`[${LOG_NAMESPACE}] Обновление краткой информации о тесте`, { testId })
		try {
			const test = await testRepository.findById(testId)
			if (!test) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}

			await executeTransaction(async (tx) => {
				const updatedTest = await testRepository.updateShortInfo(testId, updatedShortInfo, tx)
				await testRepository.incrementVersion(testId, test.version, tx)
				await testRepository.cleanupUnusedSnapshots(testId, tx)
				await testRepository.createSnapshot(updatedTest, tx)
				return true
			})

			await deleteTestCache(testId)
			logger.info(`[${LOG_NAMESPACE}] Краткая информация о тесте успешно обновлена`, { testId })
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при обновлении краткой информации о тесте`, {
				testId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при обновлении краткой информации о тесте")
		}
	}

	// Поиск тестов
	async searchTests(query: string, page = 1, limit = 10): Promise<TestsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Поиск тестов`, { query, page, limit })
		try {
			const skip = (page - 1) * limit
			const whereCondition = testRepository.getSearchConditions(query)

			const tests = await testRepository.search(query, skip, limit)
			const total = await testRepository.count(whereCondition)
			// Подсчет totalAttempts для каждого теста
			const testsWithAttempts = await Promise.all(
				tests.map(async (test) => {
					const totalAttempts = await attemptRepository.count({ testId: test.id })
					return { ...test, totalAttempts }
				})
			)
			logger.debug(`[${LOG_NAMESPACE}] Результаты поиска тестов получены`, {
				query,
				count: testsWithAttempts.length
			})
			return {
				tests: testsWithAttempts.map((test) => mapTest(test)),
				total
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при поиске тестов`, {
				query,
				page,
				limit,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при поиске тестов")
		}
	}

	// Поиск тестов пользователя
	async searchUserTests(query: string, userId: string, page = 1, limit = 10): Promise<TestsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Поиск тестов пользователя`, { query, userId, page, limit })
		try {
			const skip = (page - 1) * limit
			const whereCondition = {
				authorId: userId,
				OR: testRepository.getSearchConditions(query).OR
			}

			const tests = await testRepository.searchUserTests(query, userId, skip, limit)
			const total = await testRepository.count(whereCondition)

			// Подсчет totalAttempts для каждого теста
			const testsWithAttempts = await Promise.all(
				tests.map(async (test) => {
					const totalAttempts = await attemptRepository.count({ testId: test.id })
					return { ...test, totalAttempts }
				})
			)

			logger.debug(`[${LOG_NAMESPACE}] Результаты поиска тестов пользователя получены`, {
				query,
				userId,
				count: testsWithAttempts.length
			})
			return {
				tests: testsWithAttempts.map((test) => mapTest(test)),
				total
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
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.BadRequest("Ошибка при поиске тестов пользователя")
		}
	}

	//  Удаление теста
	async deleteTest(testId: string): Promise<void> {
		logger.info(`[${LOG_NAMESPACE}] Удаление теста`, { testId })
		try {
			await testRepository.deleteById(testId)

			await deleteTestCache(testId)
			logger.info(`[${LOG_NAMESPACE}] Тест успешно удален`, { testId })
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при удалении теста`, {
				testId,
				error: error instanceof Error ? error.message : String(error)
			})
			throw ApiError.InternalError("Ошибка при удалении теста")
		}
	}
}

export const testService = new TestService()
