import { QuestionDTO, TestSettingsDTO, UserQuestionDTO, UserTestSettingsDTO } from "@/types"

export interface CreateTest {
    title: string
    description: string | null
    settings?: TestSettingsDTO | null
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

export interface UpdateTestDTO {
    title?: string
    description?: string
    questions: QuestionDTO[]
    settings?: TestSettingsDTO
}

export interface ShortTestInfo {
    title: string
    description?: string
}

export interface UserTestDTO {
    id: string
    title: string
    description?: string
    questions?: UserQuestionDTO[]
    settings?: UserTestSettingsDTO
}
