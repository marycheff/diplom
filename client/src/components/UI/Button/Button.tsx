import { FC, ReactNode } from "react"

interface ButtonProps {
    children?: ReactNode
    isLoading?: boolean
    disabled?: boolean // Добавляем свойство disabled
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, isLoading, disabled }) => {
    return <button disabled={isLoading || disabled}>{isLoading ? "Загрузка..." : children}</button>
}

export default Button
