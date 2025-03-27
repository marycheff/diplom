import { Button } from "@/components/ui/Button"
import { useLocation, useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()
    const location = useLocation()

    // Функция для проверки, можно ли вернуться назад в рамках вашего приложения
    const canGoBack = () => {
        // Проверяем, есть ли предыдущая запись в истории роутера
        return window.history.length > 1 && location.key !== "default"
    }

    const goBack = () => {
        if (canGoBack()) {
            navigate(-1) // Переходим назад только внутри приложения
        }
    }

    return canGoBack() ? <Button onClick={goBack}>Назад</Button> : null
}

export default BackButton
