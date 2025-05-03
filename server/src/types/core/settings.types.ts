import { JsonValue } from "@prisma/client/runtime/library"

export interface TestSettingsDTO {
    requireRegistration: boolean
    inputFields?: JsonValue
    shuffleQuestions: boolean
    shuffleAnswers: boolean
    showDetailedResults: boolean
    timeLimit?: number | null
}

// export interface UserTestSettingsDTO {
//     timeLimit?: number | null
//     shuffleQuestions: boolean
//     shuffleAnswers: boolean
//     requireRegistration: boolean
//     inputFields?: JsonValue
//     showDetailedResults: boolean
// }
