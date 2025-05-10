import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import { UserDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import CopyButton from "@/shared/ui/Button/Copy/CopyButton"
import Loader from "@/shared/ui/Loader/Loader"
import { shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./UserInfo.module.scss"
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
                    <div className={styles.container}>
                        <div className={styles.infoBlock}>
                            <h1 className={styles.blockTitle}>Информация о пользователе</h1>
                            <div className={styles.blockContent}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID</span>
                                    {/* <span className={styles.value}>{user.id}</span> */}
                                    <span className={styles.value}>
                                        {shortenText(user.id)}
                                        <CopyButton textToCopy={user.id} showOnHover />
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.value}>
                                        {user.email || <span className={styles.emptyField}>не указан</span>}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Имя</span>
                                    <span className={styles.value}>
                                        {user.name || <span className={styles.emptyField}>не указано</span>}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Фамилия</span>
                                    <span className={styles.value}>
                                        {user.surname || <span className={styles.emptyField}>не указана</span>}
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Отчество</span>
                                    <span className={styles.value}>
                                        {user.patronymic || <span className={styles.emptyField}>не указано</span>}
                                    </span>
                                </div>
                                <div>
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
                                </div>
                            </div>
                        </div>
                        {/* <div>
                            {" "}
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
                                                    <Button
                                                        onClick={() => handleUnblockUser(user.id)}
                                                        disabled={isLoading}>
                                                        Разблокировать
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleBlockUser(user.id)}
                                                        disabled={isLoading}>
                                                        Заблокировать
                                                    </Button>
                                                )}
                                                <Button onClick={() => handleDeleteUser(user.id)} disabled={isLoading}>
                                                    Удалить
                                                </Button>
                                            </td>
                                            <td>{RoleLabels[user.role]}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div> */}
                    </div>
                )
            )}
        </>
    )
}

export default UserInfo
