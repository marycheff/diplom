import { AnswerDTO, PreTestUserData, QuestionType, TestDTO, TestSnapshotDTO, UserDTO } from "@/shared/types"

export interface AttemptState {
    isFetching: boolean
    isLoading: boolean
    isTimeUpdating: boolean
    getTestAttempts: (testId: string, page?: number, limit?: number) => Promise<AttemptsListDTO | undefined>
    getAttemptById: (id: string) => Promise<TestAttemptDTO | undefined>
    getAttemptResults: (id: string) => Promise<TestAttemptResultDTO | undefined>
    getAttemptForUserById: (id: string) => Promise<TestAttemptUserDTO | undefined>
    getAllAttempts: (page: number, limit: number) => Promise<AttemptsListDTO | undefined>
    getMyAttempts: (page: number, limit: number) => Promise<AttemptsWithSnapshotListDTO | undefined>
    // TODO: исправить any
    startAttempt: (testId: string, preTestUserData?: any) => Promise<StartAttemptDTO | undefined>
    saveAnswers: (attemptId: string, answers: AttemptAnswer[]) => Promise<void>
    completeAttempt: (attemptId: string) => Promise<CompleteAttemptResponse>
    updateTimeSpent: (attemptId: string, timeSpent: number) => Promise<void>
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
    status: AttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    user: UserDTO | null
    preTestUserData: Record<PreTestUserData, string> | null
    timeSpent: number
    test: TestDTO
    questions: AttemptQuestionDTO[]
    snapshotId: string
}

export interface AttemptWithSnapshotDTO {
    id: string
    status: AttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    timeSpent: number
    user: UserDTO | null
    preTestUserData: Record<PreTestUserData, string> | null
    snapshot: TestSnapshotDTO | null
}

export interface AttemptsWithSnapshotListDTO {
    attempts: AttemptWithSnapshotDTO[]
    total: number
}

export interface TestAttemptResultDTO {
    id: string
    status: AttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    timeSpent: number
    // user: UserDTO | null
    // preTestUserData: PreTestUserDataType | null
    // test: TestDTO
    questions: AttemptQuestionDTO[]
    // snapshotId: string
}
export interface TestAttemptUserDTO {
    id: string
    testId: string
    status: AttemptStatus
    score: number | null
    timeSpent: number
    answers: UserAnswerDTO[]
    startedAt: Date
    completedAt: Date | null
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

export const AttemptStatusLabels: Record<AttemptStatus, string> = {
    [AttemptStatus.IN_PROGRESS]: "В процессе",
    [AttemptStatus.COMPLETED]: "Завершена",
    [AttemptStatus.EXPIRED]: "Истекла",
}
