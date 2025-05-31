import { CreateTest, ShortTestInfo, TestSettingsDTO } from "@/types"
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
	// CREATE
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
			},
		})

		return { createdTest, settings }
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
					originalId: question.id,
					text: question.text,
					order: question.order,
					type: question.type,
					image: question.image,
				},
			})

			await client.answerSnapshot.createMany({
				data: question.answers.map((answer) => ({
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

	// FIND
	async findMany(skip: number, limit: number, where?: Prisma.TestWhereInput) {
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

	async findSettingsByTestId(testId: string, tx?: Prisma.TransactionClient): Promise<TestSettings | null> {
		const client = tx || prisma
		return client.testSettings.findUnique({
			where: { testId },
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

	async findDetailedById(testId: string, tx?: Prisma.TransactionClient) {
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

	async findBasicInfo(testId: string, tx?: Prisma.TransactionClient) {
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

	// UPDATE

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

	async updateVersion(testId: string, version: number, tx?: Prisma.TransactionClient) {
		const client = tx || prisma
		return client.test.update({
			where: { id: testId },
			data: { version },
		})
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

	// UPSERT
	async upsertSettings(testId: string, testSettings: TestSettingsDTO, tx?: Prisma.TransactionClient) {
		const client = tx || prisma
		return client.testSettings.upsert({
			where: { testId },
			create: {
				...testSettings,
				testId,
				inputFields: testSettings.inputFields as Prisma.InputJsonValue,
				timeLimit: testSettings.timeLimit,
			},
			update: {
				...testSettings,
				inputFields: testSettings.inputFields as Prisma.InputJsonValue,
			},
		})
	}

	// DELETE
	async deleteById(testId: string) {
		return prisma.test.delete({
			where: { id: testId },
		})
	}

	async cleanupUnusedSnapshots(testId: string, tx?: Prisma.TransactionClient) {
		const client = tx || prisma

		// Нахождение всех снапшотов, к которым нет привязанных попыток
		const unusedSnapshots = await client.testSnapshot.findMany({
			where: {
				testId: testId,
				attempts: {
					none: {}, // нет связанных attempts
				},
			},
		})

		// Удаление найденных снапшотов
		for (const snapshot of unusedSnapshots) {
			await client.testSnapshot.delete({
				where: {
					id: snapshot.id,
				},
			})
		}

		return unusedSnapshots.length
	}

	async clearModeration(testId: string, tx?: Prisma.TransactionClient) {
		const client = tx || prisma
		return client.test.update({
			where: { id: testId },
			data: { moderatedAt: null, moderatedBy: null },
		})
	}

	// SEARCH
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

	// COUNT
	async count(where?: Prisma.TestWhereInput): Promise<number> {
		return prisma.test.count({ where })
	}

	async countByAuthor(userId: string) {
		return prisma.test.count({
			where: { authorId: userId },
		})
	}

	// OTHER
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

	async incrementVersion(testId: string, currentVersion: number, tx?: Prisma.TransactionClient) {
		const client = tx || prisma
		return client.test.update({
			where: { id: testId },
			data: { version: currentVersion + 1 },
		})
	}
	async snapshotExists(snapshotId: string): Promise<boolean> {
		const snapshot = await prisma.testSnapshot.findUnique({
			where: { id: snapshotId },
			select: { id: true },
		})
		return !!snapshot
	}
}

export const testRepository = new TestRepository()
