import { PreTestUserData, PreTestUserDataLabels, TestAttemptDTO } from "@/shared/types"
import { formatDate } from "@/shared/utils/formatter"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./AttemptsTable.module.scss"
interface AttemptsTableProps {
    attempts: TestAttemptDTO[] | undefined
    total: number
}
const AttemptsTable: FC<AttemptsTableProps> = ({ attempts, total }) => {
    return (
        <>
            {attempts && attempts.length > 0 && (
                <div className={styles.attemptsData}>
                    <div className={styles.attemptsCount}>
                        <h3>Всего: {total}</h3>
                        <h3>На странице: {attempts.length}</h3>
                    </div>

                    <div className={styles.tableResponsive}>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Пользователь</th>
                                    <th scope="col">Тест</th>
                                    <th scope="col">Статус</th>
                                    <th scope="col">Начат</th>
                                    <th scope="col">Завершен</th>
                                    <th scope="col">Баллы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attempts.map(attempt => (
                                    <tr key={attempt.id}>
                                        <td>
                                            <Link to={`/admin/attempts/${attempt.id}`} className="actionLink">
                                                {attempt.id}
                                            </Link>
                                        </td>
                                        <td>
                                            {attempt.user ? (
                                                "id" in attempt.user ? (
                                                    // UserDTO
                                                    <Link to={`/admin/users/${attempt.user.id}`} className="actionLink">
                                                        {attempt.user.id}
                                                    </Link>
                                                ) : (
                                                    // Record<PreTestUserData, string>
                                                    <span>
                                                        {Object.entries(attempt.user)
                                                            .map(([key, value]) => {
                                                                const label =
                                                                    PreTestUserDataLabels[key as PreTestUserData] || key
                                                                return `${label}: ${value}`
                                                            })
                                                            .join(", ")}
                                                    </span>
                                                )
                                            ) : (
                                                "—"
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/admin/tests/${attempt.test.id}`} className="actionLink">
                                                {attempt.test.id}
                                            </Link>
                                            <br />
                                            {attempt.test.title}
                                        </td>
                                        <td>{attempt.status}</td>
                                        <td>{formatDate(attempt.startedAt)}</td>
                                        <td>{attempt.completedAt ? formatDate(attempt.completedAt) : "—"}</td>
                                        <td>
                                            {typeof attempt.score === "number" ? (
                                                `${attempt.score}%`
                                            ) : (
                                                <span className={styles.emptyField}>—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default AttemptsTable
