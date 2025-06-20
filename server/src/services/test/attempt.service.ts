import { ApiError } from "@/exceptions"
import {
	mapToAttemptDTO,
	mapToAttemptUserDTO,
	mapToAttemptWithResultsDTO,
	mapToAttemptWithSnapshotDTO,
} from "@/mappers"
import { attemptRepository, questionRepository, testRepository } from "@/repositories"
import {
	AttemptAnswer,
	AttemptDTO,
	AttemptResultDTO,
	AttemptsListDTO,
	AttemptsWithSnapshotListDTO,
	AttemptUserDTO,
	PreTestUserData,
	PreTestUserDataLabels,
	PreTestUserDataType,
	UserDTO,
} from "@/types"
import { logger } from "@/utils/logger"
import { calculateTestScore } from "@/utils/math"
import { redisClient } from "@/utils/redis/redis-client"
import { deleteAttemptCache, deleteTestCache } from "@/utils/redis/redis.utils"
import { Role, TestAttemptStatus } from "@prisma/client"

const LOG_NAMESPACE = "AttemptService"

class AttemptService {
	// Начать попытку прохождения теста
	async startAttempt(
		testId: string,
		preTestUserData?: PreTestUserDataType,
		userId?: string
	): Promise<{ attemptId: string }> {
		logger.debug(`[${LOG_NAMESPACE}] Начало попытки теста`, { testId, userId })
		try {
			const test = await testRepository.findById(testId)

			if (!test) {
				logger.warn(`[${LOG_NAMESPACE}] Тест не найден`, { testId })
				throw ApiError.NotFound("Тест не найден")
			}
			if (!test.questions || test.questions.length === 0) {
				logger.warn(`[${LOG_NAMESPACE}] Невозможно начать прохождение теста без вопросов`, { testId })
				throw ApiError.BadRequest("Невозможно начать прохождение теста без вопросов")
			}

			const settings = test.settings
			if (settings?.requireRegistration && !userId) {
				logger.warn(`[${LOG_NAMESPACE}] Для прохождения этого теста необходимо зарегистрироваться`, { testId })
				throw ApiError.BadRequest("Для прохождения этого теста необходимо зарегистрироваться")
			}

			if (settings?.inputFields && Array.isArray(settings.inputFields) && settings.inputFields.length > 0) {
				const requiredFields = settings.inputFields

				// Проверка, что все обязательные поля присутствуют
				if (!preTestUserData || requiredFields.some((field) => !preTestUserData[field as keyof PreTestUserDataType])) {
					const missingLabels = requiredFields.filter((field) => !preTestUserData?.[field as keyof PreTestUserDataType])
					const missingLabelsRu = missingLabels.map((f) => PreTestUserDataLabels[f as PreTestUserData])
					logger.warn(`[${LOG_NAMESPACE}] Не все обязательные поля заполнены`, {
						testId,
						missingLabels,
						missingLabelsRu,
					})
					throw ApiError.BadRequest(
						`Не все обязательные поля заполнены: ${missingLabelsRu.join(", ")} (${missingLabels.join(", ")})`
					)
				}

				// Проверка на лишние поля
				const extraFields = Object.keys(preTestUserData).filter((field) => !requiredFields.includes(field))
				if (extraFields.length > 0) {
					logger.warn(`[${LOG_NAMESPACE}] Обнаружены недопустимые поля`, {
						testId,
						extraFields,
					})
					throw ApiError.BadRequest(`Обнаружены недопустимые поля: ${extraFields.join(", ")}`)
				}
			}

			const latestSnapshot = await testRepository.findLatestSnapshot(testId)
			if (!latestSnapshot) {
				logger.warn(`[${LOG_NAMESPACE}] Не найден актуальный снапшот теста`, { testId })
				throw ApiError.NotFound("Не найден актуальный снапшот теста")
			}
			if (userId) {
				const attemptInProgress = await attemptRepository.findInProgressByUserId(userId)
				if (attemptInProgress) {
					logger.warn(`[${LOG_NAMESPACE}] У пользователя уже есть незавершенная попытка`, { userId })
					throw ApiError.BadRequest(
						"У вас уже есть незавершенная попытка прохождения теста. Завершите текущую попытку прежде чем начинать новую."
					)
				}

				// Проверка настройки allowRetake и наличие завершенных попыток
				if (!settings?.allowRetake) {
					const hasCompletedAttempts = await attemptRepository.findCompletedByUserAndTest(userId, testId)
					if (hasCompletedAttempts) {
						logger.warn(`[${LOG_NAMESPACE}] Повторное прохождение теста запрещено`, { testId, userId })
						throw ApiError.BadRequest("Повторное прохождение этого теста запрещено")
					}
				} else if (settings.retakeLimit && settings.retakeLimit > 0) {
					// Проверка количества завершенных попыток
					const completedAttemptsCount = await attemptRepository.countCompletedByUserAndTest(userId, testId)
					if (completedAttemptsCount >= settings.retakeLimit) {
						logger.warn(`[${LOG_NAMESPACE}] Превышен лимит попыток прохождения теста`, {
							testId,
							userId,
							completedAttempts: completedAttemptsCount,
							limit: settings.retakeLimit,
						})
						throw ApiError.BadRequest(`Превышен лимит попыток прохождения теста (${settings.retakeLimit})`)
					}
				}
			}
			const newAttempt = await attemptRepository.create({
				testId,
				testSnapshotId: latestSnapshot.id,
				userId,
				preTestUserData: preTestUserData,
			})

			// Чтобы сбрасывалось кол-во попыток
			await deleteTestCache(testId)
			logger.debug(`[${LOG_NAMESPACE}] Попытка теста успешно начата`, { attemptId: newAttempt.id })

			return { attemptId: newAttempt.id }
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при начале теста`, {
				testId,
				userId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при начале теста")
		}
	}

	// Сохранить ответы
	async saveAnswers(attemptId: string, answers: AttemptAnswer[]): Promise<void> {
		logger.debug(`[${LOG_NAMESPACE}] Сохранение всех ответов`, { attemptId })
		try {
			const attempt = await attemptRepository.findWithTest(attemptId)
			if (!attempt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не существует`, { attemptId })
				throw ApiError.BadRequest("Попытка не существует")
			}
			if (attempt.status === TestAttemptStatus.COMPLETED || attempt.completedAt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка уже завершена`, { attemptId })
				throw ApiError.BadRequest("Попытка уже завершена")
			}

			for (const answer of answers) {
				const { questionId, answersIds, textAnswer } = answer

				const question = await questionRepository.findWithAnswers(questionId)
				if (!question || question.testId !== attempt.testId) {
					logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, {
						questionId,
						testId: attempt.testId,
					})
					throw ApiError.BadRequest(`Вопрос ${questionId} не принадлежит тесту`)
				}

				// Для TEXT_INPUT не требуются answersIds, но должен быть textAnswer
				if (question.type === "TEXT_INPUT") {
					if (!textAnswer && textAnswer !== "") {
						logger.warn(`[${LOG_NAMESPACE}] Для вопроса с текстовым вводом должен быть указан текстовый ответ`, {
							questionId,
						})
						throw ApiError.BadRequest(`Для вопроса ${questionId} с текстовым вводом должен быть указан текстовый ответ`)
					}
					continue // Пропуск дальнейших проверок для TEXT_INPUT
				}

				if (question.type === "SINGLE_CHOICE" && answersIds.length > 1) {
					logger.warn(`[${LOG_NAMESPACE}] Для вопроса с одиночным выбором можно указать только один ответ`, {
						questionId,
					})
					throw ApiError.BadRequest(`Для вопроса ${questionId} с одиночным выбором можно указать только один ответ`)
				}

				if (answersIds.length > 0) {
					const validAnswerIds = question.answers.map((a) => a.id)
					const allAnswersValid = answersIds.every((id) => validAnswerIds.includes(id))
					if (!allAnswersValid) {
						if (question.type == "MULTIPLE_CHOICE") {
							logger.warn(`[${LOG_NAMESPACE}] Один или несколько ответов не принадлежат вопросу`, {
								questionId,
							})
							throw ApiError.BadRequest(`Один или несколько ответов не принадлежат вопросу ${questionId}`)
						}
						logger.warn(`[${LOG_NAMESPACE}] Ответ не принадлежит вопросу`, { questionId })
						throw ApiError.BadRequest(`Ответ не принадлежит вопросу ${questionId}`)
					}
				}
			}

			await attemptRepository.saveAnswers(attemptId, answers)
			await deleteAttemptCache(attemptId)

			logger.debug(`[${LOG_NAMESPACE}] Все ответы успешно сохранены`, { attemptId })
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении ответов`, {
				attemptId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при сохранении ответов")
		}
	}

