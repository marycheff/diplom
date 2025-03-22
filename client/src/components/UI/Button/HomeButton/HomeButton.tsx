import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"

const HomeButton = () => {
    const navigate = useNavigate()
    const goHome = () => {
        navigate("/home")
    }
    return <Button onClick={goHome}>Домой</Button>
}

export default HomeButton
