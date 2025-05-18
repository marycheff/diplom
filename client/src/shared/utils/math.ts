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
        // if(question.)
    }

    const totalQuestions = questionsWithAnswers.length
    return totalQuestions > 0 ? (correctQuestionsCount / totalQuestions) * 100 : 0
}

// Функция для сравнения массивов (например, для inputFields)
export const arraysEqual = (a: any[], b: any[]) => {
    if (a.length !== b.length) return false
    return a.every(item => b.includes(item))
}
