import { AttemptAnswer, PreTestUserDataType } from "@/types"
import { prisma } from "@/utils/prisma-client"
import { Prisma, TestAttempt, TestAttemptStatus } from "@prisma/client"

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
					status: TestAttemptStatus.IN_PROGRESS,
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
				//  sequenceAnswers: true, // Включаем данные о последовательности ответов
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
				//  sequenceAnswers: true, // Включаем данные о последовательности ответов
				test: {
					include: {
						questions: {
							include: { answers: true },
						},
					},
				},
			},
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
				//  sequenceAnswers: true, // Включаем данные о последовательности ответов
			},
		})
	}

	async findInProgressByUserId(userId: string): Promise<boolean> {
		const inProgressAttempt = await prisma.testAttempt.findFirst({
			where: {
				userId: userId,
				status: TestAttemptStatus.IN_PROGRESS,
			},
		})

		return inProgressAttempt !== null
	}

	async findCompletedByUserAndTest(userId: string, testId: string): Promise<boolean> {
		const completedAttempt = await prisma.testAttempt.findFirst({
			where: {
				userId: userId,
				testId: testId,
				status: TestAttemptStatus.COMPLETED,
			},
		})

		return completedAttempt !== null
	}
	async findExpired(batchSize: number): Promise<TestAttempt[]> {
		// Получаем все попытки в статусе IN_PROGRESS с их снимками и настройками
		const attempts = await prisma.testAttempt.findMany({
			where: {
				status: TestAttemptStatus.IN_PROGRESS,
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
		// Фильтруем попытки, у которых истек timeLimit
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
	async updateScore(attemptId: string, score: number) {
		return prisma.testAttempt.update({
			where: { id: attemptId },
			data: {
				score: Math.round(score * 100) / 100,
				status: TestAttemptStatus.COMPLETED,
				completedAt: new Date(),
			},
		})
	}

	async updateStatuses(attemptIds: string[], status: TestAttemptStatus) {
		return prisma.testAttempt.updateMany({
			where: { id: { in: attemptIds } },
			data: { status },
		})
	}

	async updateTimeSpent(attemptId: string, timeSpent: number) {
		return prisma.testAttempt.update({
			where: { id: attemptId },
			data: { timeSpent: timeSpent },
		})
	}
	async updateStatusesWithTimeSpent(attempts: { id: string; timeSpent: number }[]): Promise<void> {
		const updates = attempts.map((attempt) =>
			prisma.testAttempt.update({
				where: { id: attempt.id },
				data: {
					status: TestAttemptStatus.EXPIRED,
					timeSpent: attempt.timeSpent,
				},
			})
		)
		await Promise.all(updates)
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
				status: TestAttemptStatus.COMPLETED,
			},
		})

		return count
	}

	// SAVE
	async saveAnswers(attemptId: string, answers: AttemptAnswer[]) {
		return prisma.$transaction(async (tx) => {
			for (const answer of answers) {
				const { questionId, answersIds, textAnswer, answeredAt } = answer

				// Получаем тип вопроса
				const question = await tx.question.findUnique({
					where: { id: questionId },
					select: { type: true },
				})

				// Удаляем предыдущие ответы на этот вопрос
				await tx.userAnswer.deleteMany({
					where: { attemptId, questionId },
				})

				// Для вопросов с текстовым вводом и вопросов с пропусками
				if ((question?.type === "TEXT_INPUT" || question?.type === "FILL_IN_THE_BLANK") && textAnswer !== undefined) {
					// Получаем правильный ответ из теста
					const correctAnswer = await tx.answer.findFirst({
						where: {
							questionId,
							isCorrect: true,
						},
					})

					// Определяем, правильный ли ответ
					const isCorrect = correctAnswer?.text.toLowerCase() === textAnswer?.toLowerCase()

					// Создаем запись ответа пользователя с текстовым ответом и флагом правильности
					await tx.userAnswer.create({
						data: {
							attemptId,
							questionId,
							answerId: correctAnswer?.id || "", // Связываем с правильным ответом
							textAnswer, // Сохраняем текстовый ответ пользователя
							isCorrect, // Добавить это поле в модель UserAnswer
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
