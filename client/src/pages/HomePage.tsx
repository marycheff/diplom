import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import UpdatePasswordForm from "../containers/UpdatePasswordForm"
import { Context } from "../main"
import { IUser } from "../models/IUser"
import UserService from "../services/UserService"
import { observer } from "mobx-react-lite"

const HomePage = () => {
    const handleClick = () => {
        navigate("/test")
    }
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])

    async function getUsers() {
        try {
            const response = await UserService.getUsers()
            console.log(response.data)

            setUsers(response.data)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    return (
        <div>
            <h1>{store.isAuth ? `Пользователь ${store.user.email} авторизован` : "Авторизуйтесь"}</h1>
            <h1>{store.user.activated ? "Аккаунт активирован" : "Аккаунт Не активирован!!!"}</h1>
            <button onClick={() => store.logout()}>Выйти</button>
            <div>{store.isAdmin ? <button onClick={getUsers}>Получить список пользователей</button> : null}</div>
            {users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))}
            <button onClick={handleClick}>TEST</button>
            <UpdatePasswordForm />
        </div>
    )
}

export default observer(HomePage)
