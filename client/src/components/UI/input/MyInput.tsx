import React from "react"
import { FieldErrors, UseFormRegister } from "react-hook-form"

interface MyInputProps {
    placeholder: string
    name: string
    register: UseFormRegister<any>
    validationRules: any
    errors: FieldErrors
}

const MyInput: React.FC<MyInputProps> = ({ placeholder, name, register, validationRules, errors }) => {
    return (
        <div>
            <input type='text' placeholder={placeholder} {...register(name, validationRules)} />
            {errors[name] && <p>{String(errors[name]?.message)}</p>}
        </div>
    )
}

export default MyInput
