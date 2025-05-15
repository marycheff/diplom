import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import Snapshot from "@/features/tests/components/Snapshot/Snapshot"
import { ROUTES } from "@/router/paths"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import {
    AttemptStatusLabels,
    PreTestUserData,
    PreTestUserDataLabels,
    QuestionTypeLabels,
    TestAttemptDTO,
} from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import CopyButton from "@/shared/ui/Button/Copy/CopyButton"
import Loader from "@/shared/ui/Loader/Loader"
import { Modal } from "@/shared/ui/Modal"
import { formatDate, shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import { generatePath, Link, useParams } from "react-router-dom"
import styles from "./AttemptInfo.module.scss"

const AttemptInfo = () => {
    const { attemptId } = useParams<{ attemptId: string }>()

    if (!attemptId) {
        return <NothingFound title="ID попытки не указан" />
    }
    if (!isValidUUID(attemptId)) {
        return <NothingFound title="Невалидный ID попытки" />
    }

    const { isFetching, getAttemptById } = useAttemptStore()
    const [attempt, setAttempt] = useState<TestAttemptDTO | null>(null)
    const [isSnapshotModalOpen, setIsSnapshotModalOpen] = useState(false)
    const fetchAttempt = async () => {
        const fetchedAttempt = await getAttemptById(attemptId)
        if (fetchedAttempt) {
            setAttempt(fetchedAttempt)
        }
    }

    useEffect(() => {
        fetchAttempt()
    }, [attemptId])

    if (isFetching) {
        return <Loader fullScreen />
    }

    if (!attempt) {
        return <AttemptNotFound />
    }

    return (
        <div className={styles.container}>
            <div className={styles.topGrid}>
                {/* Основная информация о попытке */}
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Информация о попытке</h1>
                    <div className={styles.blockContent}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>ID</span>
                            <span className={styles.value}>
                                {shortenText(attempt.id)}
                                <CopyButton textToCopy={attempt.id} />
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Статус</span>
                            <span className={styles.value}>
                                <span className={styles.statusBadge}>{AttemptStatusLabels[attempt.status]}</span>
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Дата начала</span>
                            <span className={styles.value}>{formatDate(attempt.startedAt)}</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Дата завершения</span>
                            <span className={styles.value}>
                                {attempt.completedAt ? (
                                    formatDate(attempt.completedAt)
                                ) : (
                                    <span className={styles.emptyField}>—</span>
                                )}
                            </span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Результат</span>
                            <span className={styles.value}>
                                {typeof attempt.score === "number" ? (
                                    `${attempt.score}%`
                                ) : (
                                    <span className={styles.emptyField}>—</span>
                                )}
                            </span>
                        </div>
                        {/* {attempt.status !== AttemptStatus.IN_PROGRESS && (
                            <Link
                                target="_blank"
                                to={generatePath(ROUTES.PASS_ATTEMPT, { attemptId: attempt.id })}
                                className="actionLink">
                                Перейти к попытке
                            </Link>
                        )} */}

                        {/* <Link
                            target="_blank"
                            to={generatePath(ROUTES.ATTEMPT_RESULTS, { attemptId: attempt.id })}
                            className="actionLink">
                            Перейти к результатам
                        </Link> */}
                    </div>
                </div>

                {/* Информация о тестируемом */}
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Информация о тестируемом</h1>
                    <div className={styles.blockContent}>
                        {attempt.user ? (
                            <>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID</span>
                                    <span className={styles.value}>
                                        <Link
                                            to={
                                                generatePath(ROUTES.ADMIN_USER_INFO, { userId: attempt.test.id })
                                                // `/admin/users/${attempt.user.id}`
                                            }
                                            className="actionLink">
                                            {shortenText(attempt.user.id)}
                                        </Link>
                                        <CopyButton textToCopy={attempt.user.id} />
                                    </span>
                                </div>

                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Email</span>
                                    <span className={styles.value}>
                                        {attempt.user.email || <span className={styles.emptyField}>—</span>}
                                    </span>
                                </div>

                                {attempt.preTestUserData && (
                                    <>
                                        <div className={styles.subTitle}>
                                            Информация, полученная перед началом теста
                                        </div>
                                        {Object.entries(attempt.preTestUserData).map(([key, value]) => (
                                            <div key={key} className={styles.infoRow}>
                                                <span className={styles.label}>
                                                    {PreTestUserDataLabels[key as PreTestUserData] || key}
                                                </span>
                                                <span className={styles.value}>
                                                    {value || <span className={styles.emptyField}>—</span>}
                                                </span>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <div className={styles.infoRow}>АНОНИМНЫЙ ПОЛЬЗОВАТЕЛЬ</div>
                                <div className={styles.subTitle}>Информация, полученная перед началом теста</div>
                                {attempt.preTestUserData ? (
                                    Object.entries(attempt.preTestUserData).map(([key, value]) => (
                                        <div key={key} className={styles.infoRow}>
                                            <span className={styles.label}>
                                                {PreTestUserDataLabels[key as PreTestUserData] || key}
                                            </span>
                                            <span className={styles.value}>
                                                {value || <span className={styles.emptyField}>—</span>}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.emptyBlock}>Информация о тестируемом отсутствует</div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Информация о тесте */}
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Информация о Тесте</h1>
                    <div className={styles.blockContent}>
                        {attempt.test ? (
                            <>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>ID</span>
                                    <span className={styles.value}>
                                        <Link
                                            to={generatePath(ROUTES.ADMIN_TEST_INFO, { testId: attempt.test.id })}
                                            className="actionLink">
                                            {shortenText(attempt.test.id)}
                                        </Link>
                                        <CopyButton textToCopy={attempt.test.id} />
                                    </span>
                                </div>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Тест на момент прохождения</span>
                                    <span className={styles.value}>
                                        {/* {attempt.snapshotId} */}
                                        {/* <Link
                                            to={`/admin/tests/${attempt.test.id}/snapshots/${attempt.snapshotId}`}
                                            className="actionLink">
                                            {attempt.snapshotId}
                                        </Link> */}
                                        <Button
                                            onClick={() => {
                                                setIsSnapshotModalOpen(true)
                                            }}>
                                            Посмотреть
                                        </Button>
                                    </span>
                                </div>
                                {/* <div className={styles.infoRow}>
                                    <span className={styles.label}>Название</span>
                                    <span className={styles.value}>
                                        {attempt.test.title || <span className={styles.emptyField}>—</span>}
                                    </span>
                                </div> */}
                            </>
                        ) : (
                            <div className={styles.emptyBlock}>Информация о тесте отсутствует</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Детали выполнения */}
            <div className={styles.infoBlock}>
                <h1 className={styles.blockTitle}>Детали выполнения</h1>
                <div className={styles.blockContent}>
                    {attempt.questions?.length > 0 ? (
                        <div className={styles.questionsList}>
                            {attempt.questions.map((question, index) => (
                                <div key={question.question.id} className={styles.questionBlock}>
                                    <div className={styles.questionHeader}>
                                        <span className={styles.questionNumber}>{index + 1}</span>
                                        <span className={styles.questionText}>{question.question.text}</span>
                                        <span className={styles.questionType}>
                                            Тип: {QuestionTypeLabels[question.question.type]}
                                        </span>
                                    </div>
                                    <div className={styles.answersList}>
                                        <div className={styles.answerSection}>
                                            <h3 className={styles.answerTitle}>Варианты ответов:</h3>
                                            {question.answers.map(answer => (
                                                <div
                                                    key={answer.id}
                                                    className={`${styles.answerItem} ${
                                                        answer.isCorrect ? styles.correctAnswer : ""
                                                    }`}>
                                                    <span className={styles.answerText}>{answer.text}</span>
                                                    {answer.isCorrect && (
                                                        <span className={styles.correctBadge}>Правильный ответ</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className={styles.answerSection}>
                                            <h3 className={styles.answerTitle}>Ответы пользователя:</h3>
                                            {question.userAnswers && question.userAnswers.answers.length > 0 ? (
                                                <>
                                                    {question.userAnswers.answers.map(userAnswer => (
                                                        <div
                                                            key={userAnswer.userAnswerId}
                                                            className={styles.answerItemWrapper}>
                                                            <div
                                                                className={`${styles.answerItem} ${
                                                                    userAnswer.answer.isCorrect
                                                                        ? styles.correctAnswer
                                                                        : styles.incorrectAnswer
                                                                }`}>
                                                                <span className={styles.answerText}>
                                                                    {userAnswer.answer.text}
                                                                </span>
                                                                <span className={styles.answerStatus}>
                                                                    {userAnswer.answer.isCorrect
                                                                        ? "✓ Верно"
                                                                        : "✗ Неверно"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {/* Show time and date info once after all answers */}
                                                    <div className={styles.answerMeta}>
                                                        {/* <div className={styles.metaItem}>
                                                            <span className={styles.metaLabel}>Затраченное время:</span>
                                                            <span className={styles.metaValue}>
                                                                {question.userAnswers &&
                                                                question.userAnswers.timeSpent ? (
                                                                    `${formatSeconds(question.userAnswers.timeSpent)}`
                                                                ) : (
                                                                    <span className={styles.emptyField}>
                                                                        не указано
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div> */}
                                                        <div className={styles.metaItem}>
                                                            <span className={styles.metaLabel}>Дата ответа:</span>
                                                            <span className={styles.metaValue}>
                                                                {question.userAnswers &&
                                                                question.userAnswers.answeredAt ? (
                                                                    formatDate(question.userAnswers.answeredAt)
                                                                ) : (
                                                                    <span className={styles.emptyField}>
                                                                        не указана
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <span className={styles.emptyField}>Ответ отсутствует</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyBlock}>Данные о вопросах отсутствуют</div>
                    )}
                </div>
            </div>
            <Modal
                fullScreen
                isOpen={isSnapshotModalOpen}
                onClose={() => {
                    // navigate(-1)
                    // setIsEditQuestionsModalOpen(false)
                    setIsSnapshotModalOpen(false)
                }}
                title="Тест на момент прохождения">
                <Snapshot snapshotId={attempt.snapshotId} />
            </Modal>
        </div>
    )
}

export default AttemptInfo
