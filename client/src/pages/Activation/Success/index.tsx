import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"

const ActivationSuccessPage = () => {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/login") 
    }

    return (
        <div>
            <h1>Активация прошла успешно!</h1>
            <p>Пожалуйста, войдите в систему снова, чтобы продолжить.</p>
            <Button onClick={handleLoginClick}>Войти</Button>
        </div>
    )
}

export default ActivationSuccessPage
