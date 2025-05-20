import { z } from "zod"

export const generateAnswersSchema = z.object({
    body: z.object({
        question: z
            .string({
                required_error: "Вопрос обязателен",
            })
            .min(3, "Вопрос должен быть не короче 3 символов"),
        answer: z
            .string({
                required_error: "Правильный ответ обязателен",
            })
            .min(1, "Ответ не может быть пустым"),
        numOfAnswers: z
            .number({
                required_error: "Количество ответов обязательно",
                invalid_type_error: "Количество ответов должно быть числом",
            })
            .int("Количество ответов должно быть целым числом")
            .min(1, "Минимум 1 ответ")
            .max(10, "Максимум 10 ответов"),
    }),
})
