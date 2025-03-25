import { PreTestUserData } from "@/types/inputFields"
import { UserDTO } from "@/types/userTypes"

export interface TestState {
    isFetching: boolean
    getTests: (page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    searchTests: (query: string, page: number, limit: number) => Promise<TestsListDTO | undefined>
    getTestById: (id: string) => Promise<TestDTO | undefined>
    MAX_CACHE_ENTRIES: number
    cache: Record<string, any>
    setCache: (key: string, data: TestsListDTO) => void
    clearCache: () => void
    lastCacheUpdateDate: Date | null
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
    description?: string
    questions?: QuestionDTO[]
    settings?: TestSettingsDTO
    totalAttempts: number
}
export interface TestSettingsDTO {
    requireRegistration?: boolean
    inputFields?: PreTestUserData[]
    requiredFields?: PreTestUserData[]
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
