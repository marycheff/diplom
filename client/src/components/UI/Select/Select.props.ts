import { UseFormRegister } from "react-hook-form"

export type SelectProps = {
    name: string
    options: Option[]
    register: UseFormRegister<any>
    value?: string
    error?: boolean
    label?: string
    required?: boolean
}
type Option = {
    value: string
    label?: string
}
