import { PreTestUserData } from "@/types/inputFields"
import { z } from "zod"

export const createTestSchema = z.object({
    body: z.object({
        title: z.string().min(1, "Название теста обязательно").max(255, "Максимальная длина 255 символов"),
        description: z.string().max(1000, "Максимальная длина 1000 символов").optional(),
    }),
})

export const answerSchema = z.object({
    text: z.string().min(1, "Текст ответа обязателен").max(255, "Максимальная длина 255 символов"),
    isCorrect: z.boolean(),
})

export const questionSchema = z.object({
    text: z.string().min(1, "Текст вопроса обязателен").max(500, "Максимальная длина 500 символов"),
    answers: z
        .array(answerSchema)
        .min(1, "Должен быть хотя бы один ответ")
        .refine(answers => answers.some(a => a.isCorrect), { message: "Хотя бы один ответ должен быть правильным" }),
})

export const updateTestSchema = z.object({
    body: z.object({
        questions: z.array(questionSchema).min(1),
    }),
})

export const updateQuestionSchema = z.object({
    body: z.object({
        text: z.string().min(1, "Текст вопроса обязателен").max(500, "Максимальная длина 500 символов"),
        answers: z
            .array(answerSchema)
            .min(1, "Должен быть хотя бы один ответ")
            .refine(answers => answers.some(a => a.isCorrect), {
                message: "Хотя бы один ответ должен быть правильным",
            }),
    }),
})

// Начало попытки
export const startTestAttemptSchema = z.object({
    params: z.object({
        testId: z.string().min(1, "ID теста обязательно"),
    }),
    body: z.object({
        userData: z
            .object({
                name: z.string().optional(),
                email: z.string().email().optional(),
            })
            .optional(),
    }),
})

// Сохранение ответа
export const saveAnswerSchema = z.object({
    params: z.object({
        attemptId: z.string().min(1, "ID попытки обязательно"),
    }),
    body: z.object({
        questionId: z.string().min(1, "ID вопроса обязательно"),
        answerId: z.string().min(1, "ID ответа обязательно"),
    }),
})

// Завершение попытки
export const completeTestAttemptSchema = z.object({
    params: z.object({
        attemptId: z.string().min(1, "ID попытки обязательно"),
    }),
})

export const testSettingsSchema = z
    .object({
        requireRegistration: z.boolean().optional(),
        inputFields: z.array(z.nativeEnum(PreTestUserData)).optional(),
        requiredFields: z
            .array(z.nativeEnum(PreTestUserData))
            .optional()
            .refine(fields => {
                if (!fields) return true
                return fields.every(f => Object.values(PreTestUserData).includes(f))
            }, "Недопустимое поле в requiredFields"),
        showDetailedResults: z.boolean().optional(),
    })
    .refine(data => {
        if (data.requiredFields && data.inputFields) {
            return data.requiredFields.every(f => data.inputFields!.includes(f))
        }
        return true
    }, "Обязательные поля должны быть включены в inputFields")
