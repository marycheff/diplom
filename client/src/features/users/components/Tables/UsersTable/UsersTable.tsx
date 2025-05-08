import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { RoleLabels, UserDTO } from "@/shared/types"
import { shortenText } from "@/shared/utils/formatter"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./UsersTable.module.scss"

interface UsersTableProps {
    users: UserDTO[] | undefined
    total: number
}

const UsersTable: FC<UsersTableProps> = ({ users, total }) => {
    const { user: currentUser } = useAuthStore()

    const renderUserRow = (user: UserDTO) => {
        const isCurrentUser = user.id === currentUser?.id

        return (
            <tr key={user.id}>
                <td>
                    {isCurrentUser ? (
                        <span>{shortenText(user.id)} (Вы)</span>
                    ) : (
                        <Link to={`/admin/users/${user.id}`} className="actionLink">
                            {shortenText(user.id)}
                        </Link>
                    )}
                </td>
                <td>{user.email}</td>
                <td>{user.name || "—"}</td>
                <td>{user.surname || "—"}</td>
                <td>{user.patronymic || "—"}</td>
                <td>{RoleLabels[user.role]}</td>
                <td>{user.isBlocked ? "Заблокирован" : "Активен"}</td>
            </tr>
        )
    }

    return (
        <>
            {users && users.length > 0 && (
                <div className={styles.usersData}>
                    <div className={styles.usersCount}>
                        <h3>Всего: {total}</h3>
                        <h3>На странице: {users.length}</h3>
                    </div>
                    <div className={styles.tableResponsive}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Имя</th>
                                    <th scope="col">Фамилия</th>
                                    <th scope="col">Отчество</th>
                                    <th scope="col">Роль</th>
                                    <th scope="col">Статус</th>
                                </tr>
                            </thead>
                            <tbody>{users.map(renderUserRow)}</tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default UsersTable
