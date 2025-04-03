import { ValidatedInputProps } from "@/shared/ui/Input/Validated/ValidatedInput.props"
import { ChangeEvent, FC, useEffect, useState } from "react"
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
    floatingLabel = true,
    defaultValue = "",
    multiline = false,
    rows = 1,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)

    // Получаем текущее значение поля из react-hook-form
    const { ref, ...registeredInput } = register(name, {
        ...validationRules,
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setInputValue(e.target.value)
        },
        onBlur: () => setIsFocused(false),
    })

    // Синхронизируем значение из формы с локальным состоянием
    useEffect(() => {
        // Получаем текущее значение из DOM-элемента
        const selector = multiline ? `textarea[name="${name}"]` : `input[name="${name}"]`
        const input = document.querySelector(selector) as HTMLInputElement | HTMLTextAreaElement
        if (input && input.value) {
            setInputValue(input.value)
        }
    }, [name, multiline])

    const handleClear = () => {
        setValue(name, "")
        setInputValue("")
    }

    const hasValue = inputValue.length > 0
    const shouldFloat = hasValue || isFocused

    return (
        <div className={`${styles.inputWrapper} ${className}`}>
            <div className={`${styles.inputContainer} ${shouldFloat ? styles.active : ""}`}>
                {multiline ? (
                    <textarea
                        {...registeredInput}
                        ref={element => {
                            if (element && element.value) {
                                setInputValue(element.value)
                            }
                            ref(element)
                        }}
                        disabled={disabled}
                        className={`${styles.input} ${styles.textarea}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        name={name}
                        rows={rows}
                    />
                ) : (
                    <input
                        {...registeredInput}
                        ref={element => {
                            if (element && element.value) {
                                setInputValue(element.value)
                            }
                            ref(element)
                        }}
                        type={type}
                        disabled={disabled}
                        className={styles.input}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        name={name}
                    />
                )}
                {floatingLabel && (
                    <label htmlFor={name} className={styles.placeholder}>
                        {placeholder}
                    </label>
                )}

                {clearable && !disabled && hasValue && (
                    <button type="button" className={styles.clearButton} onClick={handleClear} tabIndex={-1}>
                        &times;
                    </button>
                )}
            </div>

            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}
export default ValidatedInput
