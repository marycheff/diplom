import Input from "@/components/ui/Input/Input"
import { FC, useState } from "react"
import { FieldError, Path, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"

interface PasswordInputProps<T extends Record<string, any>> {
    name: Path<T>
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    register: UseFormRegister<T>
    setValue: UseFormSetValue<T>
    errors?: FieldError | undefined
}

const passwordValidation: RegisterOptions = {
    required: "Пароль обязателен",
    minLength: {
        value: 3,
        message: "Пароль должен содержать минимум 3 символа",
    },
    maxLength: {
        value: 32,
        message: "Пароль не должен превышать 32 символа",
    },
}

const PasswordInput: FC<PasswordInputProps<any>> = ({
    name,
    placeholder = "Пароль",
    disabled = false,
    clearable = true,
    register,
    setValue,
    errors,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev)
    }

    return (
        <Input
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            clearable={clearable}
            register={register}
            setValue={setValue}
            errors={errors}
            validationRules={passwordValidation}
            type="password"
            onTogglePasswordVisibility={togglePasswordVisibility} 
            isPasswordVisible={isPasswordVisible} 
        />
    )
}

export default PasswordInput
