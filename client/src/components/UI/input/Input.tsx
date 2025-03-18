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
    setValue?: UseFormSetValue<T> // Добавляем setValue для управления значением
    validationRules?: RegisterOptions<T, Path<T>>
    errors?: FieldError | undefined
    type?: "text" | "email" | "password"
}

const Input: FC<InputProps<any>> = ({
    name,
    placeholder,
    disabled = false,
    clearable = false,
    value: controlledValue,
    onChange: controlledOnChange,
    register,
    setValue, // Добавляем в пропсы
    validationRules,
    errors,
    type = "text",
}) => {
    const [localValue, setLocalValue] = useState("")

    const handleClear = () => {
        if (controlledOnChange) {
            controlledOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        }
        if (register && setValue) {
            setValue(name, "") // Очищаем значение через react-hook-form
            setLocalValue("") // Обновляем локальное состояние для отображения
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (controlledOnChange) {
            controlledOnChange(e)
        }
        if (register) {
            setLocalValue(e.target.value) // Только обновляем локальное состояние для отображения
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
                    type={type}
                    name={name.toString()}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={styles.input}
                    {...inputProps}
                />
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        ×
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default Input
