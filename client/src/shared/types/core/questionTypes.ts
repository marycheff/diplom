export enum QuestionType {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    TEXT_INPUT = "TEXT_INPUT",
}

export interface QuestionDTO {
    id: string
    text: string
    order?: number
    answers: AnswerDTO[]
    type: QuestionType
}

export interface AnswerDTO {
    id: string
    text: string
    isCorrect: boolean
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

// export interface AttemptQuestionDTO {
//     question: {
//         id: string
//         text: string
//         order?: number
//         type: QuestionType
//     }
//     answers: AnswerDTO[]
//     userAnswer: {
//         userAnswerId: string
//         answer: AnswerDTO
//         timeSpent: number | null
//         answeredAt: Date | null
//         createdAt: Date
//     } | null
// }
