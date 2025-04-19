import { UserDTO } from "@/types/user.types"
import { QuestionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"
export interface CreateTest {
    title: string
    description: string | null
    settings?: TestSettingsDTO | null
}

export interface CreateQuestionDTO {
    text: string
    type: QuestionType
    order?: number
}
export interface CreateAnswerDTO {
    text: string
    isCorrect: boolean
}

export interface AnswerDTO extends CreateAnswerDTO {
    id: string
    questionId?: string
}
export interface TestsListDTO {
    tests: TestDTO[]
    total: number
}

export interface QuestionDTO extends CreateQuestionDTO {
    id: string
    answers: AnswerDTO[]
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
    snapshotId: string
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
// ИНТЕРФЕЙСЫ ДЛЯ ПОЛЬЗОВАТЕЛЯ, ПРОХОДЯЩЕГО ТЕСТ
export interface UserTestDTO {
    id: string
    title: string
    description?: string
    questions?: UserQuestionDTO[]
    settings?: UserTestSettingsDTO
}

export interface UserQuestionDTO {
    id: string
    text: string
    type: QuestionType
    answers: AnswerUserDTO[]
}

export interface AnswerUserDTO {
    id: string
    text: string
    // Здесь нет поля isCorrect
}

export interface UserTestSettingsDTO {
    timeLimit?: number | null
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    requireRegistration?: boolean
    inputFields?: JsonValue
}

// СНАПШОТЫ
export interface SnapshotWithOriginalTestDTO {
    snapshot: TestSnapshotDTO
    originalTest: TestDTO
}
export interface TestSnapshotDTO {
    id: string
    testId: string
    title: string
    description?: string
    status: string
    createdAt: Date
    questions: QuestionSnapshotDTO[]
    settings?: TestSettingsSnapshotDTO
}

export interface QuestionSnapshotDTO {
    id: string
    // snapshotId: string
    originalId: string
    text: string
    order: number
    type: QuestionType
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
    timeLimit?: number | null
    createdAt: Date
}
