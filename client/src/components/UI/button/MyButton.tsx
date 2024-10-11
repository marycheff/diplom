import React from "react"

interface MyButtonProps {
    children: React.ReactNode
    isLoading: boolean
}

const MyButton: React.FC<MyButtonProps> = ({ children, isLoading }) => {
    return <button disabled={isLoading}>{isLoading ? "Загрузка..." : children}</button>
}

export default MyButton
