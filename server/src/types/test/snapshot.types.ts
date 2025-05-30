import { QuestionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"
import { TestDTO } from "./test.types"

export interface SnapshotWithOriginalTestDTO {
	snapshot: TestSnapshotDTO
	originalTest: TestDTO
}

export interface TestSnapshotDTO {
	id: string
	testId: string
	title: string
	description: string | null
	status: string
	createdAt: Date
	questions?: QuestionSnapshotDTO[]
	settings?: TestSettingsSnapshotDTO
}

export interface QuestionSnapshotDTO {
	id: string
	originalId: string
	text: string
	order: number
	type: QuestionType
	image: string | null

	createdAt: Date
	answers: AnswerSnapshotDTO[]
}

export interface AnswerSnapshotDTO {
	id: string
	questionId: string
	originalId: string
	text: string
	isCorrect: boolean
	createdAt: Date
}

export interface TestSettingsSnapshotDTO {
	id: string
	// snapshotId: string
	requireRegistration: boolean
	inputFields?: JsonValue
	showDetailedResults: boolean
	shuffleQuestions: boolean
	shuffleAnswers: boolean
	allowRetake: boolean
	retakeLimit: number | null
	timeLimit?: number | null
	createdAt: Date
}
