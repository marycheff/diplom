import { AttemptAnswer, PreTestUserDataType } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { TestAttempt as Attempt, TestAttemptStatus as AttemptStatus, Prisma, TestAttemptStatus } from "@prisma/client"

class AttemptRepository {
	// CREATE
	async create(data: {
		testId: string
		testSnapshotId: string
		userId?: string
		preTestUserData?: PreTestUserDataType | null
	}) {
		return prisma.$transaction(async (tx) => {
			const attempt = await tx.testAttempt.create({
				data: {
					testId: data.testId,
					testSnapshotId: data.testSnapshotId,
					userId: data.userId,
					preTestUserData: data.preTestUserData === null ? Prisma.JsonNull : data.preTestUserData,
					status: AttemptStatus.IN_PROGRESS,
				},
			})

			return attempt
		})
	}

	// FIND
	async findMany(page: number, limit: number) {
		const skip = (page - 1) * limit
		const attempts = await prisma.testAttempt.findMany({
			skip,
			take: limit,
			include: {
				test: {
					include: {
						author: true,
						questions: {
							include: { answers: true },
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
		return attempts
	}

	async findById(attemptId: string) {
		return prisma.testAttempt.findUnique({
			where: { id: attemptId },
			include: {
				answers: {
					select: {
						id: true,
						attemptId: true,
						questionId: true,
						answerId: true,
						textAnswer: true,
						isCorrect: true,
						answeredAt: true,
						createdAt: true,
					},
				},
				//  sequenceAnswers: true,
				test: {
					include: {
						questions: {
							include: { answers: true },
						},
						author: true,
					},
				},
				user: true,
				snapshot: {
					include: {
						questions: {
							include: { answers: true },
						},
						settings: true,
					},
				},
			},
		})
	}

	async findManyByTestId(testId: string, page: number, limit: number) {
		const skip = (page - 1) * limit
		const attempts = await prisma.testAttempt.findMany({
			skip,
			take: limit,
			where: { testId },
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
				snapshot: {
					include: {
						questions: {
							include: {
								answers: true,
							},
						},
						settings: true,
					},
				},
			},
			orderBy: { startedAt: "desc" },
		})
		return attempts
	}

	async findManyByUserId(userId: string, page: number, limit: number) {
		const skip = (page - 1) * limit
		const attempts = await prisma.testAttempt.findMany({
			skip,
			take: limit,
			where: { userId },
			include: {
				user: true,
				snapshot: true,
			},
			orderBy: { startedAt: "desc" },
		})
		return attempts
	}

	async findWithTest(attemptId: string) {
		return prisma.testAttempt.findUnique({
			where: { id: attemptId },
			include: { test: true },
		})
	}

	async findWithDetails(attemptId: string) {
		return prisma.testAttempt.findUnique({
			where: { id: attemptId },
			include: {
				answers: {
					include: { answer: true },
				},
				//  sequenceAnswers: true,
				test: {
					include: {
						questions: {
							include: { answers: true },
						},
						settings: true,
					},
				},
			},
		})
	}
	async findManyWithFilters(
		skip: number,
		limit: number,
		filters: {
			status?: TestAttemptStatus
		}
	) {
		const where: Prisma.TestAttemptWhereInput = {}

		if (filters.status) {
			where.status = filters.status
		}

		return prisma.testAttempt.findMany({
			skip,
			take: limit,
			where,
			include: {
				test: {
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
	}

	async findForUserById(attemptId: string) {
		return prisma.testAttempt.findUnique({
			where: { id: attemptId },

			include: {
				answers: {
					select: {
						id: true,
						attemptId: true,
						questionId: true,
						textAnswer: true,
						answerId: true,
						isCorrect: true,
						answeredAt: true,

						createdAt: true,
					},
				},
				//  sequenceAnswers: true,
			},
		})
	}

	async findInProgressByUserId(userId: string): Promise<boolean> {
		const inProgressAttempt = await prisma.testAttempt.findFirst({
			where: {
				userId: userId,
				status: AttemptStatus.IN_PROGRESS,
			},
		})

		return inProgressAttempt !== null
	}

	async findCompletedByUserAndTest(userId: string, testId: string): Promise<boolean> {
		const completedAttempt = await prisma.testAttempt.findFirst({
			where: {
				userId: userId,
				testId: testId,
				status: AttemptStatus.COMPLETED,
			},
		})

		return completedAttempt !== null
	}
	async findExpired(batchSize: number): Promise<Attempt[]> {
		// Получение всех попыток в статусе IN_PROGRESS с их снимками и настройками
		const attempts = await prisma.testAttempt.findMany({
			where: {
				status: AttemptStatus.IN_PROGRESS,
				snapshot: {
					settings: {
						timeLimit: { not: null, gt: 0 },
					},
				},
			},
			include: {
				test: {
					include: {
						settings: true,
					},
				},
			},
			take: batchSize,
		})

		const now = new Date()
		// Фильтрация попыток, у которых истек timeLimit
		return attempts.filter((attempt) => {
			const timeLimit = attempt.test?.settings?.timeLimit
			if (!timeLimit || timeLimit === 0) {
				return false // Нет лимита времени или он равен 0
			}

			const startedAt = new Date(attempt.startedAt)
			const timeSpentSeconds = Math.floor((now.getTime() - startedAt.getTime()) / 1000)
			return timeSpentSeconds >= timeLimit // Попытка просрочена, если время превысило лимит
		})
	}

	// UPDATE
	async updateScoreAndStatus(attemptId: string, score: number, status?: AttemptStatus) {
		return prisma.testAttempt.update({
			where: { id: attemptId },
			data: {
				score: Math.round(score * 100) / 100,
				status: status || AttemptStatus.COMPLETED,
				completedAt: new Date(),
			},
		})
	}

	async updateStatuses(attemptIds: string[], status: AttemptStatus) {
		return prisma.testAttempt.updateMany({
			where: { id: { in: attemptIds } },
			data: { status },
		})
	}

	async updateStatus(attemptId: string, status: AttemptStatus) {
		return prisma.testAttempt.updateMany({
			where: { id: attemptId },
			data: { status },
		})
	}

	async updateTimeSpent(attemptId: string, timeSpent: number) {
		return prisma.testAttempt.update({
			where: { id: attemptId },
			data: { timeSpent: timeSpent },
		})
	}

	// COUNT
	async count(where?: Prisma.TestAttemptWhereInput): Promise<number> {
		return prisma.testAttempt.count({
			where,
		})
	}

	async countCompletedByUserAndTest(userId: string, testId: string): Promise<number> {
		const count = await prisma.testAttempt.count({
			where: {
				userId: userId,
				testId: testId,
				status: AttemptStatus.COMPLETED,
			},
		})

		return count
	}

	// SAVE
	async saveAnswers(attemptId: string, answers: AttemptAnswer[]) {
		return prisma.$transaction(async (tx) => {
			for (const answer of answers) {
				const { questionId, answersIds, textAnswer, answeredAt } = answer

				// Получение типа вопроса
				const question = await tx.question.findUnique({
					where: { id: questionId },
					select: { type: true },
				})

				// Удаление предыдущих ответов на этот вопрос
				await tx.userAnswer.deleteMany({
					where: { attemptId, questionId },
				})

				// Для вопросов с текстовым вводом и вопросов с пропусками
				if ((question?.type === "TEXT_INPUT" || question?.type === "FILL_IN_THE_BLANK") && textAnswer !== undefined) {
					// Получение правильного ответа из теста
					const correctAnswer = await tx.answer.findFirst({
						where: {
							questionId,
							isCorrect: true,
						},
					})

					// Определение, правильный ли ответ
					const isCorrect = correctAnswer?.text.toLowerCase() === textAnswer?.toLowerCase()

					// Создание записи ответа пользователя с текстовым ответом и флагом правильности
					await tx.userAnswer.create({
						data: {
							attemptId,
							questionId,
							answerId: correctAnswer?.id || "", // Связь с правильным ответом
							textAnswer, // Сохранение текстового ответа пользователя
							isCorrect,
							answeredAt: answeredAt || new Date(),
						},
					})
				}
				// Для вопросов с выбором ответов
				else if (answersIds.length > 0) {
					await tx.userAnswer.createMany({
						data: answersIds.map((answerId) => ({
							attemptId,
							questionId,
							answerId,
							answeredAt: answeredAt || new Date(),
						})),
					})
				}
			}
		})
	}
	//  async saveSequenceAnswers(
	//      attemptId: string,
	//      questionId: string,
	//      sequenceOrder: { answerId: string; position: number }[]
	//  ) {
	//      return prisma.$transaction(async tx => {
	//          await tx.userSequenceOrder.deleteMany({
	//              where: { attemptId, questionId },
	//          })

	//          await tx.userSequenceOrder.createMany({
	//              data: sequenceOrder.map(order => ({
	//                  attemptId,
	//                  questionId,
	//                  answerId: order.answerId,
	//                  position: order.position,
	//                  answeredAt: new Date(),
	//              })),
	//          })
	//      })
	//  }
	async updateSnapshotId(attemptId: string, snapshotId: string | null) {
		return prisma.testAttempt.update({
			where: { id: attemptId },
			data: { testSnapshotId: snapshotId },
		})
	}
}

export const attemptRepository = new AttemptRepository()
