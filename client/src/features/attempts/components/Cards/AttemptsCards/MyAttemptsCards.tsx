import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { AttemptStatus, AttemptStatusLabels, TestAttemptDTO } from "@/shared/types"
import { formatDate } from "@/shared/utils/formatter"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./AttemptsCards.module.scss"

interface MyAttemptsCardsProps {
    attempts: TestAttemptDTO[] | undefined
    total: number
}

const MyAttemptsCards: FC<MyAttemptsCardsProps> = ({ attempts, total }) => {
    const { isAdmin } = useAuthStore()

    const getStatusClassName = (status: AttemptStatus) => {
        switch (status) {
            case AttemptStatus.COMPLETED:
                return styles.completed
            case AttemptStatus.IN_PROGRESS:
                return styles.inProgress
            case AttemptStatus.EXPIRED:
                return styles.expired
            default:
                return styles.expired
        }
    }

    return (
        <>
            {attempts && attempts.length > 0 && (
                <div className={styles.attemptsData}>
                    <div className={styles.attemptsCount}>
                        <h3>Всего: {total}</h3>
                        <h3>На странице: {attempts.length}</h3>
                    </div>

                    <div className={styles.cardsContainer}>
                        {attempts.map(attempt => (
                            <div key={attempt.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <h3>{attempt.test.title}</h3>
                                    <span className={`${styles.statusBadge} ${getStatusClassName(attempt.status)}`}>
                                        {AttemptStatusLabels[attempt.status]}
                                    </span>
                                </div>

                                <div className={styles.cardContent}>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Дата начала:</span>
                                            <span className={styles.value}>{formatDate(attempt.startedAt)}</span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Дата завершения:</span>
                                            <span className={styles.value}>
                                                {attempt.completedAt ? formatDate(attempt.completedAt) : "—"}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.label}>Баллы:</span>
                                            <span className={styles.value}>
                                                {typeof attempt.score === "number" ? (
                                                    <span className={styles.score}>{attempt.score}%</span>
                                                ) : (
                                                    <span className={styles.emptyField}>—</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <Link
                                            to={
                                                isAdmin
                                                    ? `/admin/my-attempts/${attempt.id}`
                                                    : `/my-attempts/${attempt.id}/results`
                                            }
                                            className={styles.actionLink}>
                                            Перейти
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default MyAttemptsCards
