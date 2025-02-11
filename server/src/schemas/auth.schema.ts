import { z } from "zod"

export const registrationSchema = z.object({
    body: z.object({
        email: z.string().email("Некорректный email"),
        password: z
            .string()
            .min(3, "Пароль должен быть не менее 3 символов")
            .max(20, "Пароль не должен превышать 20 символов"),
    }),
})

export const loginSchema = z.object({
    body: z.object({
        email: z.string().email("Некорректный email"),
        password: z.string().min(1, "Пароль обязателен"),
    }),
})

export const updateActivationLinkSchema = z.object({
    body: z.object({
        email: z.string().email("Некорректный email"),
    }),
})

export const resetPasswordRequestSchema = z.object({
    body: z.object({
        email: z.string().email("Некорректный email"),
    }),
})

export const verifyResetCodeSchema = z.object({
    body: z.object({
        code: z.string().min(1, "Код сброса не может быть пустым"),
    }),
})

export const resetPasswordSchema = z.object({
    body: z.object({
        code: z.string().min(1, "Код сброса не может быть пустым"),
        newPassword: z.string().min(3, "Новый пароль должен содержать не менее 3 символов"),
    }),
})

export const updatePasswordSchema = z.object({
    body: z.object({
        newPassword: z.string().min(3, "Новый пароль должен содержать не менее 3 символов"),
    }),
})
