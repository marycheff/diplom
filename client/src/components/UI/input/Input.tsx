import { FC } from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

interface InputProps {
    placeholder: string
    name: string
    register: UseFormRegister<any>
    validationRules: any
    errors: FieldErrors
}

const Input: FC<InputProps> = ({ placeholder, name, register, validationRules, errors }) => {
    return (
        <div>
            <input type="text" placeholder={placeholder} {...register(name, validationRules)} />
            {errors[name] && <p>{String(errors[name]?.message)}</p>}
        </div>
    )
}

export default Input
