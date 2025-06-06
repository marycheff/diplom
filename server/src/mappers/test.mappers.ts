import { ApiError } from "@/exceptions"
import { mapUserToDto } from "@/mappers"
import {
	AnswerDTO,
	AnswerUserDTO,
	AttemptQuestionDTO,
	AttemptWithSnapshotDTO,
	PreTestUserDataType,
	QuestionDTO,
	TestAttemptDTO,
	TestAttemptResultDTO,
	TestAttemptUserDTO,
	TestDTO,
	TestSettingsDTO,
	TestSnapshotDTO,
	UserQuestionDTO,
	UserTestDTO,
} from "@/types"

import {
	Answer,
	AnswerSnapshot,
	Question,
	QuestionSnapshot,
	QuestionType,
	Test,
	TestAttempt,
	TestSettingsSnapshot,
	TestSnapshot,
	User,
	UserAnswer,
} from "@prisma/client"

export const mapAnswer = (answer: Answer): AnswerDTO => {
	return {
		id: answer.id,
		text: answer.text,
		isCorrect: answer.isCorrect,
	}
}
export const mapQuestion = (question: Question & { answers?: Answer[] }): QuestionDTO => {
	return {
		id: question.id,
		text: question.text,
		order: question.order,
		type: question.type,
		image: question.image || null,
		answers: question.answers?.map((answer) => mapAnswer(answer)) || [],
	}
}

export const mapTest = (
	test: Test & {
		settings?: TestSettingsDTO | null
		questions?: (Question & { answers: Answer[] })[]
		author: {
			id: string
			email: string
			name?: string | null
			surname?: string | null
			patronymic?: string | null
		}
		totalAttempts?: number
	}
): TestDTO => {
	return {
		id: test.id,
		author: {
			id: test.author.id,
			email: test.author.email,
			name: test.author.name,
			surname: test.author.surname,
			patronymic: test.author.patronymic,
		},
		title: test.title,
		description: test.description,
		totalAttempts: test.totalAttempts || 0,
		visibilityStatus: test.visibilityStatus,
		moderationStatus: test.moderationStatus,
		image: test.image,
		moderatedAt: test.moderatedAt,
		moderatedBy: test.moderatedBy,
		settings: test.settings
			? {
					requireRegistration: test.settings.requireRegistration,
					showDetailedResults: test.settings.showDetailedResults,
					shuffleAnswers: test.settings.shuffleAnswers,
					shuffleQuestions: test.settings.shuffleQuestions,
					allowRetake: test.settings.allowRetake,
					retakeLimit: test.settings.retakeLimit,
					timeLimit: test.settings.timeLimit,
					inputFields: test.settings.inputFields,
			  }
			: ({} as TestSettingsDTO),
		questions: test.questions?.map((question) => mapQuestion(question)) || [],
	}
}
export const mapToAttemptQuestionDTO = (
	question: Question & { answers: Answer[] },
	userAnswers: UserAnswer[],
	allAnswers: Answer[]
	//  sequenceAnswers?: { attemptId: string; questionId: string; answerId: string; position: number }[]
): AttemptQuestionDTO => {
	const userAnswersForQuestion = userAnswers.filter((a) => a.questionId === question.id)
	//  const sequenceAnswersForQuestion = sequenceAnswers?.filter(a => a.questionId === question.id) || []

	if (
		userAnswersForQuestion.length === 0
		// && sequenceAnswersForQuestion.length === 0
	) {
		return {
			question: {
				id: question.id,
				text: question.text,
				order: question.order,
				type: question.type,
			},
			answers: question.answers.map(mapAnswer),
			userAnswers: null,
		}
	}

	// Метаданные из первого ответа (они одинаковые для всех ответов на вопрос)
	const firstAnswer = userAnswersForQuestion[0]

	// Для вопросов типа SEQUENCE используем данные из sequenceAnswers
	//  if (question.type === "SEQUENCE" && sequenceAnswersForQuestion.length > 0) {
	//      // Сортируем ответы по позиции
	//      const sortedSequenceAnswers = [...sequenceAnswersForQuestion].sort((a, b) => a.position - b.position)

	//      return {
	//          question: {
	//              id: question.id,
	//              text: question.text,
	//              order: question.order,
	//              type: question.type,
	//          },
	//          answers: question.answers.map(mapAnswer),
	//          userAnswers: {
	//              answers: sortedSequenceAnswers.map(seqAnswer => {
	//                  const answer = allAnswers.find(a => a.id === seqAnswer.answerId)
	//                  if (!answer) {
	//                      throw new Error(`Answer with id ${seqAnswer.answerId} not found`)
	//                  }

	//                  return {
	//                      userAnswerId: seqAnswer.answerId, // Используем answerId как userAnswerId
	//                      answer: mapAnswer(answer),
	//                      position: seqAnswer.position, // Добавляем позицию для вопросов типа SEQUENCE
	//                  }
	//              }),
	//              textAnswer: null,
	//              isCorrect: null, // Правильность определяется при расчете оценки
	//              answeredAt: new Date(), //sequenceAnswersForQuestion[0]?.answeredAt || new Date(),
	//              createdAt: new Date(),
	//          },
	//      }
	//  }

	return {
		question: {
			id: question.id,
			text: question.text,
			order: question.order,
			type: question.type,
		},
		answers: question.answers.map(mapAnswer),
		userAnswers: {
			answers: userAnswersForQuestion.map((userAnswer) => {
				const answer = allAnswers.find((a) => a.id === userAnswer.answerId)
				if (!answer) {
					throw ApiError.NotFound(`Ответ с id ${userAnswer.answerId} не найден`)
				}

				return {
					userAnswerId: userAnswer.id,
					answer: mapAnswer(answer),
				}
			}),
			textAnswer: firstAnswer?.textAnswer || null,
			isCorrect: firstAnswer?.isCorrect || null,
			answeredAt: firstAnswer?.answeredAt || new Date(),
			createdAt: firstAnswer?.createdAt || new Date(),
		},
	}
}

