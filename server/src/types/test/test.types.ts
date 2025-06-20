import { QuestionDTO, TestSettingsDTO, UserQuestionDTO } from "@/types"
import { ModerationStatus, TestVisibilityStatus } from "@prisma/client"

export interface CreateTest {
	title: string
	description?: string | null
}

export interface TestsListDTO {
	tests: TestDTO[]
	total: number
}

export interface TestDTO {
	id: string
	author: {
		id: string
		email: string
		name?: string | null
		surname?: string | null
		patronymic?: string | null
	}
	title: string
	description: string | null
	questions?: QuestionDTO[]
	settings?: TestSettingsDTO
	visibilityStatus: TestVisibilityStatus
	moderationStatus: ModerationStatus
	image: string | null
	moderatedBy: string | null
	moderatedAt: Date | null
	totalAttempts: number
	version?: number
}

export interface ShortTestInfo {
	title: string
	description:string | null
	image: string | null
}

export interface UserTestDTO {
	id: string
	title: string
	description: string | null 
	questions?: UserQuestionDTO[]
	settings?: TestSettingsDTO
	visibilityStatus: TestVisibilityStatus
	image: string | null
}
