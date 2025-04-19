import { AnswerDTO, TestDTO, UserDTO } from "@/types"
import { QuestionType } from "@prisma/client"
import { JsonValue } from "@prisma/client/runtime/library"

export interface TestAttemptDTO {
    id: string
    status: string
    startedAt: Date
    completedAt: Date | null
    score: number | null
    user: UserDTO | JsonValue | null
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

export interface UserAnswerDTO {
    id: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date
}
