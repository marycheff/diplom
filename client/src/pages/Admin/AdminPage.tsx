import { Button } from "@/components/ui/Button"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Button onClick={() => navigate("/admin/users")}>Пользователи</Button>
            <Button onClick={() => navigate("/admin/tests")}>Тесты</Button>
            <br />
            <br />
            <Button onClick={() => navigate("/profile")}>Профиль</Button>
            <Button onClick={() => navigate("/create-test")}>Создать Тест</Button>
            {/* <Button onClick={() => logout()}>Выйти</Button> */}
        </div>
    )
}
export default AdminPage
