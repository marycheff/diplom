import { UserDTO } from "@/types/user.types"
import { QuestionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"

export interface AnswerDTO {
    id: string
    text: string
    isCorrect: boolean
}
export interface TestsListDTO {
    tests: TestDTO[]
    total: number
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
    inputFields?: JsonValue
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
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
    user: UserDTO | JsonValue | null
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
        userAnswerId: string
        answer: AnswerDTO
        timeSpent: number | null
        answeredAt: Date | null
        createdAt: Date
    } | null
}
export interface UserAnswerDTO {
    id: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date
}
export interface ShortTestInfo {
    title: string
    description?: string
}
