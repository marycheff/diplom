import { Button } from "@/components/ui/Button/Button"
import { useAuthStore } from "@/store/useAuthStore"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const { user, logout, isAdmin } = useAuthStore()

    return (
        <>
            <div>
                <h1>{user?.isActivated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
                <Button onClick={() => logout()}>Выйти</Button>

                {isAdmin && <Button onClick={() => navigate("/admin")}>Админ панель</Button>}
                {!isAdmin && <h1>Не админ</h1>}

                <Button onClick={() => navigate("/profile")}>Профиль</Button>
                <Button onClick={() => navigate("/test")}>Тест</Button>

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