export const mapToTestAttemptDTO = (
	attempt: TestAttempt & {
		test: Test & {
			questions: (Question & { answers: Answer[] })[]
			author: {
				id: string
				email: string
				name?: string | null
				surname?: string | null
				patronymic?: string | null
			}
		}
		user: User | null
		answers: UserAnswer[]
		//   sequenceAnswers?: {
		//       attemptId: string
		//       questionId: string
		//       answerId: string
		//       position: number
		//       answeredAt?: Date | null
		//   }[]
	}
): TestAttemptDTO => {
	const allAnswers = attempt.test.questions.flatMap((q) => q.answers)

	return {
		id: attempt.id,
		status: attempt.status,
		startedAt: attempt.startedAt,
		completedAt: attempt.completedAt ?? null,
		score: attempt.score ?? null,
		snapshotId: attempt.testSnapshotId ?? "",
		user: attempt.user ? mapUserToDto(attempt.user) : null,
		preTestUserData: attempt.preTestUserData as PreTestUserDataType,
		test: mapTest(attempt.test),
		timeSpent: attempt.timeSpent,
		questions: attempt.test.questions.map((q) =>
			mapToAttemptQuestionDTO(
				q,
				attempt.answers,
				allAnswers
				// , attempt.sequenceAnswers
			)
		),
	}
}

export const mapToAttemptWithSnapshotDTO = (
	attempt: TestAttempt & {
		user: User | null
		snapshot: TestSnapshot | null
	}
): AttemptWithSnapshotDTO => {
	return {
		id: attempt.id,
		status: attempt.status,
		startedAt: attempt.startedAt,
		completedAt: attempt.completedAt ?? null,
		score: attempt.score ?? null,
		user: attempt.user ? mapUserToDto(attempt.user) : null,
		preTestUserData: attempt.preTestUserData as PreTestUserDataType,
		timeSpent: attempt.timeSpent,

		snapshot: attempt.snapshot
			? {
					id: attempt.snapshot.id,
					testId: attempt.snapshot.testId,
					title: attempt.snapshot.title,
					description: attempt.snapshot.description,
					image: attempt.snapshot.image,
					status: attempt.snapshot.moderationStatus,
					createdAt: attempt.snapshot.createdAt,
			  }
			: null,
	}
}

