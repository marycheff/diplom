import { JsonValue } from "@prisma/client/runtime/library"

export interface TestSettingsDTO {
	requireRegistration: boolean
	inputFields?: JsonValue
	shuffleQuestions: boolean
	shuffleAnswers: boolean
	showDetailedResults: boolean
	allowRetake: boolean
	retakeLimit: number | null
	timeLimit?: number | null
}
