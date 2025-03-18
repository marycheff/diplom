import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
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

                {/* <Select
                    register={register}
                    label="Количество ответов для генерации"
                    name="numOfAnswers"
                    options={[{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]}
                    value="1"
                /> */}
            </div>
        </>
    )
}

export default HomePage
