import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UpdatePasswordForm from "../components/UpdatePasswordForm"
import { Context } from "../main"
import { IUser } from "../models/IUser"
import UserService from "../services/UserService"

const HomePage = () => {
    const handleClick = () => {
        navigate("/test")
    }
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    async function getUsers() {
        try {
            const response = await UserService.fetchUsers()
            setUsers(response.data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : "Авторизуйтесь"}</h1>
            <h1>{store.user.activated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>
                <button onClick={getUsers}>Получить список пользователей</button>
            </div>
            {users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))}
            <button onClick={handleClick}>TEST</button>
            <UpdatePasswordForm />
        </div>
    )
}

export default HomePage
