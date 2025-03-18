import { ChangeEvent, FC, useState } from "react"
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"
import styles from "./Input.module.css"

interface InputProps<T extends Record<string, any>> {
    name: Path<T>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    register?: UseFormRegister<T>
    setValue?: UseFormSetValue<T>
    validationRules?: RegisterOptions<T, Path<T>>
    errors?: FieldError | undefined
    type?: "text" | "email" | "password" // Type определяет тип поля
    className?: string
    onTogglePasswordVisibility?: () => void // Коллбэк для переключения видимости пароля
    isPasswordVisible?: boolean // Состояние видимости пароля
}

const Input: FC<InputProps<any>> = ({
    name,
    placeholder,
    disabled = false,
    clearable = false,
    value: controlledValue,
    onChange: controlledOnChange,
    register,
    setValue,
    validationRules,
    errors,
    type = "text",
    className = "",
    onTogglePasswordVisibility,
    isPasswordVisible = false,
}) => {
    const [localValue, setLocalValue] = useState("")

    const handleClear = () => {
        if (controlledOnChange) {
            controlledOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        }
        if (register && setValue) {
            setValue(name, "")
            setLocalValue("")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (controlledOnChange) {
            controlledOnChange(e)
        }
        if (register) {
            setLocalValue(e.target.value)
        }
    }

    const inputProps = register
        ? {
              ...register(name, {
                  ...validationRules,
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                      handleChange(e)
                  },
              }),
          }
        : {
              value: controlledValue,
              onChange: handleChange,
          }

    const hasValue = register ? localValue.length > 0 : controlledValue !== undefined && controlledValue.length > 0

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type={type === "password" && isPasswordVisible ? "text" : type} // Переключаем тип ввода
                    name={name.toString()}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
                    {...inputProps}
                />
                {clearable && !disabled && hasValue && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className={`${styles.clearButton} ${
                            type === "password" ? "" : styles["clearButton--without-toggle"]
                        }`}>
                        ×
                    </button>
                )}
                {/* Кнопка переключения видимости пароля рендерится только для type="password" */}
                {type === "password" && (
                    <button type="button" onClick={onTogglePasswordVisibility} className={styles.toggleButton}>
                        {isPasswordVisible ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default Input
