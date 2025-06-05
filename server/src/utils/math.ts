import { ACTIVATION_LINK_LIFETIME_HOURS, RESET_CODE_LIFETIME_MINUTES } from "@/utils/constants"
import { QuestionType } from "@prisma/client"
import seedrandom from "seedrandom"

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
export const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

type QuestionWithAnswers = {
	id: string
	type: QuestionType
	answers: { id: string }[]
}

type UserAnswer = {
	questionId: string
	answerId: string
	isCorrect?: boolean | null
	position?: number
}

export const calculateTestScore = (questionsWithAnswers: QuestionWithAnswers[], userAnswers: UserAnswer[]): number => {
	let correctQuestionsCount = 0

	for (const question of questionsWithAnswers) {
		const userAnswersForQuestion = userAnswers.filter((a) => a.questionId === question.id)

		if (question.type === "TEXT_INPUT" || question.type === "FILL_IN_THE_BLANK") {
			const allCorrect = userAnswersForQuestion.length > 0 && userAnswersForQuestion.every((a) => a.isCorrect === true)

			if (allCorrect) correctQuestionsCount++
			//   } else if (question.type === "SEQUENCE") {
			//       // Для вопросов типа SEQUENCE проверка правильности порядка ответов
			//       // Сортировка ответов пользователя по позиции
			//       const sortedUserAnswers = [...userAnswersForQuestion].sort((a, b) => {
			//           return (a.position || 0) - (b.position || 0)
			//       })

			//       // Получение ID ответов в правильном порядке (предполагается, что ответы в question.answers уже в правильном порядке)
			//       const correctAnswerIds = question.answers.map(a => a.id)
			//       const userAnswerIds = sortedUserAnswers.map(a => a.answerId)

			//       // Проверка, что все ответы присутствуют и в правильном порядке
			//       const correctSequence =
			//           correctAnswerIds.length === userAnswerIds.length &&
			//           correctAnswerIds.every((id, index) => id === userAnswerIds[index])

			//       if (correctSequence) correctQuestionsCount++
		} else {
			const correctAnswerIds = question.answers.map((a) => a.id)
			const userAnswerIds = userAnswersForQuestion.map((a) => a.answerId)

			const allMatch =
				correctAnswerIds.length === userAnswerIds.length &&
				correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
				userAnswerIds.every((id) => correctAnswerIds.includes(id))

			if (allMatch) correctQuestionsCount++
		}
	}

	const totalQuestions = questionsWithAnswers.length
	return totalQuestions > 0 ? (correctQuestionsCount / totalQuestions) * 100 : 0
}

export const generateSeedFromAttemptId = (attemptId: string): number => {
	let hash = 0
	for (let i = 0; i < attemptId.length; i++) {
		const char = attemptId.charCodeAt(i)
		hash = (hash << 5) - hash + char
		hash = hash & hash // Преобразование в 32-битное целое
	}
	return Math.abs(hash)
}
// Функция для перемешивания массива с использованием seed
export const shuffleArray = <T>(array: T[], seed: number): T[] => {
	const shuffled = [...array]
	const random = seedrandom(seed.toString())

	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
	}
	return shuffled
}
