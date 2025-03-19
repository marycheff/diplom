import { Button } from "@/components/ui/Button/Button"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return <Button onClick={goBack}>Назад</Button>
}

export default BackButton
