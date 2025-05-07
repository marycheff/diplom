import { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from "react"

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
