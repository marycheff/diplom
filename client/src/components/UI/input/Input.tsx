// components/ui/Input/Input.tsx
import { ChangeEvent, useRef } from "react"
import { FieldError, Path, PathValue, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"
import styles from "./Input.module.css"

interface InputProps<T extends Record<string, any>> {
    name?: Path<T>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    register?: UseFormRegister<T>
    validationRules?: RegisterOptions<T, Path<T>>
    errors?: FieldError | undefined
    value?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    setValue?: UseFormSetValue<T>
}

const Input = <T extends Record<string, any>>({
    name,
    placeholder,
    disabled = false,
    clearable = false,
    register,
    validationRules,
    errors,
    value,
    onChange,
    setValue,
}: InputProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClear = () => {
        if (name && setValue) {
            setValue(name, "" as PathValue<T, typeof name>)
        } else if (onChange) {
            onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
        }
    }

    return (
        <div className={styles.inputWrapper}>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    {...(register && name ? register(name, validationRules) : { value, onChange })}
                    placeholder={placeholder}
                    disabled={disabled}
                    ref={inputRef}
                    className={styles.input}
                />
                {clearable && !disabled && inputRef.current?.value && (
                    <button type="button" onClick={handleClear} className={styles.clearButton}>
                        &times;
                    </button>
                )}
            </div>
            {errors && <p className={styles.error}>{errors.message}</p>}
        </div>
    )
}

export default Input
