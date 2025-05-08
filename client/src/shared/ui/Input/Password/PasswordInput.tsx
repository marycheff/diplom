import { PasswordInputProps } from "@/shared/ui/Input/Password/PasswordInput.props"
import { ChangeEvent, FC, useState } from "react"
import { RegisterOptions } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"
import styles from "./PasswordInput.module.scss"
const PasswordInput: FC<PasswordInputProps<any>> = ({
    name,
    placeholder,
    disabled = false,
    className = "",
    register,
    setValue,
    errors,
    clearable = false,
    noValidation = false,
    label,
}) => {
    const [localValue, setLocalValue] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const inputId = `input-${name}`

    // Делаем валидацию опциональной
    const passwordValidation: RegisterOptions = noValidation
        ? { required: "Пароль обязателен" }
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev)
    }

    const inputProps = {
        ...register(name, {
            ...passwordValidation,
            onChange: handleChange,
            onBlur: () => {
                setIsFocused(false)
            },
        }),
    }

    const hasValue = localValue.length > 0
    const [isFocused, setIsFocused] = useState(false)
    const isActive = isFocused || hasValue

    return (
        <div className={styles.inputWrapper}>
            <label className={styles.label}>{label}</label>
            <div className={`${styles.inputContainer} ${isActive ? styles.active : ""}`}>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    disabled={disabled}
                    id={inputId}
                    placeholder=""
                    className={`${styles.input} ${className}`}
                    onFocus={() => setIsFocused(true)}
                    {...inputProps}
                />
                <label htmlFor={inputId} className={styles.placeholder}>
                    {placeholder}
                </label>
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton} tabIndex={-1}>
                        &times;
                    </button>
                )}
                {!disabled && hasValue && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className={styles.toggleButton}
                        tabIndex={-1}>
                        {isPasswordVisible ? <FiEyeOff /> : <FiEye />}
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default PasswordInput
