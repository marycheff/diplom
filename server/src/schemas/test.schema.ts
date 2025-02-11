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
