import { UserDTO } from "@/types/userTypes"

export interface TestState {
    isTestsFetching: boolean
    getTests: () => Promise<TestDTO[] | undefined>
}

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

export enum QuestionType {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    TEXT_INPUT = "TEXT_INPUT",
}
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray
export interface JsonObject {
    [key: string]: JsonValue
}
export type JsonArray = JsonValue[]
