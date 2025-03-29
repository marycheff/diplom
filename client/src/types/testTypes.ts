import { PreTestUserData } from "@/types/inputFields"
import { UserDTO } from "@/types/userTypes"

export interface TestState {
    isFetching: boolean
    getTests: (page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    searchTests: (query: string, page: number, limit: number) => Promise<TestsListDTO | undefined>
    getTestById: (id: string) => Promise<TestDTO | undefined>
    // CACHE
    CACHE_EXPIRATION_TIME: number
    cache: Record<string, { data: TestsListDTO; timestamp: Date }>
    setCache: (key: string, data: TestsListDTO) => void
    clearCache: () => void
    lastCacheUpdateDate: Date | null
}

export interface AttemptState {
    isFetching: boolean
    getTestAttempts: (testId: string, page?: number, limit?: number) => Promise<AttemptsListDTO | undefined>
    getAttemptById: (id: string) => Promise<TestAttemptDTO | undefined>
    // CACHE
    CACHE_EXPIRATION_TIME: number
    cache: Record<string, { data: AttemptsListDTO; timestamp: Date }>
    setCache: (key: string, data: AttemptsListDTO) => void
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
    timeLimit?: number | null
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
    user: UserDTO | Record<PreTestUserData, string> | null
    test: TestDTO
    questions: AttemptQuestionDTO[]
}

export interface AttemptsListDTO {
    attempts: TestAttemptDTO[]
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
    userAnswer: {
        userAnswerId: string // ID из UserAnswer (новое поле)
        answer: AnswerDTO // Данные ответа (бывший userAnswer)
        timeSpent: number | null
        answeredAt: Date | null
        createdAt: Date
    } | null
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
