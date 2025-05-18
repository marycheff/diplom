import TestTimer from "@/features/attempts/components/Timer/TestTimer"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import QuestionRenderer from "@/features/tests/components/QuestionRenderer/QuestionRenderer"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import { usePreventLeave } from "@/shared/hooks/usePreventLeave"
import { AttemptAnswer, AttemptStatus, TestAttemptUserDTO, UserTestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal } from "@/shared/ui/Modal"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { getDecryptedTime, saveEncryptedTime } from "@/shared/utils/crypto"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { generatePath, useNavigate, useParams } from "react-router-dom"
import styles from "./TestTaking.module.scss"

const TestTaking = () => {
    // Параметры маршрута
    const { attemptId } = useParams<{ attemptId: string }>()

    // Состояния компонента
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [textAnswer, setTextAnswer] = useState<string>("")
    const [allAnswers, setAllAnswers] = useState<Record<string, string[]>>({})
    const [allTextAnswers, setAllTextAnswers] = useState<Record<string, string>>({})
    const [test, setTest] = useState<UserTestDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptUserDTO | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [timeLimit, setTimeLimit] = useState(0)
    const [isAttemptLoaded, setIsAttemptLoaded] = useState(false)
    const [isTestLoaded, setIsTestLoaded] = useState(false)

    const navigate = useNavigate()

    // Хуки из store
    const { isFetching: isTestFetching, getTestForUserById } = useTestStore()
    const {
        isFetching: isAttemptFetching,
        getAttemptForUserById,
        saveAnswers,
        completeAttempt,
        isLoading,
    } = useAttemptStore()

    // Проверка валидности attemptId
    if (!attemptId) {
        return <NothingFound title="ID попытки не указан" />
    }
    if (!isValidUUID(attemptId)) {
        return <NothingFound title="Невалидный ID попытки" />
    }

    // Проверка, завершена ли попытка
    const isAttemptCompleted = (attempt && attempt.status !== AttemptStatus.IN_PROGRESS) || false

    // Загрузка сохраненных ответов из localStorage при монтировании
    useEffect(() => {
        const loadSavedAnswers = async () => {
            try {
                const savedAnswers = localStorage.getItem(`test_answers_${attemptId}`)
                const savedTextAnswers = localStorage.getItem(`test_text_answers_${attemptId}`)
                if (savedAnswers) {
                    setAllAnswers(JSON.parse(savedAnswers))
                }
                if (savedTextAnswers) {
                    setAllTextAnswers(JSON.parse(savedTextAnswers))
                }
            } catch {
                toast.error("Ошибка в получении сохраненных ответов")
            }
        }
        loadSavedAnswers()
    }, [attemptId])

    // Загрузка ответов из БД для завершенной попытки
    useEffect(() => {
        if (isAttemptCompleted && attempt && attempt.answers && attempt.answers.length > 0) {
            const userAnswers: Record<string, string[]> = {}

            attempt.answers.forEach(answer => {
                if (!userAnswers[answer.questionId]) {
                    userAnswers[answer.questionId] = []
                }
                userAnswers[answer.questionId].push(answer.answerId)
            })

            setAllAnswers(userAnswers)
        }
    }, [attempt, isAttemptCompleted])

    // Сохранение ответов в localStorage при изменении allAnswers и allTextAnswers
    useEffect(() => {
        if (!isAttemptCompleted && attemptId) {
            if (Object.keys(allAnswers).length > 0) {
                localStorage.setItem(`test_answers_${attemptId}`, JSON.stringify(allAnswers))
            }
            if (Object.keys(allTextAnswers).length > 0) {
                localStorage.setItem(`test_text_answers_${attemptId}`, JSON.stringify(allTextAnswers))
            }
        }
    }, [allAnswers, allTextAnswers, attemptId])

    // Загрузка данных попытки
    const fetchAttempt = async () => {
        try {
            const fetchedAttempt = await getAttemptForUserById(attemptId)
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
            if (!attempt) return
            const fetchedTest = await getTestForUserById(attempt.testId, attemptId)
            setTest(fetchedTest || null)
            setTimeLimit(fetchedTest?.settings?.timeLimit || 0)
            setIsTestLoaded(true)
        } catch (error) {
            setIsTestLoaded(true)
            return <TestNotFound />
        }
    }

    // Инициализация данных при монтировании
    useEffect(() => {
        fetchAttempt()
    }, [attemptId])

    useEffect(() => {
        if (attempt) fetchTest()
    }, [attempt])

    // Обновление выбранных ответов при смене страницы
    useEffect(() => {
        if (test?.questions?.length) {
            const currentQuestion = test.questions[currentPage - 1]
            if (currentQuestion.type === "TEXT_INPUT" || currentQuestion.type === "FILL_IN_THE_BLANK") {
                setTextAnswer(allTextAnswers[currentQuestion.id] || "")
            } else {
                setSelectedAnswers(allAnswers[currentQuestion.id] || [])
            }
        }
    }, [currentPage, test, allAnswers, allTextAnswers])

    // Предотвращение случайного закрытия страницы
    usePreventLeave({
        shouldPrevent: !isAttemptCompleted && Object.keys(allAnswers).length > 0,
    })

    // Обработчики событий

    // Обработчик изменения страницы
    const handlePageChange = (newPage: number) => {
        saveCurrentQuestionAnswers()
        setCurrentPage(newPage)
    }

    // Обработчик истечения времени
    const handleTimeExpired = async () => {
        toast.error("Время закончилось. Ваши ответы будут отправлены автоматически.")
        await submitAnswers()
    }

    // Вспомогательные функции
    const saveCurrentQuestionAnswers = () => {
        if (!currentQuestion) return
        if (currentQuestion.type === "TEXT_INPUT" || currentQuestion.type === "FILL_IN_THE_BLANK") {
            setAllTextAnswers(prev => ({ ...prev, [currentQuestion.id]: textAnswer }))
        } else {
            setAllAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswers }))
        }
    }

    const updateAnswerTime = (questionId: string) => {
        const timeKey = `answer_time_${attemptId}_${questionId}`
        const currentTime = new Date().toISOString()
        saveEncryptedTime(timeKey, currentTime)
    }

    // Обработчик изменения ответа
    const handleAnswerChange = (questionId: string, answers: string[]) => {
        setSelectedAnswers(answers)
        setAllAnswers(prev => ({ ...prev, [questionId]: answers }))
        updateAnswerTime(questionId)
    }

    // Обработчик изменения текстового ответа
    const handleTextAnswerChange = (questionId: string, text: string) => {
        setTextAnswer(text)
        setAllTextAnswers(prev => ({ ...prev, [questionId]: text }))
        updateAnswerTime(questionId)
    }

    // Состояние для модального окна подтверждения
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [pendingSubmit, setPendingSubmit] = useState(false)

    // Отправка результатов
    const handleSubmitAnswers = async () => {
        saveCurrentQuestionAnswers()

        // Проверка, что не на все вопросы есть заполненные ответы
        const hasUnansweredQuestions = test?.questions?.some(question => {
            if (question.type === "TEXT_INPUT" || question.type === "FILL_IN_THE_BLANK") {
                return !allTextAnswers[question.id] || allTextAnswers[question.id].trim() === ""
            }
            return !allAnswers[question.id] || allAnswers[question.id].length === 0
        })
        if (hasUnansweredQuestions) {
            setPendingSubmit(true)
            setShowConfirmationModal(true)
            return
        }

        await submitAnswers()
    }

    const submitAnswers = async () => {
        const formattedAnswers: AttemptAnswer[] = []

        // Форматирование обычных ответов
        Object.entries(allAnswers).forEach(([questionId, answersIds]) => {
            const timeKey = `answer_time_${attemptId}_${questionId}`
            const answeredAt = getDecryptedTime(timeKey)
            formattedAnswers.push({
                questionId,
                answersIds,
                textAnswer: null,
                answeredAt,
            })
        })

        // Форматирование текстовых ответов
        Object.entries(allTextAnswers).forEach(([questionId, textAnswer]) => {
            const timeKey = `answer_time_${attemptId}_${questionId}`
            const answeredAt = getDecryptedTime(timeKey)
            formattedAnswers.push({
                questionId,
                answersIds: [],
                textAnswer,
                answeredAt,
            })
        })

        await saveAnswers(attemptId, formattedAnswers)
        await completeAttempt(attemptId)

        // Очистка localStorage
        localStorage.removeItem(`test_answers_${attemptId}`)
        localStorage.removeItem(`test_text_answers_${attemptId}`)
        Object.keys(allAnswers).forEach(qId => localStorage.removeItem(`answer_time_${attemptId}_${qId}`))
        Object.keys(allTextAnswers).forEach(qId => localStorage.removeItem(`answer_time_${attemptId}_${qId}`))

        toast.success("Ответы успешно отправлены. Попытка завершена.")
        if (attempt) {
            navigate(generatePath(ROUTES.ATTEMPT_RESULTS, { attemptId: attempt.id }))
        } else {
            navigate(ROUTES.HOME)
        }

        setAllAnswers({})
        setAllTextAnswers({})
    }

    // Состояния загрузки
    if (isAttemptFetching || isTestFetching || !isAttemptLoaded || !isTestLoaded) return <Loader fullScreen />
    if (!attempt) return <AttemptNotFound />
    if (!test) return <TestNotFound />
    if (!test.questions?.length) {
        return (
            <NothingFound
                title="В тесте нет вопросов"
                description="Данный тест не доступен для прохождения, так как в нем нет вопросов"
            />
        )
    }

    const currentQuestion = test.questions[currentPage - 1]
    const totalPages = test.questions.length

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo}>НейроТест</div>
                <div className={styles.authButtons}>
                    <Button onClick={() => navigate(ROUTES.LOGIN)}>Авторизация</Button>
                    <Button onClick={() => navigate(ROUTES.REGISTER)} variant="secondary">
                        Регистрация
                    </Button>
                </div>
            </header>
            <div className={styles.questionsContainer}>
                {isAttemptCompleted && (
                    <div className={styles.completedBanner}>Попытка завершена. Изменение ответов недоступно.</div>
                )}

                {timeLimit > 0 && !isAttemptCompleted && (
                    <TestTimer
                        attemptId={attemptId}
                        defaultTime={timeLimit}
                        timeSpent={attempt.timeSpent}
                        onTimeExpired={handleTimeExpired}
                    />
                )}

                <TestPagination page={currentPage} totalPages={totalPages} changePage={handlePageChange} />

                <div className={styles.questionHeader}>
                    <h2>
                        Вопрос {currentPage} из {totalPages}
                    </h2>
                </div>

                <QuestionRenderer
                    question={currentQuestion}
                    selectedAnswers={selectedAnswers}
                    textAnswer={textAnswer}
                    isCompleted={isAttemptCompleted}
                    onAnswerChange={handleAnswerChange}
                    onTextAnswerChange={handleTextAnswerChange}
                    onNextQuestion={currentPage < totalPages ? () => setCurrentPage(currentPage + 1) : undefined}
                    onSubmitAnswers={handleSubmitAnswers}
                    isLastQuestion={currentPage === totalPages}
                    isLoading={isLoading}
                />

                <ConfirmationModal
                    isOpen={showConfirmationModal}
                    onClose={() => {
                        setShowConfirmationModal(false)
                        setPendingSubmit(false)
                    }}
                    onConfirm={() => {
                        setShowConfirmationModal(false)
                        if (pendingSubmit) {
                            submitAnswers()
                        }
                    }}
                    title="Подтверждение отправки"
                    confirmText="Отправить"
                    cancelText="Отмена">
                    <p>Вы ответили не на все вопросы. Вы уверены, что хотите отправить ответы?</p>
                </ConfirmationModal>
            </div>
        </>
    )
}

export default TestTaking
