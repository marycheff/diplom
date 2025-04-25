import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import { UserDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"

const UserInfo = () => {
    const { userId } = useParams<{ userId: string }>()

    if (!userId) {
        return <div>ID пользователя не указан</div>
    }
    if (!isValidUUID(userId)) {
        return <div>Невалидный Id</div>
    }

    const { getUserById, isLoading, blockUser, unblockUser, deleteUser, isFetching } = useUserStore()
    const [user, setUser] = useState<UserDTO>({} as UserDTO)
    const { user: currentUser } = useAuthStore()
    const navigate = useNavigate()

    const fetchUser = async () => {
        const user = await getUserById(userId)
        if (user !== undefined) {
            setUser(user)
        }
    }
    const handleDeleteUser = async (id: string) => {
        await deleteUser(id)
        toast.success("Пользователь удален")
        navigate(ROUTES.ADMIN)
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
        fetchUser()
    }, [userId, getUserById])
    if (isFetching) {
        return <Loader />
    }
    if (Object.keys(user).length === 0) {
        return <div>Пользователь не найден</div>
    }

    return (
        <>
            {isFetching ? (
                <Loader />
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
                                        <th>Роль</th>
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
                                                <Button onClick={() => handleUnblockUser(user.id)} disabled={isLoading}>
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
                                        <td>{user.role}</td>
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
