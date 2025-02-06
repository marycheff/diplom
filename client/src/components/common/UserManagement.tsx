import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import { IUser } from "../../models/IUser"

const UserManagement = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const [isUsersVisible, setIsUsersVisible] = useState(false) // Состояние для видимости списка

    async function getUsers() {
        try {
            // const users = await store.getUsers()
            if (users !== undefined) {
                setUsers(users)
                setIsUsersVisible(true) // Скрываем/показываем список пользователей
            }
        } catch (e: any) {
            toast.error(e.response?.data?.message)
        }
    }

    const deleteUser = async (id: string) => {
        try {
            // await store.deleteUser(id)
            setUsers(users.filter(user => user.id !== id))
            toast.success("Пользователь удален")
        } catch (e: any) {
            toast.error(e.response?.data?.message)
        }
    }

    const blockUser = async (id: string) => {
        try {
            //await store.blockUser(id)
            setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: true } : user)))
            toast.success("Пользователь заблокирован")
        } catch (e: any) {
            toast.error(e.response?.data?.message)
        }
    }

    const unblockUser = async (id: string) => {
        try {
            // await store.unblockUser(id)
            setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: false } : user)))
            toast.success("Пользователь разблокирован")
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    const toggleUsersVisibility = () => {
        setIsUsersVisible(prev => !prev)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <h1>Пользователи</h1>
            {/* <button onClick={getUsers}>Получить список пользователей</button> */}
            <button onClick={toggleUsersVisibility}>
                {isUsersVisible ? "Скрыть список пользователей" : "Показать список пользователей"}
            </button>

            {/* {isUsersVisible &&
                users.map(user => (
                    <div key={user.id} style={{ display: "flex", alignItems: "center" }}>
                        {user.id === store.user.id ? (
                            <div>{user.email} (Вы)</div>
                        ) : (
                            <>
                                <div>{user.email} </div>
                                {user.isBlocked ? (
                                    <button onClick={() => unblockUser(user.id)}>Разблокировать</button>
                                ) : (
                                    <button onClick={() => blockUser(user.id)}>Заблокировать</button>
                                )}
                                <button onClick={() => deleteUser(user.id)}>Удалить</button>
                            </>
                        )}
                    </div>
                ))} */}
        </div>
    )
}

export default UserManagement