export const mapToAttemptWithResultsDTO = (
	attempt: TestAttempt & {
		test: Test & {
			questions: (Question & { answers: Answer[] })[]
			author: {
				id: string
				email: string
				name?: string | null
				surname?: string | null
				patronymic?: string | null
			}
		}
		user: User | null
		answers: UserAnswer[]
		// sequenceAnswers?: {
		// 	attemptId: string
		// 	questionId: string
		// 	answerId: string
		// 	position: number
		// 	timeSpent?: number | null
		// 	answeredAt?: Date | null
		// }[]
	}
): TestAttemptResultDTO => {
	const allAnswers = attempt.test.questions.flatMap((q) => q.answers)

	return {
		id: attempt.id,
		status: attempt.status,
		startedAt: attempt.startedAt,
		completedAt: attempt.completedAt ?? null,
		score: attempt.score ?? null,
		timeSpent: attempt.timeSpent,

		// snapshotId: attempt.testSnapshotId ?? "",
		// user: attempt.user ? mapUserToDto(attempt.user) : null,
		// preTestUserData: attempt.preTestUserData as PreTestUserDataType,
		// test: mapTest(attempt.test),
		questions: attempt.test.questions.map((q) =>
			mapToAttemptQuestionDTO(
				q,
				attempt.answers,
				allAnswers
				// , attempt.sequenceAnswers
			)
		),
	}
}
export const mapToTestAttemptUserDTO = (
	attempt: TestAttempt & {
		answers: UserAnswer[]
	}
): TestAttemptUserDTO => {
	return {
		id: attempt.id,
		testId: attempt.testId,
		testSnapshotId: attempt.testSnapshotId,
		status: attempt.status,
		userId: attempt.userId,
		startedAt: attempt.startedAt,
		completedAt: attempt.completedAt ?? null,
		score: attempt.score ?? null,
		timeSpent: attempt.timeSpent,
		answers: attempt.answers.map((answer) => ({
			id: answer.id,
			attemptId: answer.attemptId,
			questionId: answer.questionId,
			answerId: answer.answerId,
			textAnswer: answer.textAnswer,
			isCorrect: answer.isCorrect,
			answeredAt: answer.answeredAt,
			createdAt: answer.createdAt,
		})),
	}
}

export const mapToTestSnapshotDTO = (
	snapshot: TestSnapshot & {
		questions: (QuestionSnapshot & { answers: AnswerSnapshot[] })[]
		settings?: TestSettingsSnapshot | null
	}
): TestSnapshotDTO => {
	return {
		id: snapshot.id,
		testId: snapshot.testId,
		title: snapshot.title,
		description: snapshot.description,
		image: snapshot.image,
		status: snapshot.moderationStatus,
		createdAt: snapshot.createdAt,
		settings: snapshot.settings
			? {
					id: snapshot.settings.id,
					//   snapshotId: snapshot.settings.snapshotId,
					requireRegistration: snapshot.settings.requireRegistration,
					inputFields: snapshot.settings.inputFields,
					showDetailedResults: snapshot.settings.showDetailedResults,
					shuffleQuestions: snapshot.settings.shuffleQuestions,
					shuffleAnswers: snapshot.settings.shuffleAnswers,
					allowRetake: snapshot.settings.allowRetake,
					retakeLimit: snapshot.settings.retakeLimit,
					timeLimit: snapshot.settings.timeLimit,
					createdAt: snapshot.settings.createdAt,
			  }
			: undefined,
		questions: snapshot.questions.map((q) => ({
			id: q.id,
			// snapshotId: q.snapshotId,
			originalId: q.originalId,
			text: q.text,
			order: q.order,
			type: q.type,
			image: q.image,
			createdAt: q.createdAt,
			answers: q.answers.map((a) => ({
				id: a.id,
				questionId: a.questionId,
				originalId: a.originalId,
				text: a.text,
				isCorrect: a.isCorrect,
				createdAt: a.createdAt,
			})),
		})),
	}
}

