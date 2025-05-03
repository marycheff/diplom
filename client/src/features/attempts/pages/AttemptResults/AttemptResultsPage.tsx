import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { AttemptStatus, QuestionType, TestAttemptDTO, TestAttemptUserDTO, TestDTO } from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./AttemptResultsPage.module.scss"

const AttemptResultsPage = () => {
    // Параметры маршрута
    const { attemptId } = useParams<{ attemptId: string }>()
    const [attemptForUser, setAttemptForUser] = useState<TestAttemptUserDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptDTO | null>(null)
    const [test, setTest] = useState<TestDTO | null>(null)
    const { isFetching: isTestFetching, getTestById } = useTestStore()
    const { isAdmin } = useAuthStore()

    const {
        isFetching: isAttemptFetching,
        getAttemptById,
        getAttemptForUserById,
        saveAnswers,
        completeAttempt,
        isLoading,
    } = useAttemptStore()
    // Проверка валидности attemptId
    if (!attemptId) return <div>ID попытки не указан</div>
    if (!isValidUUID(attemptId)) return <div>Невалидный Id</div>

    // Загрузка данных попытки
    const fetchAttemptForUser = async () => {
        const fetchedAttempt = await getAttemptForUserById(attemptId)
        setAttemptForUser(fetchedAttempt || null)
    }
    const fetchAttempt = async () => {
        const fetchedAttempt = await getAttemptById(attemptId)
        setAttempt(fetchedAttempt || null)
    }

    // Загрузка данных теста
    const fetchTest = async () => {
        if (!attemptForUser) return
        const fetchedTest = await getTestById(attemptForUser.testId)
        setTest(fetchedTest || null)
    }
    // Инициализация данных при монтировании
    useEffect(() => {
        fetchAttemptForUser()
    }, [attemptId])

    useEffect(() => {
        if (attemptForUser && attemptForUser.status === AttemptStatus.COMPLETED) {
            fetchTest()
            fetchAttempt()
        }
    }, [attemptForUser])

    // Подсчет количества правильных ответов
    const countCorrectAnswers = () => {
        if (!attempt || !attempt.questions) return 0

        let correctCount = 0
        attempt.questions.forEach(question => {
            if (question.userAnswers && question.userAnswers.answers) {
                const correctAnswerIds = question.answers.filter(answer => answer.isCorrect).map(answer => answer.id)
                const userAnswerIds = question.userAnswers.answers.map(answer => answer.answer.id)
                if (
                    correctAnswerIds.length === userAnswerIds.length &&
                    correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
                    userAnswerIds.every(id => correctAnswerIds.includes(id))
                ) {
                    correctCount++
                }
            }
        })

        return correctCount
    }

    // Состояния загрузки
    if (isAttemptFetching || isTestFetching) return <Loader fullScreen />
    if (!attemptForUser) return <div>Попытка не найдена</div>
    if (attemptForUser.status !== AttemptStatus.COMPLETED) {
        return <div>Попытка не завершена</div>
    }
    if (!test) return <div>Тест не найден</div>
    if (!attempt) return <div>Попытка не найдена</div>

    const correctAnswers = countCorrectAnswers()
    const totalQuestions = attempt.questions?.length || 0

    return (
        <div className={styles.container}>
            {test?.settings?.showDetailedResults || isAdmin ? (
                <>
                    <div className={styles.infoBlock}>
                        <h1 className={styles.blockTitle}>Результаты теста</h1>
                        <div className={styles.blockContent}>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Результат:</span>
                                <span className={styles.value}>{attempt.score}%</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Правильных ответов:</span>
                                <span className={styles.value}>
                                    {correctAnswers} из {totalQuestions}
                                </span>
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
                                                    Тип: {question.question.type}
                                                </span>
                                            </div>
                                            {/* Вердикт по вопросу */}
                                            {question.userAnswers &&
                                                question.userAnswers.answers &&
                                                (() => {
                                                    const correctAnswerIds = question.answers
                                                        .filter(answer => answer.isCorrect)
                                                        .map(answer => answer.id)
                                                    const userAnswerIds = question.userAnswers.answers.map(
                                                        answer => answer.answer.id
                                                    )
                                                    const isCorrect =
                                                        correctAnswerIds.length === userAnswerIds.length &&
                                                        correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
                                                        userAnswerIds.every(id => correctAnswerIds.includes(id))

                                                    return (
                                                        <div
                                                            className={`${styles.questionVerdict} ${
                                                                isCorrect
                                                                    ? styles.correctVerdict
                                                                    : styles.incorrectVerdict
                                                            }`}>
                                                            <span className={styles.verdictLabel}>Вердикт:</span>
                                                            <span className={styles.verdictValue}>
                                                                {isCorrect ? "Ответ верный" : "Ответ неверный"}
                                                            </span>
                                                        </div>
                                                    )
                                                })()}
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
                                                                <span className={styles.correctBadge}>
                                                                    Правильный ответ
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={styles.answerSection}>
                                                    <h3 className={styles.answerTitle}>Ваши ответы:</h3>
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

                                                            {/* Показываем пропущенные правильные ответы для вопросов с множественным выбором */}
                                                            {question.question.type ===
                                                                QuestionType.MULTIPLE_CHOICE && (
                                                                <>
                                                                    {(() => {
                                                                        const correctAnswerIds = question.answers
                                                                            .filter(answer => answer.isCorrect)
                                                                            .map(answer => answer.id)
                                                                        const userAnswerIds =
                                                                            question.userAnswers.answers.map(
                                                                                answer => answer.answer.id
                                                                            )
                                                                        const missedCorrectAnswerIds =
                                                                            correctAnswerIds.filter(
                                                                                id => !userAnswerIds.includes(id)
                                                                            )
                                                                        if (missedCorrectAnswerIds.length > 0) {
                                                                            const missedCorrectAnswers =
                                                                                question.answers.filter(answer =>
                                                                                    missedCorrectAnswerIds.includes(
                                                                                        answer.id
                                                                                    )
                                                                                )
                                                                            return (
                                                                                <div
                                                                                    className={
                                                                                        styles.missedAnswersSection
                                                                                    }>
                                                                                    <h4
                                                                                        className={
                                                                                            styles.missedAnswersTitle
                                                                                        }>
                                                                                        Пропущенные правильные ответы:
                                                                                    </h4>
                                                                                    {missedCorrectAnswers.map(
                                                                                        answer => (
                                                                                            <div
                                                                                                key={answer.id}
                                                                                                className={`${styles.answerItem} ${styles.missedAnswer}`}>
                                                                                                <span
                                                                                                    className={
                                                                                                        styles.answerText
                                                                                                    }>
                                                                                                    {answer.text}
                                                                                                </span>
                                                                                                <span
                                                                                                    className={
                                                                                                        styles.missedBadge
                                                                                                    }>
                                                                                                    Пропущен
                                                                                                </span>
                                                                                            </div>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            )
                                                                        }
                                                                        return null
                                                                    })()}
                                                                </>
                                                            )}
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
                </>
            ) : (
                <div className={styles.infoBlock}>
                    <h1 className={styles.blockTitle}>Результаты теста</h1>
                    <div className={styles.blockContent}>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Результат:</span>
                            <span className={styles.value}>{attemptForUser.score}%</span>
                        </div>
                        <div className={styles.infoRow}>
                            <span className={styles.label}>Правильных ответов:</span>
                            <span className={styles.value}>
                                {correctAnswers} из {totalQuestions}
                            </span>
                        </div>
                        {/* Краткий вердикт по каждому вопросу */}
                        {attempt.questions?.length > 0 && (
                            <div className={styles.infoRow}>
                                <span className={styles.label}>Вердикт по вопросам:</span>
                                <div className={styles.value}>
                                    {attempt.questions.map((question, index) => {
                                        if (!question.userAnswers || !question.userAnswers.answers) return null

                                        const correctAnswerIds = question.answers
                                            .filter(answer => answer.isCorrect)
                                            .map(answer => answer.id)
                                        const userAnswerIds = question.userAnswers.answers.map(
                                            answer => answer.answer.id
                                        )
                                        const isCorrect =
                                            correctAnswerIds.length === userAnswerIds.length &&
                                            correctAnswerIds.every(id => userAnswerIds.includes(id)) &&
                                            userAnswerIds.every(id => correctAnswerIds.includes(id))

                                        return (
                                            <div
                                                key={question.question.id}
                                                className={`${styles.questionVerdict} ${
                                                    isCorrect ? styles.correctVerdict : styles.incorrectVerdict
                                                }`}>
                                                <span className={styles.verdictLabel}>Вопрос {index + 1}:</span>
                                                <span className={styles.verdictValue}>
                                                    {isCorrect ? "Ответ верный" : "Ответ неверный"}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AttemptResultsPage
