export interface ChatContentResponse {
    choices: { message: { content: string } }[]
    usage: { total_tokens: number }
}

export interface GetChatContentParams {
    token: string
    numOfAnswers: number
    question: string
    answer: string
}
