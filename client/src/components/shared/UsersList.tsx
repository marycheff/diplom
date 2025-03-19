import { Button } from "@/components/ui/Button/Button"
import Loader from "@/components/ui/Loader/Loader"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

const UserManagement = () => {
    const [users, setUsers] = useState<UserDTO[]>([])
    const [isUsersVisible, setIsUsersVisible] = useState(false) // Состояние для видимости списка
    const { getUsers, isUsersFetching, blockUser, unblockUser, deleteUser, isLoading } = useUserStore()
    const { user: currentUser } = useAuthStore()

    const getUsersFromStore = async () => {
        const users = await getUsers()
        if (users !== undefined) {
            setUsers(users)
            setIsUsersVisible(true)
        }
    }

    const handleDeleteUser = async (id: string) => {
        deleteUser(id)
        setUsers(users.filter(user => user.id !== id))
        toast.success("Пользователь удален")
    }

    const handleBlockUser = async (id: string) => {
        blockUser(id)
        setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: true } : user)))
        toast.success("Пользователь заблокирован")
    }

    const handleUnblockUser = async (id: string) => {
        unblockUser(id)
        setUsers(users.map(user => (user.id === id ? { ...user, isBlocked: false } : user)))
        toast.success("Пользователь разблокирован")
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
                    <Button onClick={getUsersFromStore}>
                        {users.length === 0 ? "Получить список пользователей " : `Обновить`}
                    </Button>
                    
                        {users &&
                            users.map(user => (
                                <div key={user.id} style={{ display: "flex", alignItems: "center" }}>
                                    {user.id === currentUser?.id ? (
                                        <div>{user.email} (Вы)</div>
                                    ) : (
                                        <>
                                            <div>{user.email}</div>
                                            {/* {user.isBlocked ? (
                                            <Button onClick={() => handleUnblockUser(user.id)}>Разблокировать</Button>
                                        ) : (
                                            <Button onClick={() => handleBlockUser(user.id)}>Заблокировать</Button>
                                        )} */}
                                            {/* <Button onClick={() => handleDeleteUser(user.id)}>Удалить</Button> */}

                                            <Link to={`/admin/user/${user.id}`}>
                                                <Button>Перейти</Button>
                                            </Link>
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
