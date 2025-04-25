import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"

const AdminPage = () => {
    const navigate = useNavigate()

    return (
        <div>
            <Button onClick={() => navigate(ROUTES.ADMIN_USERS)}>Пользователи</Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_TESTS)}>Тесты</Button>
            <Button onClick={() => navigate(ROUTES.ADMIN_ALL_ATTEMPTS)}>Попытки прохождения</Button>
            <br />
            <br />
            <Button onClick={() => navigate(ROUTES.PROFILE)}>Профиль</Button>
            <Button onClick={() => navigate(ROUTES.CREATE_TEST)}>Создать Тест</Button>
            {/* <Button onClick={() => logout()}>Выйти</Button> */}
        </div>
    )
}
export default AdminPage
