import { InputProps } from "@/shared/ui/Input/Base/Input.props"
import {
	Control,
	FieldError,
	Path,
	RegisterOptions,
	UseFormRegister,
	UseFormSetValue,
	UseFormTrigger
} from "react-hook-form"

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
