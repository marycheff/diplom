import { AttemptQuestionDTO, QuestionType } from "@/shared/types"

export const calculateTestScore = (
	questionsWithAnswers: { id: string; answers: { id: string }[] }[],
	userAnswers: { questionId: string; answerId: string }[]
): number => {
	let correctQuestionsCount = 0

	for (const question of questionsWithAnswers) {
		const userAnswersForQuestion = userAnswers.filter((a) => a.questionId === question.id)
		const correctAnswerIds = question.answers.map((a) => a.id)
		const userAnswerIds = userAnswersForQuestion.map((a) => a.answerId)

		if (
			correctAnswerIds.length === userAnswerIds.length &&
			correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
			userAnswerIds.every((id) => correctAnswerIds.includes(id))
		) {
			correctQuestionsCount++
		}
	}

	const totalQuestions = questionsWithAnswers.length
	return totalQuestions > 0 ? (correctQuestionsCount / totalQuestions) * 100 : 0
}

// Функция для сравнения массивов (например, для inputFields)
export const arraysEqual = (a: any[], b: any[]) => {
	if (a.length !== b.length) return false
	return a.every((item) => b.includes(item))
}

// Подсчет количества правильных ответов в попытке
export const countCorrectAnswers = (questions: AttemptQuestionDTO[]): number => {
	if (!questions) return 0

	let correctCount = 0

	questions.forEach((question) => {
		const userAnswers = question.userAnswers?.answers ?? []

		if (
			question.question.type === QuestionType.TEXT_INPUT ||
			question.question.type === QuestionType.FILL_IN_THE_BLANK
		) {
			if (question.userAnswers?.isCorrect) {
				correctCount++
			}
		} else {
			// Для SINGLE_CHOICE и MULTIPLE_CHOICE сравнение ID
			const correctAnswerIds = question.answers.filter((answer) => answer.isCorrect).map((answer) => answer.id)
			const userAnswerIds = userAnswers.map((a) => a.answer.id)

			if (
				correctAnswerIds.length === userAnswerIds.length &&
				correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
				userAnswerIds.every((id) => correctAnswerIds.includes(id))
			) {
				correctCount++
			}
		}
	})

	return correctCount
}
