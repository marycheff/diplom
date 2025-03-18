import { InputProps } from "@/components/ui/Input/Base/Input.props"
import { ChangeEvent, FC } from "react"
import styles from "./Input.module.scss"

export const Input: FC<InputProps> = ({
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

export default Input
