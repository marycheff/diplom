import { PreTestUserData } from "@/shared/types"

export interface TestSettingsDTO {
    requireRegistration?: boolean
    shuffleQuestions?: boolean
    shuffleAnswers?: boolean
    allowRetake?: boolean
    showDetailedResults?: boolean
    inputFields?: PreTestUserData[]
    timeLimit?: number | null
}

export interface TestSettingsSnapshotDTO {
    id: string
    // snapshotId: string
    requireRegistration: boolean
    inputFields?: PreTestUserData[]
    showDetailedResults: boolean
    shuffleQuestions: boolean
    shuffleAnswers: boolean
    allowRetake?: boolean
    timeLimit?: number | null
    createdAt: Date
}
