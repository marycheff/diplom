import { JsonValue, PreTestUserData } from "@/shared/types"

export interface TestSettingsDTO {
    requireRegistration?: boolean
    inputFields?: PreTestUserData[]
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    showDetailedResults?: boolean
    timeLimit?: number | null
}

export interface UserTestSettingsDTO {
    timeLimit?: number | null
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    requireRegistration?: boolean
    inputFields?: PreTestUserData[]
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
