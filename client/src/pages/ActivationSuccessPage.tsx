import React from "react"
import { useNavigate } from "react-router-dom"

const ActivationSuccessPage = () => {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/login") // Перенаправляем на страницу входа
    }

    return (
        <div>
            <h1>Активация прошла успешно!</h1>
            <p>Пожалуйста, войдите в систему снова, чтобы продолжить.</p>
            <button onClick={handleLoginClick}>Войти</button>
        </div>
    )
}

export default ActivationSuccessPage
