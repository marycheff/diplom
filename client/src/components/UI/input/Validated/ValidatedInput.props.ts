import { InputProps } from "@/components/ui/Input/Base/Input.props"
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"

export interface ValidatedInputProps<T extends Record<string, any>> extends Omit<InputProps, "value" | "onChange"> {
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
    validationRules?: RegisterOptions<T, Path<T>>
    errors?: FieldError | undefined
    floatingLabel?: boolean
}
