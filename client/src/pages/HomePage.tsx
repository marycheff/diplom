import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const { user, logout, isAdmin } = useAuthStore()

    return (
        <>
            <div>
                <h1>{user?.isActivated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>

                {!isAdmin && <h1>Не админ</h1>}

                <Button onClick={() => navigate(ROUTES.PROFILE)}>Профиль</Button>
                <Button onClick={() => navigate(ROUTES.CREATE_TEST)}>Создать Тест</Button>
                <Button onClick={() => navigate(ROUTES.MY_TESTS)}>Мои тесты</Button>
                <br />
                <br />
                <Button onClick={() => logout()}>Выйти</Button>
            </div>
        </>
    )
}

export default HomePage
