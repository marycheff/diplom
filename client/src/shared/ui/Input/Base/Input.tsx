import { ChangeEvent, FC, InputHTMLAttributes, KeyboardEvent, useState } from "react"
import styles from "./Input.module.scss"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	value?: string
	placeholder?: string
	disabled?: boolean
	type?: "text" | "email" | "password" | "number" | "tel" | "date"
	className?: string
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	clearable?: boolean
	showToggle?: boolean
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
	floatingLabel?: boolean
}

export const Input: FC<InputProps> = ({
	name,
	value = "",
	placeholder,
	disabled = false,
	type = "text",
	className = "",
	onChange,
	clearable = false,
	onKeyDown,
	floatingLabel = true,
	...props
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const inputId = `input-${name}`
	const handleClear = () => {
		if (onChange) {
			onChange({ target: { value: "" } } as ChangeEvent<HTMLInputElement>)
		}
	}

	const hasValue = value.length > 0
	const isActive = isFocused || hasValue

	return (
		<div className={styles.inputWrapper}>
			<div className={`${styles.inputContainer} ${floatingLabel && isActive ? styles.active : ""}`}>
				<input
					type={type}
					name={name}
					value={value}
					// Использование placeholder только если не используется floating label
					placeholder={floatingLabel ? "" : placeholder}
					disabled={disabled}
					className={`${styles.input} ${className}`}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					id={inputId}
					{...props}
				/>
				{/* Отображение label только если используется floating label */}
				{floatingLabel && (
					<label
						htmlFor={inputId}
						className={styles.placeholder}
					>
						{placeholder}
					</label>
				)}
				{clearable && !disabled && hasValue && (
					<button
						type="button"
						onClick={handleClear}
						className={styles.clearButton}
						tabIndex={-1}
					>
						&times;
					</button>
				)}
			</div>
		</div>
	)
}

export default Input
