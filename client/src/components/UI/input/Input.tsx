import { FC } from "react"

import BaseInput, { BaseInputProps } from "@/components/ui/Input/BaseInput/BaseInput"
import styles from "./Input.module.css"

interface InputProps<T extends Record<string, any>> extends BaseInputProps<T> {
    clearable?: boolean
    onTogglePasswordVisibility?: () => void // Коллбэк для переключения видимости пароля
    isPasswordVisible?: boolean // Состояние видимости пароля
}

const Input: FC<InputProps<any>> = ({
    name,
    placeholder,
    disabled = false,
    clearable = false,
    value,
    onChange,
    register,
    setValue,
    validationRules,
    errors,
    type = "text",
    className = "",
    onTogglePasswordVisibility,
    isPasswordVisible = false,
}) => {
    // Определяем тип ввода в зависимости от видимости пароля
    const inputType = type === "password" && isPasswordVisible ? "text" : type

    // Используем BaseInput как основу
    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <BaseInput
                    name={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    register={register}
                    setValue={setValue}
                    validationRules={validationRules}
                    errors={errors}
                    className={className}
                />
                {clearable && !disabled && (
                    <button
                        type="button"
                        onClick={() => setValue?.(name, "")} // Очистка через setValue
                        className={`${styles.clearButton} ${
                            type === "password" ? "" : styles["clearButton--without-toggle"]
                        }`}>
                        ×
                    </button>
                )}
                {type === "password" && (
                    <button type="button" onClick={onTogglePasswordVisibility} className={styles.toggleButton}>
                        {isPasswordVisible ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Input
