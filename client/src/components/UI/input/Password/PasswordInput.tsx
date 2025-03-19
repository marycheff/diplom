import { PasswordInputProps } from "@/components/ui/Input/Password/PasswordInput.props"
import { FC, useState } from "react"
import { RegisterOptions } from "react-hook-form"
import styles from "./PasswordInput.module.scss"

const PasswordInput: FC<PasswordInputProps<any>> = ({
    name,
    placeholder = "Пароль",
    disabled = false,
    className = "",
    register,
    setValue,
    errors,
    clearable = false,
    noValidation = false, // Новая опция
}) => {
    const [localValue, setLocalValue] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    // Делаем валидацию опциональной
    const passwordValidation: RegisterOptions = noValidation
        ? { required: "Пароль обязателен"}
        : {
              required: "Пароль обязателен",
              minLength: {
                  value: 3,
                  message: "Пароль должен содержать минимум 3 символа",
              },
              maxLength: {
                  value: 32,
                  message: "Пароль не должен превышать 32 символа",
              },
          }

    // Остальной код без изменений
    const handleClear = () => {
        setValue(name, "")
        setLocalValue("")
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const inputProps = {
        ...register(name, {
            ...passwordValidation,
            onChange: handleChange,
        }),
    }

    const hasValue = localValue.length > 0

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
                    {...inputProps}
                />
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        &times;
                    </button>
                )}
                {!disabled && hasValue && (
                    <button type="button" onClick={togglePasswordVisibility} className={styles.toggleButton}>
                        {isPasswordVisible ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {/* Показываем ошибки только если валидация включена */}
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default PasswordInput
