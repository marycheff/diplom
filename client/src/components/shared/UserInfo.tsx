import { Button } from "@/components/ui/Button/Button"
import Loader from "@/components/ui/Loader/Loader"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { isValidObjectId } from "@/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const UserInfo = () => {
    const { userId } = useParams<{ userId: string }>()

    if (!userId) {
        return <div>ID пользователя не указан</div>
    }
    if (!isValidObjectId(userId)) {
        return <div>Невалидный Id</div>
    }

    const { getUserById, isLoading, blockUser, unblockUser, deleteUser, isUsersFetching } = useUserStore()
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const { user: currentUser } = useAuthStore()
    const navigate = useNavigate()
    const getUserFromStore = async () => {
        const user = await getUserById(userId)
        if (user !== undefined) {
            setUser(user)
        }
    }
    const handleDeleteUser = async (id: string) => {
        await deleteUser(id)
        toast.success("Пользователь удален")
        navigate("/admin")
    }

    const handleBlockUser = async (id: string) => {
        await blockUser(id)
        setUser({ ...user, isBlocked: true })
        toast.success("Пользователь заблокирован")
    }

    const handleUnblockUser = async (id: string) => {
        await unblockUser(id)
        setUser({ ...user, isBlocked: false })
        toast.success("Пользователь разблокирован")
    }

    useEffect(() => {
        getUserFromStore()
    }, [])

    if (Object.keys(user).length === 0) {
        return <div>Пользователь не найден</div>
    }

    return (
        <>
            {isUsersFetching ? (
                <Loader delay={3000} />
            ) : (
                user && (
                    <div>
                        {user.id === currentUser?.id ? (
                            <div>{user.email} (Вы)</div>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Email</th>
                                        <th>Имя</th>
                                        <th>Фамилия</th>
                                        <th>Отчество</th>
                                        <th>Активирован</th>
                                        <th>Заблокирован</th>
                                        <th>ID</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{user.email}</td>
                                        <td>{user.name || "<Пусто>"}</td>
                                        <td>{user.surname || "<Пусто>"}</td>
                                        <td>{user.patronymic || "<Пусто>"}</td>
                                        <td>{String(user.isActivated)}</td>
                                        <td>{String(user.isBlocked)}</td>
                                        <td>{user.id}</td>
                                        <td>
                                            {user.isBlocked ? (
                                                <Button
                                                    onClick={() => handleUnblockUser(user.id)}
                                                    isLoading={isLoading}>
                                                    Разблокировать
                                                </Button>
                                            ) : (
                                                <Button onClick={() => handleBlockUser(user.id)} disabled={isLoading}>
                                                    Заблокировать
                                                </Button>
                                            )}
                                            <Button onClick={() => handleDeleteUser(user.id)} disabled={isLoading}>
                                                Удалить
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                )
            )}
        </>
    )
}

export default UserInfo
