export interface GigaChatContentResponse {
    choices: { message: { content: string } }[]
    usage: { total_tokens: number }
}

export interface GigaChatPostData {
    model: string
    messages: { role: string; content: string }[]
    stream: boolean
    repetition_penalty: number
}

export interface GenerateWrongAnswersParams {
    token: string
    numOfAnswers: number
    question: string
    answer: string
}
