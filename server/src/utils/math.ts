import { ACTIVATION_LINK_LIFETIME_HOURS, RESET_CODE_LIFETIME_MINUTES } from "@/utils/constants"
export const generateCode = (): string => {
    const min = 100000 // 6 цифр
    const max = 999999 // 6 цифр
    const code = Math.floor(Math.random() * (max - min + 1)) + min
    return code.toString()
}
export const getActivationLinkExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setHours(expirationDate.getHours() + ACTIVATION_LINK_LIFETIME_HOURS)
    return expirationDate
}
export const getResetCodeExpDate = (): Date => {
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + RESET_CODE_LIFETIME_MINUTES)
    return expirationDate
}

export const calculateTestScore = (
    questionsWithAnswers: { id: string; answers: { id: string }[] }[],
    userAnswers: { questionId: string; answerId: string }[]
): number => {
    let correctQuestionsCount = 0

    for (const question of questionsWithAnswers) {
        const userAnswersForQuestion = userAnswers.filter(a => a.questionId === question.id)
        const correctAnswerIds = question.answers.map(a => a.id)
        const userAnswerIds = userAnswersForQuestion.map(a => a.answerId)

        if (
            correctAnswerIds.length === userAnswerIds.length &&
            correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
            userAnswerIds.every(id => correctAnswerIds.includes(id))
        ) {
            correctQuestionsCount++
        }
    }

    const totalQuestions = questionsWithAnswers.length
    return totalQuestions > 0 ? (correctQuestionsCount / totalQuestions) * 100 : 0
}