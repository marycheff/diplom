import Button from "@/shared/ui/Button/Base/Button"
import { useNavigate } from "react-router-dom"

const HomeButton = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/home")
    }
    return <Button onClick={goHome}>На главную</Button>
}

export default HomeButton
