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

    const handleClear = () => {
        setValue(name, "")
        setLocalValue("")
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.target.value)
    }

    const inputProps = {
        ...register(name, {
            ...validationRules,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                handleChange(e)
            },
        }),
    }

    const hasValue = localValue.length > 0

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${styles.input} ${className}`}
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

export default ValidatedInput
