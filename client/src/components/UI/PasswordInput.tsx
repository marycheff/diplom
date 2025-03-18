import { FC, useState } from "react"
import ClearableInput, { ClearableInputProps } from "@/components/ui/Input/ClearableInput"
import { RegisterOptions } from "react-hook-form"
import styles from "./PasswordInput.module.css"

interface PasswordInputProps extends ClearableInputProps {
    validationRules?: RegisterOptions
}

// Расширенная валидация пароля
export const passwordValidation: RegisterOptions = {
    required: "Пароль обязателен",
    minLength: {
        value: 8,
        message: "Пароль должен содержать минимум 8 символов",
    },
    maxLength: {
        value: 32,
        message: "Пароль не должен превышать 32 символа",
    },
    validate: {
        hasUpperCase: value => /[A-Z]/.test(value) || "Пароль должен содержать хотя бы одну заглавную букву",
        hasLowerCase: value => /[a-z]/.test(value) || "Пароль должен содержать хотя бы одну строчную букву",
        hasNumber: value => /\d/.test(value) || "Пароль должен содержать хотя бы одну цифру",
        hasSpecialChar: value =>
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
            "Пароль должен содержать хотя бы один специальный символ",
    },
}

const PasswordInput: FC<PasswordInputProps> = ({ validationRules = passwordValidation, ...props }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className={styles.passwordContainer}>
            <ClearableInput {...props} type={isVisible ? "text" : "password"} validationRules={validationRules} />
            <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className={styles.toggleButton}
                aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}>
                {isVisible ? "👁️" : "🙈"}
            </button>
        </div>
    )
}

export default PasswordInput
