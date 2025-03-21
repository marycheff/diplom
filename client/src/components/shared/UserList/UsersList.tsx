import { Button } from "@/components/ui/Button"
import Loader from "@/components/ui/Loader/Loader"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO, UsersListDTO } from "@/types/userTypes"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import styles from "./UserList.module.scss"

const UsersList = () => {
    const [users, setUsers] = useState<UsersListDTO>()
    const { getUsers, isUsersFetching,  isLoading } = useUserStore()
    const { user: currentUser } = useAuthStore()

    const getUsersFromStore = async () => {
        const users = await getUsers()
        if (users !== undefined) {
            setUsers(users)
        }
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

                    {users.map(user => (
                        <div className={styles.usersData}>
                            <div key={user.id}>
                                <div className={styles.tableResponsive}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Email</th>
                                                <th>Имя</th>
                                                <th>Фамилия</th>
                                                <th>Отчество</th>
                                                <th>Роль</th>
                                                <th>Статус</th>
                                                <th>Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name || "—"}</td>
                                                <td>{user.surname || "—"}</td>
                                                <td>{user.patronymic || "—"}</td>
                                                <td>{user.role}</td>
                                                <td>{user.isBlocked ? "Заблокирован" : "Активен"}</td>
                                                <td>
                                                    <Link to={`/admin/user/${user.id}`} className={styles.actionLink}>
                                                        Просмотр
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default UsersList
