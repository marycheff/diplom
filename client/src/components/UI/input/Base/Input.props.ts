import { ChangeEvent } from "react"

export interface InputProps {
    name: string
    value?: string
    placeholder?: string
    disabled?: boolean
    type?: "text" | "email" | "password"
    className?: string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    clearable?: boolean
    showToggle?: boolean
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}
