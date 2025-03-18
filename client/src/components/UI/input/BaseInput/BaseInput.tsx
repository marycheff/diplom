import { ChangeEvent, FC, useState } from "react"
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"
import styles from "./BaseInput.module.css"

export interface BaseInputProps<T extends Record<string, any>> {
    name: Path<T> // Используем Path для типизации с react-hook-form
    value?: string
    placeholder?: string
    disabled?: boolean
    type?: "text" | "email" | "password"
    className?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    register?: UseFormRegister<T> // Поддержка register из react-hook-form
    setValue?: UseFormSetValue<T> // Для управления значением
    validationRules?: RegisterOptions<T, Path<T>> // Правила валидации
    errors?: FieldError | undefined // Ошибки валидации
}

const BaseInput: FC<BaseInputProps<any>> = ({
    name,
    value: controlledValue,
    placeholder,
    disabled = false,
    type = "text",
    className = "",
    onChange: controlledOnChange,
    register,
    setValue,
    validationRules,
    errors,
}) => {
    const [localValue, setLocalValue] = useState("") // Локальное состояние для отслеживания значения при использовании register

    // Обработчик очистки
    const handleClear = () => {
        if (controlledOnChange) {
            controlledOnChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        }
        if (register && setValue) {
            setValue(name, "") // Очищаем значение через react-hook-form
            setLocalValue("") // Обновляем локальное состояние
        }
    }

    // Обработчик изменения значения
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (controlledOnChange) {
            controlledOnChange(e)
        }
        if (register) {
            setLocalValue(e.target.value) // Обновляем локальное состояние для отображения
        }
    }

    // Определяем пропсы для input в зависимости от использования register
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

    // Определяем наличие значения для логики clearable
    const hasValue = register ? localValue.length > 0 : controlledValue !== undefined && controlledValue.length > 0

    return (
        <div className={styles.baseInputWrapper}>
            <input
                type={type}
                name={name.toString()}
                placeholder={placeholder}
                disabled={disabled}
                className={`${styles.baseInput} ${className}`}
                {...inputProps}
            />
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default BaseInput
