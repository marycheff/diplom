import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import Header from "@/shared/components/Header/Header"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import {
    AttemptStatus,
    QuestionType,
    QuestionTypeLabels,
    TestAttemptResultDTO,
    TestAttemptUserDTO,
    UserTestDTO,
} from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { countCorrectAnswers } from "@/shared/utils/math"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./AttemptResultsPage.module.scss"

const AttemptResultsPage = () => {
    // Параметры маршрута
    const { attemptId } = useParams<{ attemptId: string }>()
    const [attemptForUser, setAttemptForUser] = useState<TestAttemptUserDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptResultDTO | null>(null)
    const [test, setTest] = useState<UserTestDTO | null>(null)
    const { getTestForUserById } = useTestStore()
    const { isAdmin } = useAuthStore()
    const [isAttemptForUserLoaded, setIsAttemptForUserLoaded] = useState(false)
    const [isAttemptLoaded, setIsAttemptLoaded] = useState(false)
    const [isTestLoaded, setIsTestLoaded] = useState(false)

    const { getAttemptResults, getAttemptForUserById } = useAttemptStore()
    // Проверка валидности attemptId
    if (!attemptId) {
        return <NothingFound title="ID попытки не указан" />
    }
    if (!isValidUUID(attemptId)) {
        return <NothingFound title="Невалидный ID попытки" />
    }

    // Загрузка данных попытки
    const fetchAttemptForUser = async () => {
        try {
            const fetchedAttempt = await getAttemptForUserById(attemptId)
            if (fetchedAttempt) {
                setAttemptForUser(fetchedAttempt)
            }
            setIsAttemptForUserLoaded(true)
        } catch {
            setIsAttemptForUserLoaded(true)
            return <AttemptNotFound />
        }
    }
    const fetchAttempt = async () => {
        try {
            const fetchedAttempt = await getAttemptResults(attemptId)
            if (fetchedAttempt) {
                setAttempt(fetchedAttempt)
            }
            setIsAttemptLoaded(true)
        } catch {
            setIsAttemptLoaded(true)
            return <AttemptNotFound />
        }
    }

    // Загрузка данных теста
    const fetchTest = async () => {
        try {
            if (!attemptForUser) return

            const fetchedTest = await getTestForUserById(attemptForUser.testId)
            if (fetchedTest) {
                setTest(fetchedTest)
            }
            setIsTestLoaded(true)
        } catch {
            setIsTestLoaded(true)
            return <TestNotFound />
        }
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

    // Состояния загрузки
    if (!isTestLoaded || !isAttemptForUserLoaded || !isAttemptLoaded) return <Loader fullScreen />
    if (!attemptForUser) return <AttemptNotFound />
    if (attemptForUser.status === AttemptStatus.IN_PROGRESS) {
        return <NothingFound title="Попытка не завершения" description="Завершите попытку и вернитесь позже" />
    }
    if (!test) return <TestNotFound />
    if (!attempt) return <AttemptNotFound />

    const correctAnswers = attempt.questions ? countCorrectAnswers(attempt.questions) : 0
    const totalQuestions = attempt.questions?.length || 0

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                {test.settings?.showDetailedResults || isAdmin ? (
                    <>
                        <div className={styles.infoBlock}>
                            <h1 className={styles.blockTitle}>{`Результаты прохождения теста "${test.title}"`}</h1>
                            <div className={styles.blockContent}>
                                <div className={styles.infoRow}>
                                    <span className={styles.label}>Результат:</span>
                                    <span className={styles.value}>
                                        {typeof attempt.score === "number" ? (
                                            `${attempt.score}%`
                                        ) : (
                                            <span className={styles.emptyField}>—</span>
                                        )}
                                    </span>
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
                                                    <span className={styles.questionText}>
                                                        {question.question.text}
                                                    </span>
                                                    <span className={styles.questionType}>
                                                        {QuestionTypeLabels[question.question.type]}
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
                                                            question.question.type === QuestionType.TEXT_INPUT ||
                                                            question.question.type === QuestionType.FILL_IN_THE_BLANK
                                                                ? question.userAnswers.isCorrect
                                                                : correctAnswerIds.length === userAnswerIds.length &&
                                                                  correctAnswerIds.every(id =>
                                                                      userAnswerIds.includes(id)
                                                                  ) &&
                                                                  userAnswerIds.every(id =>
                                                                      correctAnswerIds.includes(id)
                                                                  )

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
                                                        <h3 className={styles.answerTitle}>
                                                            {question.question.type === QuestionType.TEXT_INPUT ||
                                                            question.question.type === QuestionType.FILL_IN_THE_BLANK
                                                                ? "Ответ:"
                                                                : "Варианты ответов:"}
                                                        </h3>
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
                                                        <h3 className={styles.answerTitle}>
                                                            {question.question.type === QuestionType.TEXT_INPUT ||
                                                            question.question.type === QuestionType.FILL_IN_THE_BLANK
                                                                ? "Ваш ответ:"
                                                                : "Ваши ответы:"}
                                                        </h3>
                                                        {question.userAnswers &&
                                                        (question.userAnswers.answers.length > 0 ||
                                                            question.question.type === QuestionType.TEXT_INPUT ||
                                                            question.question.type ===
                                                                QuestionType.FILL_IN_THE_BLANK) ? (
                                                            <>
                                                                {question.question.type === QuestionType.TEXT_INPUT ||
                                                                question.question.type ===
                                                                    QuestionType.FILL_IN_THE_BLANK ? (
                                                                    <div className={styles.answerItemWrapper}>
                                                                        <div
                                                                            className={`${styles.answerItem} ${
                                                                                question.userAnswers.isCorrect
                                                                                    ? styles.correctAnswer
                                                                                    : styles.incorrectAnswer
                                                                            }`}>
                                                                            <span className={styles.answerText}>
                                                                                {question.userAnswers.textAnswer}
                                                                            </span>
                                                                            <span className={styles.answerStatus}>
                                                                                {question.userAnswers.isCorrect
                                                                                    ? "✓ Верно"
                                                                                    : "✗ Неверно"}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    question.userAnswers.answers.map(userAnswer => (
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
                                                                    ))
                                                                )}

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
                                                                                            Пропущенные правильные
                                                                                            ответы:
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
                        <h1 className={styles.blockTitle}>{`Результаты прохождения теста "${test.title}"`}</h1>
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
                                                question.question.type === QuestionType.TEXT_INPUT ||
                                                question.question.type === QuestionType.FILL_IN_THE_BLANK
                                                    ? question.userAnswers.isCorrect
                                                    : correctAnswerIds.length === userAnswerIds.length &&
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
        </div>
    )
}

export default AttemptResultsPage
