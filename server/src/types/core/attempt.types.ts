
import { AnswerDTO, PreTestUserDataType, TestDTO, UserDTO } from "@/types"
import { QuestionType, Test, TestAttemptStatus } from "@prisma/client"

export interface TestAttemptDTO {
    id: string
    status: TestAttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    user: UserDTO | null
    preTestUserData: PreTestUserDataType | null
    test: TestDTO
    questions: AttemptQuestionDTO[]
    snapshotId: string
}
export interface TestAttemptResultDTO {
    id: string
    status: TestAttemptStatus
    startedAt: Date
    completedAt: Date | null
    score: number | null
    // user: UserDTO | null
    // preTestUserData: PreTestUserDataType | null
    // test: TestDTO
    questions: AttemptQuestionDTO[]
    // snapshotId: string
}
export interface TestAttemptUserDTO {
    id: string
    testId: string
    status: string
    startedAt: Date
    completedAt: Date | null
    score: number | null
    answers: UserAnswerDTO[]
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

export interface UserAnswerDTO {
    id: string
    attemptId: string
    questionId: string
    answerId: string
    answeredAt: Date | null
    timeSpent: number | null
    createdAt: Date
}
export interface AttemptAnswer {
    questionId: string
    answersIds: string[]
    timeSpent?: number
    answeredAt?: Date
}
