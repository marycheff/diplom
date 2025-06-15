import { formatSpaces } from "@/shared/utils/formatter"
import { RegisterOptions } from "react-hook-form"

export const testTitleValidationRules: RegisterOptions = {
	required: "Название теста обязательно",
	maxLength: {
		value: 100,
		message: "Название теста не должно превышать 100 символов",
	},
}
export const testTopicValidationRules: RegisterOptions = {
	required: "Тема теста обязательна",
	maxLength: {
		value: 30,
		message: "Тема теста не должна превышать 30 символов",
	},
	minLength: {
		value: 3,
		message: "Тема теста должна быть длиннее 3 символов",
	},
}

export const testDescriptionValidationRules: RegisterOptions = {
	maxLength: {
		value: 500,
		message: "Описание теста не должно превышать 500 символов",
	},
}

export const emailValidationRules: RegisterOptions = {
	required: "Email обязателен",
	pattern: {
		value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
		message: "Введите корректный email",
	},
}
export const passwordValidationRules: RegisterOptions = {
	required: "Пароль обязателен",
	minLength: {
		value: 6,
		message: "Пароль должен содержать не менее 6 символов",
	},
	maxLength: {
		value: 64,
		message: "Пароль не должен превышать 32 символа",
	},
}

export const questionValidationRules: RegisterOptions = {
	required: "Вопрос обязателен",
	validate: (value: string) => {
		if (!hasText(value)) return "Вопрос должен содержать текст"
		if (!isWithinCharLimit(value, 500)) return "Вопрос не должен превышать 500 символов"
		if (!isWithinWordCount(value, 2, 100)) return "Вопрос должен содержать от 2 слов"
		return true
	},
}
export const answerValidationRules: RegisterOptions = {
	required: "Ответ обязателен",
	validate: (value: string) => {
		if (!isWithinCharLimit(value, 255)) return "Ответ не должен превышать 255 символов"
		if (!isWithinWordCount(value, 1, 5)) return "Ответ должен содержать от 1 до 5 слов"
		return true
	},
}
export const questionValidationFillInTextRules = {
	required: "Вопрос обязателен",
	validate: {
		hasText: (value: string) => hasText(value) || "Вопрос должен содержать текст",
		withinCharLimit: (value: string) => isWithinCharLimit(value, 500) || "Вопрос не должен превышать 500 символов",
		withinWordCount: (value: string) => isWithinWordCount(value, 2, 100) || "Вопрос должен содержать от 2 слов",
		hasBlankMarker: (value: string) => hasBlankMarker(value) || "Вопрос должен содержать маркер ____",
		singleBlankMarker: (value: string) =>
			countBlankMarkers(value) <= 1 || "Вопрос должен содержать только один маркер ____",
	},
}

const hasText = (value: string): boolean => /[a-zA-Zа-яА-Я]/.test(value)
const isWithinWordCount = (value: string, min: number, max: number): boolean => {
	const wordCount = formatSpaces(value).split(/\s+/).length
	return wordCount >= min && wordCount <= max
}
const isWithinCharLimit = (value: string, max: number): boolean => value.length <= max
const countBlankMarkers = (value: string): number => {
	const matches = value.match(/____/g)
	return matches ? matches.length : 0
}
const hasBlankMarker = (value: string): boolean => countBlankMarkers(value) > 0
