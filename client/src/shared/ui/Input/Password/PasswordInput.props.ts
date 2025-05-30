import { FieldError, Path, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"
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
