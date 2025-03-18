import { ChangeEvent, FC, useState } from "react"
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"
import styles from "./ValidatedInput.module.css"

interface ValidatedInputProps<T extends Record<string, any>> {
    name: Path<T>
    placeholder?: string
    disabled?: boolean
    type?: "text" | "email" | "password"
    className?: string
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
    validationRules?: RegisterOptions<T, Path<T>>
    errors?: FieldError | undefined
    clearable?: boolean // Добавляем поддержку кнопки очистки
    showToggle?: boolean // Добавляем поддержку переключения видимости пароля
}

const ValidatedInput: FC<ValidatedInputProps<any>> = ({
    name,
    placeholder,
    disabled = false,
    type = "text",
    className = "",
    register,
    setValue,
    validationRules,
    errors,
    clearable = false,
    showToggle = false,
}) => {
    const [localValue, setLocalValue] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const handleClear = () => {
        setValue(name, "") // Очищаем значение через react-hook-form
        setLocalValue("") // Обновляем локальное состояние для отображения
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const inputProps = {
        ...register(name, {
            ...validationRules,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e)
            },
        }),
    }

    const inputType = type === "password" && isPasswordVisible ? "text" : type
    const hasValue = localValue.length > 0

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
                    {...inputProps}
                />
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        ×
                    </button>
                )}
                {type === "password" && showToggle && (
                    <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
                        {isPasswordVisible ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default ValidatedInput
