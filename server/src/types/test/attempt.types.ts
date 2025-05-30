import { AnswerDTO, PreTestUserDataType, TestDTO, TestSnapshotDTO, UserDTO } from "@/types"
import { QuestionType, TestAttemptStatus } from "@prisma/client"

export interface TestAttemptDTO {
	id: string
	status: TestAttemptStatus
	score: number | null
	user: UserDTO | null
	preTestUserData: PreTestUserDataType | null
	test: TestDTO
	questions: AttemptQuestionDTO[]
	timeSpent: number | null
	startedAt: Date
	completedAt: Date | null
	snapshotId: string
}

export interface AttemptWithSnapshotDTO {
	id: string
	status: TestAttemptStatus
	score: number | null
	user: UserDTO | null
	preTestUserData: PreTestUserDataType | null
	timeSpent: number | null
	snapshot: TestSnapshotDTO | null
	startedAt: Date
	completedAt: Date | null
}

export interface TestAttemptResultDTO {
	id: string
	status: TestAttemptStatus
	startedAt: Date
	completedAt: Date | null
	score: number | null
	timeSpent: number | null
	// user: UserDTO | null
	// preTestUserData: PreTestUserDataType | null
	// test: TestDTO
	questions: AttemptQuestionDTO[]
	// snapshotId: string
}
export interface TestAttemptUserDTO {
	id: string
	testId: string
	testSnapshotId: string | null
	userId?: string | null
	status: string
	startedAt: Date
	completedAt: Date | null
	score: number | null
	timeSpent: number
	answers: UserAnswerDTO[]
}
export interface AttemptsListDTO {
	attempts: TestAttemptDTO[]
	total: number
}
export interface AttemptsWithSnapshotListDTO {
	attempts: AttemptWithSnapshotDTO[]
	total: number
}

export interface AttemptQuestionDTO {
	question: {
		id: string
		text: string
		order?: number
		type: QuestionType
	}
	answers: AnswerDTO[]
	userAnswers: {
		answers: Array<{
			userAnswerId: string
			answer: AnswerDTO
			// position?: number // Добавляем позицию для вопросов типа SEQUENCE
		}>
		textAnswer: string | null
		isCorrect: boolean | null
		answeredAt: Date | null
		createdAt: Date
	} | null
}

export interface UserAnswerDTO {
	id: string
	attemptId: string
	questionId: string
	answerId: string
	textAnswer: string | null
	isCorrect: boolean | null
	answeredAt: Date | null
	createdAt: Date
}
export interface AttemptAnswer {
	questionId: string
	answersIds: string[]
	textAnswer: string | null
	isCorrect: boolean | null
	// sequenceOrder?: { answerId: string; position: number }[];
	answeredAt?: Date
}
