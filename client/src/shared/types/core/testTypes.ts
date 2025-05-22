import {
    QuestionDTO,
    QuestionSnapshotDTO,
    TestSettingsDTO,
    TestSettingsSnapshotDTO,
    UserQuestionDTO,
} from "@/shared/types"

export interface TestState {
    isFetching: boolean
    isLoading: boolean
    isShortInfoUpdating: boolean
    isSettingsUpdating: boolean
    isGenerating: boolean
    isVisibilityUpdating: boolean
    isModerationStatusUpdating: boolean

    getTests: (page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    getUnmoderatedTests: (page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    searchTests: (query: string, page: number, limit: number) => Promise<TestsListDTO | undefined>
    searchMyTests: (query: string, page: number, limit: number) => Promise<TestsListDTO | undefined>
    getTestById: (id: string) => Promise<TestDTO | undefined>
    getTestForUserById: (testId: string, attemptId?: string) => Promise<UserTestDTO | undefined>
    getTestSnapshotForUser: (snapshotId: string, attemptId?: string) => Promise<UserTestDTO | undefined>
    getMyTests: (page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    getUserTests: (userId: string, page?: number, limit?: number) => Promise<TestsListDTO | undefined>
    createTest: (title: string, description?: string) => Promise<TestDTO | undefined>
    generateAnswers: (data: GenerateAnswerFormData) => Promise<string[]>
    updateTestQuestions: (testId: string, data: UpdateTestDTO) => Promise<void>
    upsertQuestions: (testId: string, questions: QuestionDTO[]) => Promise<QuestionDTO[]>
    updateTestSettings: (testId: string, updatedSettings: TestSettingsDTO) => Promise<void>
    updateShortInfo: (testId: string, updatedShortInfo: ShortTestInfo) => Promise<void>
    getSnapshotById: (snapshotId: string) => Promise<SnapshotWithOriginalTestDTO | undefined>
    changeVisibilityStatus: (testId: string, status: TestVisibilityStatus) => Promise<void>
    changeModerationStatus: (testId: string, status: ModerationStatus) => Promise<void>
    deleteTest: (id: string) => Promise<void>

    // CACHE
    CACHE_EXPIRATION_TIME: number
    cache: Record<string, { data: TestsListDTO; timestamp: Date }>
    setCache: (key: string, data: TestsListDTO) => void
    clearCache: () => void
    lastCacheUpdateDate: Date | null
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
    visibilityStatus: TestVisibilityStatus
    moderationStatus: ModerationStatus
    moderatedBy: string | null
    moderatedAt: Date | null
    totalAttempts: number
}

// ИНТЕРФЕЙСЫ ДЛЯ ПОЛЬЗОВАТЕЛЯ, ПРОХОДЯЩЕГО ТЕСТ
export interface UserTestDTO {
    id: string
    title: string
    description?: string
    questions?: UserQuestionDTO[]
    settings?: TestSettingsDTO
}

export interface UpdateTestDTO {
    title?: string
    description?: string
    questions: QuestionDTO[]
    settings?: TestSettingsDTO
}

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray
export interface JsonObject {
    [key: string]: JsonValue
}
export type JsonArray = JsonValue[]

export interface GenerateAnswerFormData {
    question: string
    answer: string
    numOfAnswers: number
}
export interface ShortTestInfo {
    title: string
    description?: string
}

export interface SnapshotWithOriginalTestDTO {
    snapshot: TestSnapshotDTO
    originalTest: TestDTO
}

export interface TestSnapshotDTO {
    id: string
    testId: string
    title: string
    description?: string
    status: ModerationStatus
    createdAt: Date
    questions: QuestionSnapshotDTO[]
    settings?: TestSettingsSnapshotDTO
}
export enum TestVisibilityStatus {
    HIDDEN = "HIDDEN",
    PUBLISHED = "PUBLISHED",
}
export const VisibilityStatusLabels: Record<TestVisibilityStatus, string> = {
    [TestVisibilityStatus.HIDDEN]: "Скрыт",
    [TestVisibilityStatus.PUBLISHED]: "Публикуется",
}

export enum ModerationStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}
export const ModerationStatusLabels: Record<ModerationStatus, string> = {
    [ModerationStatus.PENDING]: "В обработке",
    [ModerationStatus.APPROVED]: "Одобрен",
    [ModerationStatus.REJECTED]: "Отклонен",
}
