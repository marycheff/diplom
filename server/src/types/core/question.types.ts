import { QuestionType } from "@prisma/client"

export interface CreateQuestionDTO {
    text: string
    type: QuestionType
    order: number
}

export interface CreateAnswerDTO {
    text: string
    isCorrect: boolean
}

export interface AnswerDTO extends CreateAnswerDTO {
    id: string
    questionId?: string
}

export interface QuestionDTO extends CreateQuestionDTO {
    id: string
    answers: AnswerDTO[]
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
