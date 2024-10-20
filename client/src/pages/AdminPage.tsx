import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { Context } from "../main"
import { IUser } from "../models/IUser"
import { useNavigate } from "react-router-dom"
const AdminPage = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [users, setUsers] = useState<IUser[]>([])
    async function getUsers() {
        try {
            const users = await store.getUsers()
            if (users !== undefined) {
                setUsers(users)
            }
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    return (
        <div>
            {store.isLoading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>Назад</button>
                    <h1>Пользователи</h1>
                    <button onClick={getUsers}>Получить список пользователей</button>

                    {users.map(user => (
                        <div key={user.email}>{user.email}</div>
                    ))}
                </>
            )}
        </div>
    )
}

export default observer(AdminPage)
