import { ReactNode } from "react"

export interface ButtonProps {
    children?: ReactNode
    isLoading?: boolean
    disabled?: boolean
    onClick?: () => void
    loadingText?: string
    type?: "button" | "reset" | "submit"
}