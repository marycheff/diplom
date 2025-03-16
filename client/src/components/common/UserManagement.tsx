import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Loader from "@/components/UI/loader/Loader"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/user.types"


const UserManagement = () => {
    const [users, setUsers] = useState<UserDTO[]>([])
    const [isUsersVisible, setIsUsersVisible] = useState(false) // Состояние для видимости списка
    const { getUsers, isUsersFetching, blockUser, unblockUser, deleteUser } = useUserStore()
    const { user: currentUser } = useAuthStore()

    const getUsersFromStore = async () => {
        const users = await getUsers()
        if (users !== undefined) {
            setUsers(users)
            setIsUsersVisible(true)
        }
    }

    const handleDeleteUser = async (id: string) => {
        try {
            deleteUser(id)
            setUsers(users.filter(user => user.id !== id))
            toast.success("Пользователь удален")
        } catch (e: any) {
            toast.error(e.response?.data?.message)
        }
    }

    const handleBlockUser = async (id: string) => {
        try {
            blockUser(id)
            setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: true } : user)))
            toast.success("Пользователь заблокирован")
        } catch (e: any) {
            toast.error(e.response?.data?.message)
        }
    }

    const handleUnblockUser = async (id: string) => {
        try {
            unblockUser(id)
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
        getUsersFromStore()
    }, [])

    return (
        <div>
            <h1>Пользователи</h1>
            {isUsersFetching ? (
                <Loader delay={3000} />
            ) : (
                <>
                    <button onClick={getUsersFromStore}>
                        {users.length === 0 ? "Получить список пользователей " : `Обновить`}
                    </button>
                    {users &&
                        users.map(user => (
                            <div key={user.id} style={{ display: "flex", alignItems: "center" }}>
                                {user.id === currentUser?.id ? (
                                    <div>{user.email} (Вы)</div>
                                ) : (
                                    <>
                                        <div>{user.email} </div>
                                        {user.isBlocked ? (
                                            <button onClick={() => handleUnblockUser(user.id)}>Разблокировать</button>
                                        ) : (
                                            <button onClick={() => handleBlockUser(user.id)}>Заблокировать</button>
                                        )}
                                        <button onClick={() => handleDeleteUser(user.id)}>Удалить</button>
                                    </>
                                )}
                            </div>
                        ))}
                </>
            )}
        </div>
    )
}

export default UserManagement
