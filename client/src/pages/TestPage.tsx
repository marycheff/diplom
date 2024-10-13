import { useNavigate } from "react-router-dom"
import TestForm from "../components/TestForm"

const TestPage = () => {
    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <button onClick={goBack}>Назад</button>
            <TestForm />
        </div>
    )
}

export default TestPage
