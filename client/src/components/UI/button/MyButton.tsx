import React from "react"

interface MyButtonProps {
    children?: React.ReactNode
    isLoading?: boolean
    disabled?: boolean // Добавляем свойство disabled
    onClick?: () => void
}

const MyButton: React.FC<MyButtonProps> = ({ children, isLoading, disabled }) => {
    return <button disabled={isLoading || disabled}>{isLoading ? "Загрузка..." : children}</button>
}

export default MyButton
