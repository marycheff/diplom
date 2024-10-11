import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { Context } from "."
import LoginForm from "./components/LoginForm"
import { IUser } from "./models/IUser"
import UserService from "./services/UserService"

function App() {
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            store.checkAuth()
        }
    }, [])
    if (store.isLoading) {
        return <h1>Загрузка...</h1>
    }
    if (!store.isAuth) {
        return <LoginForm />
    }
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
        </div>
    )
}

export default observer(App)
