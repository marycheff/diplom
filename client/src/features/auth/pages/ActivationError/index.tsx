import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"

const ActivationErrorPage = () => {
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/home")
    }
    return (
        <div>
            <h1>Ошибка активации</h1>
            <p>Ссылка активации недействительна или уже использована.</p>
            <Button onClick={handleLoginClick}>На главную</Button>
        </div>
    )
}

export default ActivationErrorPage
