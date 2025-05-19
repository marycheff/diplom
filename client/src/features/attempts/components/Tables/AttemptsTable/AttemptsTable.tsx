import { useAuthStore } from "@/features/auth/store/useAuthStore"
import {
    AttemptStatusLabels,
    GenderLabels,
    PreTestUserData,
    PreTestUserDataLabels,
    TestAttemptDTO,
} from "@/shared/types"
import { formatDate, shortenText } from "@/shared/utils/formatter"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./AttemptsTable.module.scss"
interface AttemptsTableProps {
    attempts: TestAttemptDTO[] | undefined
    total: number
}
const AttemptsTable: FC<AttemptsTableProps> = ({ attempts, total }) => {
    const { isAdmin } = useAuthStore()
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
                                    <th scope="col">Начата</th>
                                    <th scope="col">Завершена</th>
                                    <th scope="col">Баллы</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attempts.map(attempt => (
                                    <tr key={attempt.id}>
                                        <td>
                                            {isAdmin ? (
                                                <Link to={`/admin/attempts/${attempt.id}`} className="actionLink">
                                                    {shortenText(attempt.id)}
                                                </Link>
                                            ) : (
                                                <Link to={`/my-attempts/${attempt.id}`} className="actionLink">
                                                    {shortenText(attempt.id)}
                                                </Link>
                                            )}
                                        </td>
                                        <td>
                                            {attempt.user ? (
                                                // UserDTO
                                                <>
                                                    <Link to={`/admin/users/${attempt.user.id}`} className="actionLink">
                                                        {/* {shortenUuid(attempt.user.id)} */}
                                                        {attempt.user.email || <span>перейти</span>}
                                                    </Link>
                                                    <br />
                                                </>
                                            ) : attempt.preTestUserData ? (
                                                // Record<PreTestUserData, string>
                                                <span>
                                                    {Object.entries(attempt.preTestUserData)
                                                        .map(([key, value]) => {
                                                            const label =
                                                                PreTestUserDataLabels[key as PreTestUserData] || key
                                                            const displayValue =
                                                                key === PreTestUserData.Gender && value
                                                                    ? GenderLabels[value.toString()] || value
                                                                    : value
                                                            return `${label}: ${displayValue}`
                                                        })
                                                        .join(", ")}
                                                </span>
                                            ) : (
                                                <span className={styles.emptyField}>аноним</span>
                                            )}
                                        </td>

                                        <td>
                                            <Link to={`/admin/tests/${attempt.test.id}`} className="actionLink">
                                                {/* {shortenUuid(attempt.test.id)} */}
                                                {attempt.test.title}
                                            </Link>
                                            {/* <br />
                                            {attempt.test.title} */}
                                        </td>
                                        <td>{AttemptStatusLabels[attempt.status]}</td>
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
