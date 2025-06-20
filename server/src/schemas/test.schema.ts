import { PreTestUserData } from "@/types"
import { isValidUUID } from "@/utils/validator"
import { z } from "zod"

export const testIdSchema = z.object({
	params: z.object({
		testId: z.string().min(1, "ID теста обязательно").refine(isValidUUID, {
			message: "Некорректный ID теста",
		}),
	}),
})

export const shortInfoSchema = z.object({
	body: z.object({
		title: z.string().min(1, "Название теста обязательно").max(100, "Максимальная длина названия 100 символов"),
		description: z.string().max(500, "Максимальная длина описания 500 символов").optional(),
	}),
})

export const answerSchema = z.object({
	text: z.string().min(1, "Текст ответа обязателен").max(255, "Максимальная длина ответа 255 символов"),
	isCorrect: z.boolean(),
})

export const questionSchema = z.object({
	text: z.string().min(1, "Текст вопроса обязателен").max(500, "Максимальная длина 500 символов"),
	type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "TEXT_INPUT", "FILL_IN_THE_BLANK", "SEQUENCE"]),

	answers: z
		.array(answerSchema)
		.min(1, "Должен быть хотя бы один ответ")
		.max(10, "В одном вопросе может быть максимум 10 вариантов ответов")
		.refine((answers) => answers.some((a) => a.isCorrect), { message: "Хотя бы один ответ должен быть правильным" }),
})
const questionsSchema = z.array(questionSchema).max(60, "Максимум 60 вопросов")
// .min(1, "Должен быть хотя бы один вопрос")

// Полная схема для upsert операции
export const upsertQuestionsSchema = z.object({
	params: z.object({
		testId: z.string().uuid("Некорректный ID теста"),
	}),
	body: z.object({
		questions: questionsSchema,
	}),
})

// Начало попытки
export const startAttemptSchema = z.object({
	params: z.object({
		testId: z.string().min(1, "ID теста обязательно").refine(isValidUUID, {
			message: "ID теста должен быть корректным UUID",
		}),
	}),
	body: z
		.object({
			userData: z
				.object({
					[PreTestUserData.LastName]: z.string().min(1, "Фамилия не может быть пустой").optional(),
					[PreTestUserData.FirstName]: z.string().min(1, "Имя не может быть пустым").optional(),
					[PreTestUserData.Patronymic]: z.string().min(1, "Отчество не может быть пустым").optional(),
					[PreTestUserData.Gender]: z
						.enum(["male", "female"], {
							errorMap: () => ({ message: "Пол должен быть указан как 'male' или 'female'" }),
						})
						.optional(),
					[PreTestUserData.BirthDate]: z
						.string()
						.regex(/^\d{4}-\d{2}-\d{2}$/, {
							message: "Дата рождения должна быть в формате YYYY-MM-DD",
						})
						.optional(),
					[PreTestUserData.Age]: z
						.number({
							required_error: "Возраст должен быть числом",
							invalid_type_error: "Возраст должен быть числом",
						})
						.min(0, "Возраст не может быть отрицательным")
						.max(150, "Возраст не может быть больше 150")
						.optional(),
					[PreTestUserData.City]: z.string().min(1, "Город не может быть пустым").optional(),
					[PreTestUserData.Country]: z.string().min(1, "Страна не может быть пустой").optional(),
					[PreTestUserData.Phone]: z.string().min(1, "Телефон не может быть пустым").optional(),
					[PreTestUserData.Email]: z.string().email("Неверный формат email").optional(),
					[PreTestUserData.School]: z.string().min(1, "Название школы не может быть пустым").optional(),
					[PreTestUserData.Grade]: z.string().min(1, "Класс не может быть пустым").optional(),
					[PreTestUserData.Group]: z.string().min(1, "Группа не может быть пустой").optional(),
				})
				.strict("Обнаружены недопустимые поля в userData")
				.optional(),
		})
		.optional(),
})

