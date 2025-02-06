import { useUserStore } from "@/store/useUserStore"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const { isLoading } = useUserStore()

    return (
        <>
            {isLoading ? (
                <h1>Загрузка...</h1>
            ) : (
                <div>
                    {/* <h1>{store.user.activated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
                    <button onClick={() => store.logout()}>Выйти</button> */}

                    {/* {store.isAdmin && <button onClick={() => navigate("/admin")}>Админ панель</button>}
                    {!store.isAdmin && <h1>Не админ</h1>} */}

                    <button onClick={() => navigate("/profile")}>Профиль</button>
                    <button onClick={() => navigate("/test")}>Тест</button>
                </div>
            )}
        </>
    )
}

export default HomePage
