import { passwordValidationRules } from "@/shared/types/utils/validationRules"
import { ChangeEvent, FC, useEffect, useState } from "react" // Добавим useEffect
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"
import { FiEye, FiEyeOff } from "react-icons/fi"
import styles from "./PasswordInput.module.scss"

export interface PasswordInputProps<T extends Record<string, any>> {
	name: Path<T>
	placeholder?: string
	disabled?: boolean
	className?: string
	register: UseFormRegister<T>
	setValue: UseFormSetValue<T>
	errors?: FieldError | undefined
	clearable?: boolean
	noValidation?: boolean
	label?: string
	trigger: UseFormTrigger<T>
}

const PasswordInput: FC<PasswordInputProps<any>> = ({
	name,
	placeholder,
	disabled = false,
	className = "",
	register,
	setValue,
	errors,
	clearable = false,
	noValidation = false,
	label,
	trigger,
}) => {
	const [localValue, setLocalValue] = useState("")
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const [wasTouched, setWasTouched] = useState(false) // Добавим состояние touched
	const inputId = `input-${name}`

	const passwordValidation: RegisterOptions = noValidation ? { required: "Пароль обязателен" } : passwordValidationRules

	const handleClear = () => {
		setValue(name, "")
		setLocalValue("")
		setWasTouched(true)
		trigger?.(name) // Триггерим валидацию после очистки
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value)
		setWasTouched(true)
		if (errors) trigger(name)
	}

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev)
	}

	const inputProps = {
		...register(name, {
			...passwordValidation,
			onChange: handleChange,
			onBlur: () => {
				setIsFocused(false)
				trigger?.(name) // Триггерим валидацию при потере фокуса
			},
		}),
	}

	// Добавим эффект для инициализации значения
	useEffect(() => {
		const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
		if (input && input.value) {
			setLocalValue(input.value)
		}
	}, [name])

	const hasValue = localValue.length > 0
	const [isFocused, setIsFocused] = useState(false)
	const isActive = isFocused || hasValue

	return (
		<div className={styles.inputWrapper}>
			{label && <label className={styles.label}>{label}</label>}

			<div className={`${styles.inputContainer} ${isActive ? styles.active : ""} ${errors ? styles.error : ""}`}>
				<input
					type={isPasswordVisible ? "text" : "password"}
					disabled={disabled}
					id={inputId}
					placeholder=""
					className={`${styles.input} ${className}`}
					onFocus={() => setIsFocused(true)}
					{...inputProps}
				/>
				<label
					htmlFor={inputId}
					className={styles.placeholder}
				>
					{placeholder}
				</label>
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
				{!disabled && hasValue && (
					<button
						type="button"
						onClick={togglePasswordVisibility}
						className={styles.toggleButton}
						tabIndex={-1}
					>
						{isPasswordVisible ? <FiEyeOff /> : <FiEye />}
					</button>
				)}
				{/* Добавим условие для отображения ошибки */}
				{errors && errors.message && (wasTouched || isFocused) && (
					<div className={styles.errorTooltip}>{errors.message}</div>
				)}
			</div>
		</div>
	)
}

export default PasswordInput