export const mapUserTest = (
	test: Test & {
		settings?: TestSettingsDTO | null
		questions?: (Question & { answers: Answer[] })[]
		author: {
			id: string
			email: string
			name?: string | null
			surname?: string | null
			patronymic?: string | null
		}
	}
): UserTestDTO => {
	return {
		id: test.id,
		title: test.title,
		description: test.description,
		visibilityStatus: test.visibilityStatus,
		image: test.image,
		settings: test.settings
			? {
					requireRegistration: test.settings.requireRegistration,
					showDetailedResults: test.settings.showDetailedResults,
					shuffleAnswers: test.settings.shuffleAnswers,
					shuffleQuestions: test.settings.shuffleQuestions,
					allowRetake: test.settings.allowRetake,
					retakeLimit: test.settings.retakeLimit,
					timeLimit: test.settings.timeLimit,
					inputFields: test.settings.inputFields,
			  }
			: ({} as TestSettingsDTO),
		questions: test.questions?.map((question) => mapUserQuestion(question)) || [],
	}
}

// Вспомогательная функция для маппинга вопросов без информации о правильных ответах
export const mapUserQuestion = (question: Question & { answers: Answer[] }): UserQuestionDTO => {
	return {
		id: question.id,
		text: question.text,
		type: question.type as QuestionType,
		image: question.image,
		answers:
			question.type === "FILL_IN_THE_BLANK" || question.type === "TEXT_INPUT"
				? question.answers.map((answer) => mapUserAnswerWithoutText(answer))
				: question.answers.map((answer) => mapUserAnswer(answer)),
	}
}

// Вспомогательная функция для маппинга ответов без информации о правильности
export const mapUserAnswer = (answer: Answer): AnswerUserDTO => {
	return {
		id: answer.id,
		text: answer.text,
	}
}
export const mapUserAnswerWithoutText = (answer: Answer): AnswerUserDTO => {
	return {
		id: answer.id,
	}
}

export const mapToTestSnapshotForAttemptDTO = (
	snapshot: TestSnapshot & {
		questions: (QuestionSnapshot & { answers: AnswerSnapshot[] })[]
		settings?: TestSettingsSnapshot | null
	}
): UserTestDTO => {
	return {
		id: snapshot.testId, //  testId из snapshot как id теста
		title: snapshot.title,
		description: snapshot.description,
		visibilityStatus: "PUBLISHED",
		image: snapshot.image,
		settings: snapshot.settings
			? {
					requireRegistration: snapshot.settings.requireRegistration,
					showDetailedResults: snapshot.settings.showDetailedResults,
					shuffleAnswers: snapshot.settings.shuffleAnswers,
					shuffleQuestions: snapshot.settings.shuffleQuestions,
					allowRetake: snapshot.settings.allowRetake,
					retakeLimit: snapshot.settings.retakeLimit,
					timeLimit: snapshot.settings.timeLimit,
					inputFields: snapshot.settings.inputFields,
			  }
			: ({} as TestSettingsDTO),
		questions: snapshot.questions.map((question) => mapSnapshotQuestionToUser(question)),
	}
}

// Вспомогательная функция для маппинга вопросов из snapshot без информации о правильных ответах
export const mapSnapshotQuestionToUser = (
	question: QuestionSnapshot & { answers: AnswerSnapshot[] }
): UserQuestionDTO => {
	return {
		id: question.originalId, // originalId для совместимости
		text: question.text,
		type: question.type as QuestionType,
		image: null,
		answers:
			question.type === "FILL_IN_THE_BLANK" || question.type === "TEXT_INPUT"
				? question.answers.map((answer) => mapSnapshotAnswerToUserWithoutText(answer))
				: question.answers.map((answer) => mapSnapshotAnswerToUser(answer)),
	}
}

// Вспомогательная функция для маппинга ответов из snapshot без информации о правильности
export const mapSnapshotAnswerToUser = (answer: AnswerSnapshot): AnswerUserDTO => {
	return {
		id: answer.originalId, // originalId для совместимости
		text: answer.text,
	}
}

export const mapSnapshotAnswerToUserWithoutText = (answer: AnswerSnapshot): AnswerUserDTO => {
	return {
		id: answer.originalId, // originalId для совместимости
	}
}