// Сохранение ответа
export const saveAnswersSchema = z.object({
	params: z.object({
		attemptId: z.string().min(1, "ID попытки обязательно").refine(isValidUUID, {
			message: "ID попытки должен быть корректным UUID",
		}),
	}),
	body: z.object({
		answers: z.array(
			z.object({
				questionId: z.string().min(1, "ID вопроса обязательно").refine(isValidUUID, {
					message: "ID вопроса должен быть корректным UUID",
				}),
				answersIds: z
					.array(
						z.string().min(1, "ID ответа не может быть пустым").refine(isValidUUID, {
							message: "ID ответа должен быть корректным UUID",
						})
					)
					.refine((val) => new Set(val).size === val.length, {
						message: "Массив answersIds содержит дублирующиеся идентификаторы",
					})
					.optional(),
				textAnswer: z.string().optional().nullable(),
				timeSpent: z.number().optional().default(0),
				answeredAt: z
					.string()
					.or(z.date())
					.optional()
					.transform((val) => (val ? new Date(val) : undefined)),
			})
		),
		// .nonempty("Должен быть указан хотя бы один ответ"),
	}),
})
// Завершение попытки
export const completeAttemptSchema = z.object({
	params: z.object({
		attemptId: z.string().min(1, "ID попытки обязательно").refine(isValidUUID, {
			message: "ID попытки должен быть корректным UUID",
		}),
	}),
})

export const testSettingsSchema = z.object({
	body: z
		.object({
			requireRegistration: z.boolean().optional(),
			inputFields: z
				.array(z.nativeEnum(PreTestUserData))
				.optional()
				.refine((fields) => {
					if (!fields) return true
					return fields.every((f) => Object.values(PreTestUserData).includes(f))
				}, "Недопустимое поле в inputFields")
				.refine((fields) => {
					if (!fields) return true
					return new Set(fields).size === fields.length
				}, "Массив inputFields содержит дублирующиеся значения"),
			shuffleQuestions: z.boolean().optional(),
			shuffleAnswers: z.boolean().optional(),
			showDetailedResults: z.boolean().optional(),
			allowRetake: z.boolean().optional(),
			retakeLimit: z.number().min(1).max(20).nullable().optional(),
			timeLimit: z.number().nullable().optional(),
		})
		.strict("Обнаружены недопустимые поля в настройках теста")
		.refine((data) => Object.keys(data).length > 0, {
			message: "Должно быть передано хотя бы одно поле настроек",
		}),
})

export const getTestSnapshotSchema = z.object({
	params: z.object({
		snapshotId: z.string().min(1, "ID снимка обязательно").refine(isValidUUID, {
			message: "ID снимка должен быть корректным UUID",
		}),
	}),
})
export const getAttemptSchema = z.object({
	params: z.object({
		attemptId: z.string().min(1, "ID попытки обязательно").refine(isValidUUID, {
			message: "ID попытки должен быть корректным UUID",
		}),
	}),
})

// Схема для ответа

// Схема вопроса с уточнениями в зависимости от типа

// export const testSettingsSchema = z
//     .object({
//         requireRegistration: z.boolean().optional(),
//         inputFields: z.array(z.enum(Object.values(PreTestUserData) as [string, ...string[]])).optional(),
//         requiredFields: z
//             .array(z.enum(Object.values(PreTestUserData) as [string, ...string[]]))
//             .optional()
//             .refine(fields => {
//                 if (!fields) return true
//                 return fields.every(f => Object.values(PreTestUserData).includes(f))
//             }, "Недопустимое поле в requiredFields"),
//         showDetailedResults: z.boolean().optional(),
//         timeLimit: z.number().min(0).nullable().optional(),
//     })
//     .refine(data => {
//         if (data.requiredFields && data.inputFields) {
//             return data.requiredFields.every(f => data.inputFields!.includes(f))
//         }
//         return true
//     }, "Обязательные поля должны быть включены в inputFields")
