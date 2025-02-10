export interface IAnswer {
    id: string
    text: string
    isCorrect: boolean
}

export interface IQuestion {
    id: string
    text: string
    order?: number
    answers: IAnswer[]
}

export interface ITest {
    title: string
    description?: string
    questions: IQuestion[]
}

// Интерфейсы для ответов API
export interface ITestResponse {
    id: string
    authorId: string
    title: string
    description?: string
    questions?: IQuestionResponse[]
}

export interface IQuestionResponse {
    id: string
    text: string
    order: number
    answers: IAnswerResponse[]
}

export interface IAnswerResponse {
    id: string
    text: string
    isCorrect: boolean
}

// Интерфейс для обновления теста
export interface IUpdateTest {
    questions: IQuestion[]
}
