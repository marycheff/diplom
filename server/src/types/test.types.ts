export interface CreateAnswer {
    text: string
    isCorrect: boolean
}
export interface CreateQuestion {
    text: string
    answers: CreateAnswer[]
    order?: number 
}

export interface CreateTest {
    title: string
    description?: string
    questions: CreateQuestion[]
}
export interface TestResponse {
    id: string
    authorId: string
    title: string
    description?: string
    questions?: QuestionResponse[]
}
export interface QuestionResponse {
    id: string
    text: string
    order: number
    answers: AnswerResponse[]
}
export interface AnswerResponse {
    id: string
    text: string
    isCorrect: boolean 
}
export interface UpdateTest {
    questions: CreateQuestion[]
}