	// Завершить попытку
	async completeAttempt(attemptId: string): Promise<{ score: number }> {
		logger.debug(`[${LOG_NAMESPACE}] Завершение попытки теста`, { attemptId })
		try {
			const attempt = await attemptRepository.findWithDetails(attemptId)

			if (!attempt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
				throw ApiError.BadRequest("Попытка не найдена")
			}
			if (attempt.completedAt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка уже завершена`, { attemptId })
				throw ApiError.BadRequest("Попытка уже завершена")
			}

			// Расчет и обновление timeSpent
			const now = new Date()
			const startedAt = new Date(attempt.startedAt)
			const timeSpent = Math.floor((now.getTime() - startedAt.getTime()) / 1000)

			if (timeSpent < 0) {
				logger.warn(`[${LOG_NAMESPACE}] Некорректное время начала попытки`, { attemptId, startedAt })
				throw ApiError.InternalError("Некорректное время начала попытки")
			}

			// Проверка на превышение лимита времени
			if (attempt.test.settings?.timeLimit && timeSpent > attempt.test.settings?.timeLimit) {
				logger.info(`[${LOG_NAMESPACE}] Попытка просрочена`, {
					attemptId,
					timeSpent,
					timeLimit: attempt.test.settings.timeLimit,
				})
				await attemptRepository.updateTimeSpent(attemptId, timeSpent)
				await attemptRepository.updateScoreAndStatus(attemptId, 0, TestAttemptStatus.EXPIRED)
				await deleteAttemptCache(attemptId)

				logger.debug(`[${LOG_NAMESPACE}] Просроченная попытка завершена`, { attemptId })
				return { score: 0 }
			}

			await attemptRepository.updateTimeSpent(attemptId, timeSpent)
			logger.debug(`[${LOG_NAMESPACE}] Время попытки обновлено`, { attemptId, timeSpent })

			const questionsWithAnswers = await questionRepository.findWithCorrectAnswers(attempt.testId)

			const score = calculateTestScore(questionsWithAnswers, attempt.answers)
			await attemptRepository.updateScoreAndStatus(attemptId, score, TestAttemptStatus.COMPLETED)

			// Очистка неиспользуемых снимков перед обновлением snapshotId
			await testRepository.cleanupUnusedSnapshots(attempt.testId)

			// Проверка последнего снимка
			const latestSnapshot = await testRepository.findLatestSnapshot(attempt.testId)
			if (latestSnapshot && latestSnapshot.id !== attempt.testSnapshotId) {
				// Проверка, существует ли snapshot в базе данных
				const snapshotExists = await testRepository.snapshotExists(latestSnapshot.id)
				if (snapshotExists) {
					await attemptRepository.updateSnapshotId(attemptId, latestSnapshot.id)
				} else {
					logger.warn(`[${LOG_NAMESPACE}] Снимок не существует`, { snapshotId: latestSnapshot.id })
					// Установка testSnapshotId в null, если снимок недоступен
					await attemptRepository.updateSnapshotId(attemptId, null)
				}
			}

			await deleteAttemptCache(attemptId)

			logger.debug(`[${LOG_NAMESPACE}] Попытка теста успешно завершена`, { attemptId, score })

			return { score }
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при завершении теста`, {
				attemptId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при завершении теста")
		}
	}

	// Получить все попытки
	async getAllAttempts(page = 1, limit = 10): Promise<AttemptsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение всех попыток`, { page, limit })
		try {
			const attempts = await attemptRepository.findMany(page, limit)
			const total = await attemptRepository.count()

			logger.debug(`[${LOG_NAMESPACE}] Все попытки успешно получены`, { count: attempts.length })
			return {
				attempts: attempts.map((attempt) => mapToAttemptDTO(attempt)),
				total,
			}
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении списка попыток`, {
				page,
				limit,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении списка попыток")
		}
	}

	//Получить конкретную попытку
	async getAttempt(attemptId: string): Promise<AttemptDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение попытки по ID`, { attemptId })
		try {
			const cacheKey = `attempt:${attemptId}`
			const cachedData = await redisClient.get(cacheKey)
			if (cachedData) {
				logger.debug(`[${LOG_NAMESPACE}] Попытка получена из кэша`, { attemptId })
				return JSON.parse(cachedData)
			}
			const attempt = await attemptRepository.findById(attemptId)
			if (!attempt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
				throw ApiError.BadRequest("Попытка не найдена")
			}
			const result = mapToAttemptDTO(attempt)
			await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
			logger.debug(`[${LOG_NAMESPACE}] Попытка успешно получена`, { attemptId })
			return result
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки`, {
				attemptId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении попытки")
		}
	}

