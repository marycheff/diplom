import { AnswerDTO, PreTestUserDataType, TestDTO, TestSnapshotDTO, UserDTO } from "@/types"
import { QuestionType, TestAttemptStatus as AttemptStatus } from "@prisma/client"

export interface AttemptDTO {
	id: string
	status: AttemptStatus
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
	status: AttemptStatus
	score: number | null
	user: UserDTO | null
	preTestUserData: PreTestUserDataType | null
	timeSpent: number | null
	snapshot: TestSnapshotDTO | null
	startedAt: Date
	completedAt: Date | null
}

export interface AttemptResultDTO {
	id: string
	status: AttemptStatus
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
export interface AttemptUserDTO {
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
	attempts: AttemptDTO[]
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
			// position?: number // Добавление позиции для вопросов типа SEQUENCE
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
