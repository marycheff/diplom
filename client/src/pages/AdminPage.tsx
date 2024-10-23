import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../main"
import { IUser } from "../models/IUser"
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
    const deleteUser = async (id: string) => {
        try {
            await store.deleteUser(id)
            setUsers(users.filter(user => user.id !== id))
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

                    {users.map(user =>
                        user.id === store.user.id ? (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div key={user.email}>{user.email} (Вы)</div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div key={user.email}>{user.email}</div>
                                <button key={user.email} onClick={() => deleteUser(user.id)}>
                                    Удалить
                                </button>
                            </div>
                        )
                    )}
                </>
            )}
        </div>
    )
}

export default observer(AdminPage)
