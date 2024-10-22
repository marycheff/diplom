import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UpdatePasswordForm from "../containers/UpdatePasswordForm"
import { Context } from "../main"

const HomePage = () => {
    const navigate = useNavigate()
    const { store } = useContext(Context)

    return (
        <div>
            <h1>{store.user.activated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
            <button onClick={() => store.logout()}>Выйти</button>

            {store.isAdmin && <button onClick={() => navigate("/admin")}>Админ панель</button>}

            <button onClick={() => navigate("/profile")}>Профиль</button>
            <button onClick={() => navigate("/test")}>Тест</button>
            
        </div>
    )
}

export default observer(HomePage)

