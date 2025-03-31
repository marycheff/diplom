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
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState("")

    // Синхронизация с внешними изменениями значения
    const { ref, ...registeredInput } = register(name, {
        ...validationRules,
        onChange: (e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
        },
        onBlur: () => setIsFocused(false),
    })

    const handleClear = () => {
        setValue(name, "")
        setInputValue("")
    }

    const hasValue = inputValue.length > 0
    const shouldFloat = hasValue || isFocused

    return (
        <div className={`${styles.inputWrapper} ${className}`}>
            <div className={`${styles.inputContainer} ${shouldFloat ? styles.active : ""}`}>
                <input
                    {...registeredInput}
                    ref={ref}
                    type={type}
                    disabled={disabled}
                    className={styles.input}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    id={name}
                />
                <label htmlFor={name} className={styles.placeholder}>
                    {placeholder}
                </label>

                {clearable && !disabled && hasValue && (
                    <button type="button" className={styles.clearButton} onClick={handleClear}>
                        &times;
                    </button>
                )}
            </div>

            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}
export default ValidatedInput
