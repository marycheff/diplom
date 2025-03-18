import { ChangeEvent, FC } from "react"
import styles from "./SimpleInput.module.css"

interface SimpleInputProps {
    name: string
    value?: string
    placeholder?: string
    disabled?: boolean
    type?: "text" | "email" | "password"
    className?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clearable?: boolean
    showToggle?: boolean
}

const SimpleInput: FC<SimpleInputProps> = ({
    name,
    value = "",
    placeholder,
    disabled = false,
    type = "text",
    className = "",
    onChange,
    clearable = false,
}) => {
    const handleClear = () => {
        if (onChange) {
            onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        }
    }

    const hasValue = value.length > 0

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
                    onChange={onChange}
                />
                {clearable && !disabled && hasValue && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        ×
                    </button>
                )}
            </div>
        </div>
    )
}

export default SimpleInput
