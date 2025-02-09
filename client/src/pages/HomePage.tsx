import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const { isLoading } = useUserStore()
    const { user, logout, isAdmin } = useAuthStore()

    return (
        <>
            <div>
                <h1>{user?.isActivated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
                <button onClick={() => logout()}>Выйти</button>

                {isAdmin && <button onClick={() => navigate("/admin")}>Админ панель</button>}
                {!isAdmin && <h1>Не админ</h1>}

                <button onClick={() => navigate("/profile")}>Профиль</button>
                <button onClick={() => navigate("/test")}>Тест</button>
            </div>
        </>
    )
}

export default HomePage
