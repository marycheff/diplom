import { AnswerDTO, PreTestUserData, QuestionType, TestDTO, UserDTO } from "@/shared/types"

export interface AttemptState {
    isFetching: boolean
    isLoading: boolean
    getTestAttempts: (testId: string, page?: number, limit?: number) => Promise<AttemptsListDTO | undefined>
    getAttemptById: (id: string) => Promise<TestAttemptDTO | undefined>
    getAllAttempts: (page: number, limit: number) => Promise<AttemptsListDTO | undefined>
    // TODO: исправить any
    startAttempt: (testId: string, userData?: any) => Promise<StartAttempt | undefined>
    saveAnswers: (attemptId: string, answers: AttemptAnswer[]) => Promise<void>
    completeAttempt: (attemptId: string) => Promise<CompleteAttemptResponse>
    // CACHE
    CACHE_EXPIRATION_TIME: number
    cache: Record<string, { data: AttemptsListDTO; timestamp: Date }>
    setCache: (key: string, data: AttemptsListDTO) => void
    clearCache: () => void
    lastCacheUpdateDate: Date | null
}

export interface StartAttempt {
    attemptId: string
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
export interface AttemptAnswer {
    questionId: string
    answersIds: string[]
    timeSpent?: number
}
export interface CompleteAttemptResponse {
    score: number
}
