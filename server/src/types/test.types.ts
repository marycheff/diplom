import { UserDTO } from "@/types/user.types"
import { QuestionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"

export interface AnswerDTO {
    id: string
    text: string
    isCorrect: boolean
}

export interface QuestionDTO {
    id: string
    text: string
    order?: number
    answers: AnswerDTO[]
    type: QuestionType
}

export interface TestDTO {
    id: string
    authorId: string
    title: string
    description?: string
    questions?: QuestionDTO[]
    settings?: TestSettingsDTO
    totalAttempts: number
}
export interface TestSettingsDTO {
    requireRegistration?: boolean
    inputFields?: JsonValue
    requiredFields?: JsonValue
    showDetailedResults?: boolean
}

export interface UpdateTestDTO {
    title?: string
    description?: string
    questions: QuestionDTO[]
    settings?: TestSettingsDTO
}

export interface TestAttemptDTO {
    id: string
    status: string
    startedAt: Date
    completedAt: Date | null
    score: number | null
    user: UserDTO | JsonValue | null
    test: TestDTO
    questions: AttemptQuestionDTO[]
}

export interface AttemptQuestionDTO {
    question: {
        id: string
        text: string
        order?: number
        type: QuestionType
    }
    answers: AnswerDTO[]
    userAnswer: AnswerDTO | null
}
