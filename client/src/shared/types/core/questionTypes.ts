export enum QuestionType {
    SINGLE_CHOICE = "SINGLE_CHOICE",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    TEXT_INPUT = "TEXT_INPUT",
    MATCHING = "MATCHING",
    FILL_IN_THE_BLANK = "FILL_IN_THE_BLANK",
    SEQUENCE = "SEQUENCE",
}

export const QuestionTypeLabels: Record<QuestionType, string> = {
    [QuestionType.SINGLE_CHOICE]: "Одиночный выбор",
    [QuestionType.MULTIPLE_CHOICE]: "Множественный выбор",
    [QuestionType.TEXT_INPUT]: "Текстовый ввод",
    [QuestionType.MATCHING]: "Сопоставление",
    [QuestionType.FILL_IN_THE_BLANK]: "Заполнение пропуска",
    [QuestionType.SEQUENCE]: "Последовательность",
}

export interface QuestionDTO {
    id: string
    text: string
    order?: number
    answers: AnswerDTO[]
    type: QuestionType
    image?: string
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
