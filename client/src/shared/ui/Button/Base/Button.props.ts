import { ButtonHTMLAttributes, ReactNode } from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    isLoading?: boolean
    disabled?: boolean
    onClick?: () => void
    loadingText?: string
    type?: "button" | "reset" | "submit"
    tooltip?: string
    className?: string
}
