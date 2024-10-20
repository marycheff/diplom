import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import useWebSocket from "react-use-websocket"
import { Context } from "../main"
import { IUser } from "../models/IUser"
import UserService from "../services/UserService" // Предположим, здесь находится метод для получения данных о пользователе

const AdminPage = () => {
    const { store } = useContext(Context)
    const [users, setUsers] = useState<IUser[]>([])
    async function getUsers() {
        try {
            await store.checkAuth()
            const response = await UserService.getUsers()
            setUsers(response.data)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    // const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:5000")

    // useEffect(() => {
    //     if (lastMessage !== null) {
    //         console.log(`Получено сообщение от WebSocket: ${lastMessage.data}`)

    //         if (lastMessage.data === "Роль пользователя изменена") {
    //             store.setUser({ ...store.user, role: "USER" })
    //         }
    //     }
    // }, [lastMessage, store])

    // const handleClick = () => {
    //     // Отправляем сообщение на сервер через WebSocket
    //     sendMessage("Проверить роль пользователя")
    // }

    return (
        <div>
            <div>{store.isAdmin ? <button onClick={getUsers}>Получить список пользователей</button> : null}</div>
            {users.map(user => (
                <div key={user.email}>{user.email}</div>
            ))}
            {/* <button onClick={handleClick}>Проверить статус роли</button> */}
        </div>
    )
}

export default observer(AdminPage)