	//Получить результаты конкретной попытки
	async getWithResults(attemptId: string, user?: UserDTO): Promise<AttemptResultDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение попытки с результатами`, { attemptId })
		try {
			const attempt = await attemptRepository.findById(attemptId)
			if (!attempt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
				throw ApiError.BadRequest("Попытка не найдена")
			}
			if (attempt.status === TestAttemptStatus.IN_PROGRESS) {
				if (user?.role !== Role.ADMIN) {
					logger.warn(`[${LOG_NAMESPACE}] Попытка не завершена`, { attemptId })
					throw ApiError.BadRequest("Попытка не завершена")
				}
			}

			const result = mapToAttemptWithResultsDTO(attempt)
			logger.debug(`[${LOG_NAMESPACE}] Попытка с результатами успешно получена`, { attemptId })
			return result
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки с результатами`, {
				attemptId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении попытки")
		}
	}

	//Получить конкретную попытку для пользователя
	async getAttemptForUser(attemptId: string, userId?: string): Promise<AttemptUserDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение попытки для пользователя по ID`, { attemptId })

		try {
			const cacheKey = `user-attempt:${attemptId}`
			const cachedData = await redisClient.get(cacheKey)
			if (cachedData) {
				const parsedData = JSON.parse(cachedData)
				if (parsedData.userId && parsedData.userId !== userId) {
					logger.warn(`[${LOG_NAMESPACE}] Попытка не принадлежит пользователю`, { attemptId, userId })
					throw ApiError.BadRequest("Попытка не принадлежит пользователю")
				}
				logger.debug(`[${LOG_NAMESPACE}] Попытка для пользователя получена из кэша`, { attemptId })
				return parsedData
			}
			const attempt = await attemptRepository.findForUserById(attemptId)
			if (!attempt) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не найдена`, { attemptId })
				throw ApiError.BadRequest("Попытка не найдена")
			}
			const result = mapToAttemptUserDTO(attempt)

			if (attempt.userId && attempt.userId !== userId) {
				logger.warn(`[${LOG_NAMESPACE}] Попытка не принадлежит пользователю`, { attemptId, userId })
				throw ApiError.BadRequest("Попытка не принадлежит пользователю")
			}

			await redisClient.setEx(cacheKey, 3600, JSON.stringify(result))
			logger.debug(`[${LOG_NAMESPACE}] Попытка для пользователя успешно получена`, { attemptId })
			return result
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попытки для пользователя`, {
				attemptId,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении попытки")
		}
	}

	// Сохранить ответы для вопроса типа SEQUENCE (последовательность)
	//  async saveSequenceAnswers(
	//      attemptId: string,
	//      questionId: string,
	//      sequenceOrder: { answerId: string; position: number }[]
	//  ): Promise<void> {
	//      logger.debug(`[${LOG_NAMESPACE}] Сохранение ответов на вопрос-последовательность`, { attemptId, questionId })
	//      try {
	//          const attempt = await attemptRepository.findWithTest(attemptId)
	//          if (!attempt) {
	//              logger.warn(`[${LOG_NAMESPACE}] Попытка не существует`, { attemptId })
	//              throw ApiError.BadRequest("Попытка не существует")
	//          }
	//          if (attempt.status === TestAttemptStatus.COMPLETED || attempt.completedAt) {
	//              logger.warn(`[${LOG_NAMESPACE}] Попытка уже завершена`, { attemptId })
	//              throw ApiError.BadRequest("Попытка уже завершена")
	//          }

	//          const question = await questionRepository.findWithAnswers(questionId)
	//          if (!question || question.testId !== attempt.testId) {
	//              logger.warn(`[${LOG_NAMESPACE}] Вопрос не принадлежит тесту`, {
	//                  questionId,
	//                  testId: attempt.testId,
	//              })
	//              throw ApiError.BadRequest(`Вопрос ${questionId} не принадлежит тесту`)
	//          }

	//          if (question.type !== "SEQUENCE") {
	//              logger.warn(`[${LOG_NAMESPACE}] Вопрос не является вопросом-последовательностью`, { questionId })
	//              throw ApiError.BadRequest(`Вопрос ${questionId} не является вопросом-последовательностью`)
	//          }

	//          // Проверка валидности ответов
	//          const validAnswerIds = question.answers.map(a => a.id)
	//          const allAnswersValid = sequenceOrder.every(order => validAnswerIds.includes(order.answerId))
	//          if (!allAnswersValid) {
	//              logger.warn(`[${LOG_NAMESPACE}] Один или несколько ответов не принадлежат вопросу`, { questionId })
	//              throw ApiError.BadRequest(`Один или несколько ответов не принадлежат вопросу ${questionId}`)
	//          }

	//          // Проверка, что все позиции уникальны и последовательны
	//          const positions = sequenceOrder.map(order => order.position).sort((a, b) => a - b)
	//          const isSequential = positions.every((pos, index) => pos === index + 1)
	//          if (!isSequential) {
	//              logger.warn(`[${LOG_NAMESPACE}] Позиции ответов должны быть последовательными числами от 1 до N`, {
	//                  questionId,
	//              })
	//              throw ApiError.BadRequest(
	//                  `Позиции ответов для вопроса ${questionId} должны быть последовательными числами от 1 до N`
	//              )
	//          }

	//          await attemptRepository.saveSequenceAnswers(attemptId, questionId, sequenceOrder)
	//          await deleteAttemptCache(attemptId)

	//          logger.debug(`[${LOG_NAMESPACE}] Ответы на вопрос-последовательность успешно сохранены`, {
	//              attemptId,
	//              questionId,
	//          })
	//      } catch (error) {
	//          if (error instanceof ApiError) {
	//              throw error
	//          }
	//          logger.error(`[${LOG_NAMESPACE}] Ошибка при сохранении ответов на вопрос-последовательность`, {
	//              attemptId,
	//              questionId,
	//              error: error instanceof Error ? error.message : String(error),
	//          })
	//          throw ApiError.InternalError("Ошибка при сохранении ответов на вопрос-последовательность")
	//      }
	//  }

	//Получить попытки пользователя
	async getUserAttempts(userId: string, page = 1, limit = 10): Promise<AttemptsWithSnapshotListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение попыток пользователя`, { userId, page, limit })
		try {
			const attempts = await attemptRepository.findManyByUserId(userId, page, limit)
			const total = await attemptRepository.count({ userId })

			logger.debug(`[${LOG_NAMESPACE}] Попытки пользователя успешно получены`, { userId, count: attempts.length })
			return {
				attempts: attempts.map((attempt) => mapToAttemptWithSnapshotDTO(attempt)),
				total,
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попыток пользователя`, {
				userId,
				page,
				limit,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении попыток пользователя")
		}
	}

	// Получение попыток конкретного теста
	async getTestAttempts(testId: string, page = 1, limit = 10): Promise<AttemptsListDTO> {
		try {
			const attempts = await attemptRepository.findManyByTestId(testId, page, limit)
			const total = await attemptRepository.count({ testId })
			logger.debug(`[${LOG_NAMESPACE}] Попытки теста успешно получены`, { testId, count: attempts.length })
			return {
				attempts: attempts.map((attempt) => mapToAttemptDTO(attempt)),
				total,
			}
		} catch (error) {
			if (error instanceof ApiError) {
				throw error
			}
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении попыток теста`, {
				testId,
				page,
				limit,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении попытки")
		}
	}

	async getFilteredAttempts(
		page = 1,
		limit = 10,
		filters: {
			status?: TestAttemptStatus
		}
	): Promise<AttemptsListDTO> {
		logger.debug(`[AttemptService] Получение отфильтрованных попыток`, { page, limit, filters })

		const attempts = await attemptRepository.findManyWithFilters(page, limit, filters)
		const total = await attemptRepository.count({
			status: filters.status,
		})

		return {
			attempts: attempts.map((attempt) => mapToAttemptDTO(attempt)),
			total,
		}
	}

	async getAllAttempts1(page = 1, limit = 10): Promise<AttemptsListDTO> {
		logger.debug(`[${LOG_NAMESPACE}] Получение всех попыток`, { page, limit })
		try {
			const attempts = await attemptRepository.findMany(page, limit)
			const total = await attemptRepository.count()

			logger.debug(`[${LOG_NAMESPACE}] Все попытки успешно получены`, { count: attempts.length })
			return {
				attempts: attempts.map((attempt) => mapToAttemptDTO(attempt)),
				total,
			}
		} catch (error) {
			logger.error(`[${LOG_NAMESPACE}] Ошибка при получении списка попыток`, {
				page,
				limit,
				error: error instanceof Error ? error.message : String(error),
			})
			throw ApiError.InternalError("Ошибка при получении списка попыток")
		}
	}
}

export const attemptService = new AttemptService()
