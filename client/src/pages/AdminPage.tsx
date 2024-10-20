import { observer } from "mobx-react-lite"
import { useContext, useState } from "react"
import { Context } from "../main"
import UserService from "../services/UserService" // Предположим, здесь находится метод для получения данных о пользователе
import { IUser } from "../models/IUser"

const AdminPage = () => {
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    async function getUsers() {
        try {
            const response = await UserService.getUsers()
            setUsers(response.data)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    // useEffect(() => {

    //     const checkAdminStatus = async () => {
    //         try {
    //             const updatedUser = await UserService.getCurrentUser()
    //             store.setUser(updatedUser)
    //         } catch (e) {
    //             console.log("Ошибка обновления роли пользователя", e)
    //         }
    //     }

    //     checkAdminStatus()
    // }, [store])



    return (
        <div>
            <div>{store.isAdmin ? <button onClick={getUsers}>Получить список пользователей</button> : null}</div>
            {users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))}
        </div>
    )
}

export default observer(AdminPage)
