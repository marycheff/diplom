import { ValidatedInputProps } from "@/components/ui/Input/Validated/ValidatedInput.props"
import { ChangeEvent, FC, useState } from "react"
import styles from "./ValidatedInput.module.scss"

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
}) => {
    const [localValue, setLocalValue] = useState("")
    const [isFocused, setIsFocused] = useState(false)

    const handleClear = () => {
        setValue(name, "")
        setLocalValue("")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    // Модифицируем регистрацию для включения обработчиков фокуса
    const inputProps = {
        ...register(name, {
            ...validationRules,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e)
            },
            onBlur: () => {
                setIsFocused(false)
            },
        }),
    }

    const hasValue = localValue.length > 0
    const isActive = isFocused || hasValue

    return (
        <div className={styles.inputWrapper}>
            <div className={`${styles.inputContainer} ${isActive ? styles.active : ""}`}>
                <input
                    type={type}
                    placeholder=""
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
                    onFocus={() => setIsFocused(true)}
                    id={name}
                    {...inputProps}
                />
                <label htmlFor={name} className={styles.placeholder}>
                    {placeholder}
                </label>
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        &times;
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default ValidatedInput
