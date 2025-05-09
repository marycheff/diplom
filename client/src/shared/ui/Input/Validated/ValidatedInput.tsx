import { ValidatedInputProps } from "@/shared/ui/Input/Validated/ValidatedInput.props"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
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
    mask,
    maskChar = "_",
    control,
    trigger,
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState(defaultValue)
    const inputId = `input-${name}`

    const { ref, onChange, onBlur, ...registeredInput } = register(name, validationRules)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e) // Вызываем оригинальный обработчик onChange из register
        setInputValue(e.target.value)
        if (errors) trigger(name)
    }

    const handleBlur = (e: any) => {
        onBlur(e) // Вызываем оригинальный обработчик onBlur из register для запуска валидации
        setIsFocused(false)
    }

    useEffect(() => {
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
                        id={inputId}
                        disabled={disabled}
                        className={`${styles.input} ${styles.textarea}`}
                        onFocus={() => setIsFocused(true)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={name}
                        rows={rows}
                        maxLength={400}
                    />
                ) : mask ? (
                    <Controller
                        name={name}
                        control={control}
                        rules={validationRules}
                        render={({ field }) => (
                            <PatternFormat
                                format={mask}
                                mask={maskChar}
                                value={field.value || ""}
                                onValueChange={values => {
                                    field.onChange(values.formattedValue)
                                    setInputValue(values.formattedValue)
                                    if (errors) trigger(name)
                                }}
                                onFocus={() => setIsFocused(true)}
                                onBlur={e => {
                                    field.onBlur()
                                    setIsFocused(false)
                                }}
                                id={inputId}
                                disabled={disabled}
                                className={styles.input}
                                allowEmptyFormatting={isFocused} // Показываем маску при фокусе, даже если поле пустое
                            />
                        )}
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
                        id={inputId}
                        type={type}
                        disabled={disabled}
                        className={styles.input}
                        onFocus={() => setIsFocused(true)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={name}
                    />
                )}
                {floatingLabel && (
                    <label htmlFor={inputId} className={styles.placeholder}>
                        {placeholder}
                    </label>
                )}
                {clearable && !disabled && hasValue && (
                    <button type="button" className={styles.clearButton} onClick={handleClear} tabIndex={-1}>
                        ×
                    </button>
                )}
            </div>
            {errors && errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default ValidatedInput
