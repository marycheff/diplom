import { AnswerDTO, PreTestUserData, QuestionType, TestDTO, UserDTO } from "@/shared/types"

export interface AttemptState {
    isFetching: boolean
    isLoading: boolean
    getTestAttempts: (testId: string, page?: number, limit?: number) => Promise<AttemptsListDTO | undefined>
    getAttemptById: (id: string) => Promise<TestAttemptDTO | undefined>
    getAttemptForUserById: (id: string) => Promise<TestAttemptUserDTO | undefined>
    getAllAttempts: (page: number, limit: number) => Promise<AttemptsListDTO | undefined>
    // TODO: исправить any
    startAttempt: (testId: string, preTestUserData?: any) => Promise<StartAttemptDTO | undefined>
    saveAnswers: (attemptId: string, answers: AttemptAnswer[]) => Promise<void>
    completeAttempt: (attemptId: string) => Promise<CompleteAttemptResponse>
    // CACHE
    CACHE_EXPIRATION_TIME: number
    cache: Record<string, { data: AttemptsListDTO; timestamp: Date }>
    setCache: (key: string, data: AttemptsListDTO) => void
    clearCache: () => void
    lastCacheUpdateDate: Date | null
}

export interface StartAttemptDTO {
    attemptId: string
}

export interface TestAttemptDTO {
    id: string
    status: string
    startedAt: Date
    completedAt: Date | null
    score: number | null
    user: UserDTO | null
    preTestUserData: Record<PreTestUserData, string> | null
    test: TestDTO
    questions: AttemptQuestionDTO[]
    snapshotId: string
}
export interface TestAttemptUserDTO {
    id: string
    testId: string
    status: AttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    answers: UserAnswerDTO[]
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
    userAnswers: {
        answers: Array<{
            userAnswerId: string
            answer: AnswerDTO
        }>
        timeSpent: number | null
        answeredAt: Date | null
        createdAt: Date
    } | null
}
export interface AttemptAnswer {
    questionId: string
    answersIds: string[]
    timeSpent?: number
    answeredAt?: Date
}

export interface CompleteAttemptResponse {
    score: number
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
export enum AttemptStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    EXPIRED = "EXPIRED",
}
