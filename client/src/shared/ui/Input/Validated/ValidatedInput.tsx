import { InputProps } from "@/shared/ui/Input/Base/Input"
import { ChangeEvent, FC, useEffect, useState } from "react"
import {
	Control,
	Controller,
	FieldError,
	Path,
	RegisterOptions,
	UseFormRegister,
	UseFormSetValue,
	UseFormTrigger,
} from "react-hook-form"
import { PatternFormat } from "react-number-format"
import styles from "./ValidatedInput.module.scss"

export interface ValidatedInputProps<T extends Record<string, any>> extends Omit<InputProps, "value" | "onChange"> {
	register: UseFormRegister<T>
	setValue: UseFormSetValue<T>
	validationRules?: RegisterOptions<T, Path<T>>
	errors?: FieldError | undefined
	floatingLabel?: boolean
	defaultValue?: string
	multiline?: boolean
	rows?: number
	mask?: string
	maskChar?: string
	control?: Control<T>
	trigger: UseFormTrigger<T>
	inputRef?: (element: HTMLInputElement | HTMLTextAreaElement | null) => void
}

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
	inputRef,
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const [inputValue, setInputValue] = useState(defaultValue)
	const [wasTouched, setWasTouched] = useState(false)
	const [isTooltipVisible, setIsTooltipVisible] = useState(true)
	const inputId = `input-${name}`

	const { ref, onChange, onBlur, ...registeredInput } = register(name, validationRules)

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		onChange(e) // Вызов оригинального обработчика onChange из register
		setInputValue(e.target.value)
		setWasTouched(true)
		if (errors) {
			trigger(name)
			setIsTooltipVisible(true)
		}
	}

	const handleBlur = (e: any) => {
		onBlur(e) // Вызов оригинального обработчика onBlur из register для запуска валидации
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
			<div className={`${styles.inputContainer} ${shouldFloat ? styles.active : ""} ${errors ? styles.error : ""}`}>
				{multiline ? (
					<textarea
						{...registeredInput}
						ref={(element) => {
							if (element && element.value) {
								setInputValue(element.value)
							}
							ref(element)
							// Передача ссылки на элемент через inputRef, если он предоставлен
							if (inputRef) {
								inputRef(element)
							}
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
								onValueChange={(values) => {
									field.onChange(values.formattedValue)
									setInputValue(values.formattedValue)
									if (errors) trigger(name)
								}}
								onFocus={() => setIsFocused(true)}
								onBlur={() => {
									field.onBlur()
									setIsFocused(false)
								}}
								id={inputId}
								disabled={disabled}
								className={styles.input}
								allowEmptyFormatting={isFocused} // Показ маски при фокусе, даже если поле пустое
							/>
						)}
					/>
				) : (
					<input
						{...registeredInput}
						ref={(element) => {
							if (element && element.value) {
								setInputValue(element.value)
							}
							ref(element)
							// Передача ссылки на элемент через inputRef, если он предоставлен
							if (inputRef) {
								inputRef(element)
							}
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
						className={styles.clearButton}
						onClick={handleClear}
						tabIndex={-1}
					>
						×
					</button>
				)}
				{errors && errors.message && (wasTouched || isFocused) && isTooltipVisible && (
					<div
						className={styles.errorTooltip}
						onClick={() => setIsTooltipVisible(false)}
					>
						{errors.message}
					</div>
				)}
			</div>
		</div>
	)
}

export default ValidatedInput
