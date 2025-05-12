import { RegisterOptions } from "react-hook-form"

export const emailValidationRules: RegisterOptions = {
    required: "Email обязателен",
    pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Введите корректный email",
    },
}
