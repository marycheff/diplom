import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { AttemptStatusLabels, AttemptWithSnapshotDTO } from "@/shared/types"
import { formatDate } from "@/shared/utils/formatter"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./AttemptsTable.module.scss"
interface UserAttemptsTableProps {
    attempts: AttemptWithSnapshotDTO[] | undefined
    total: number
}
const UserAttemptsTable: FC<UserAttemptsTableProps> = ({ attempts, total }) => {
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
                                    <th scope="col"></th>
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
                                            <Link
                                                to={
                                                    isAdmin
                                                        ? `/admin/attempts/${attempt.id}`
                                                        : `/my-attempts/${attempt.id}/results`
                                                }
                                                className="actionLink">
                                                {/* {shortenText(attempt.id)} */}
                                                Перейти
                                            </Link>
                                        </td>

                                        <td>
                                            {isAdmin ? (
                                                <Link
                                                    to={`/admin/tests/${attempt.snapshot?.testId}`}
                                                    className="actionLink">
                                                    {/* {shortenUuid(attempt.test.id)} */}
                                                    {/* {attempt.test.title} */}
                                                    {/* Перейти */}
                                                    {attempt.snapshot?.title}
                                                </Link>
                                            ) : (
                                                attempt.snapshot?.title
                                            )}

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

export default UserAttemptsTable
