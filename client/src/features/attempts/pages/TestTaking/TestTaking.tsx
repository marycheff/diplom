import TestTimer from "@/features/attempts/components/Timer/TestTimer"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import { usePreventLeave } from "@/shared/hooks/usePreventLeave"
import { AttemptAnswer, AttemptStatus, QuestionType, TestAttemptUserDTO, UserTestDTO } from "@/shared/types"
import { Button, HomeButton } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal } from "@/shared/ui/Modal"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { getDecryptedTime, saveEncryptedTime } from "@/shared/utils/crypto"
import { formatSpaces } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import React, { useEffect, useState } from "react"
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
    const isAttemptCompleted = attempt && attempt.status !== AttemptStatus.IN_PROGRESS

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
        const fetchedAttempt = await getAttemptForUserById(attemptId)
        setAttempt(fetchedAttempt || null)
    }

    // Загрузка данных теста
    const fetchTest = async () => {
        if (!attempt) return
        const fetchedTest = await getTestForUserById(attempt.testId, attemptId)
        setTest(fetchedTest || null)
        setTimeLimit(fetchedTest?.settings?.timeLimit || 0)
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
            if (
                currentQuestion.type === QuestionType.TEXT_INPUT ||
                currentQuestion.type === QuestionType.FILL_IN_THE_BLANK
            ) {
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
    // Обработчик клика на ответ
    const handleAnswerOptionClick = (answerId: string, isSingleChoice: boolean) => () => {
        if (isAttemptCompleted) return

        const newAnswers = isSingleChoice
            ? [answerId]
            : selectedAnswers.includes(answerId)
            ? selectedAnswers.filter(id => id !== answerId)
            : [...selectedAnswers, answerId]

        setSelectedAnswers(newAnswers)
        updateAnswersState(newAnswers)
    }
    // Обработчик изменения состояния чекбокса
    const handleCheckboxChange = (answerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAttemptCompleted) return

        const newAnswers = e.target.checked
            ? [...selectedAnswers, answerId]
            : selectedAnswers.filter(id => id !== answerId)

        setSelectedAnswers(newAnswers)
        updateAnswersState(newAnswers)
    }

    // Вспомогательные функции
    const updateAnswersState = (newAnswers: string[]) => {
        if (!currentQuestion) return
        setAllAnswers(prev => ({ ...prev, [currentQuestion.id]: newAnswers }))
        updateAnswerTime(currentQuestion.id)
    }

    const updateTextAnswerState = (newAnswer: string) => {
        if (!currentQuestion) return
        setAllTextAnswers(prev => ({ ...prev, [currentQuestion.id]: newAnswer }))
        updateAnswerTime(currentQuestion.id)
    }

    const saveCurrentQuestionAnswers = () => {
        if (!currentQuestion) return
        if (
            currentQuestion.type === QuestionType.TEXT_INPUT ||
            currentQuestion.type === QuestionType.FILL_IN_THE_BLANK
        ) {
            setAllTextAnswers(prev => ({ ...prev, [currentQuestion.id]: formatSpaces(textAnswer) }))
        } else {
            setAllAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswers }))
        }
    }

    const updateAnswerTime = (questionId: string) => {
        const timeKey = `answer_time_${attemptId}_${questionId}`
        const currentTime = new Date().toISOString()
        saveEncryptedTime(timeKey, currentTime)
    }

    // Состояние для модального окна подтверждения
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [pendingSubmit, setPendingSubmit] = useState(false)

    // Отправка результатов
    const handleSubmitAnswers = async () => {
        saveCurrentQuestionAnswers()

        // Проверка, что не на все вопросы есть заполненные ответы
        const hasUnansweredQuestions = test?.questions?.some(question => {
            if (question.type === QuestionType.TEXT_INPUT || question.type === QuestionType.FILL_IN_THE_BLANK) {
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
    if (isAttemptFetching || isTestFetching) return <Loader fullScreen />
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
            <HomeButton />
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

                <div className={styles.questionContent}>
                    {currentQuestion.type !== QuestionType.FILL_IN_THE_BLANK ? (
                        <h3>{currentQuestion.text}</h3>
                    ) : (
                        <h3>Заполните пропуск</h3>
                    )}

                    <div className={styles.answerOptions}>
                        {currentQuestion.type === QuestionType.TEXT_INPUT ? (
                            <textarea
                                className={styles.textInput}
                                value={textAnswer}
                                onChange={e => {
                                    setTextAnswer(e.target.value)
                                    updateTextAnswerState(e.target.value)
                                }}
                                disabled={isAttemptCompleted!}
                                placeholder="Введите ваш ответ..."
                            />
                        ) : currentQuestion.type === QuestionType.FILL_IN_THE_BLANK ? (
                            <div className={styles.fillInTheBlankContainer}>
                                <div className={styles.questionWithBlank}>
                                    {currentQuestion.text.split("{blank}").map((part, index, array) => (
                                        <React.Fragment key={index}>
                                            {part}
                                            {index < array.length - 1 && (
                                                <>
                                                    <input
                                                        type="text"
                                                        className={styles.blankInput}
                                                        value={textAnswer}
                                                        onChange={e => {
                                                            setTextAnswer(e.target.value)
                                                            updateTextAnswerState(e.target.value)
                                                        }}
                                                        disabled={isAttemptCompleted!}
                                                    />
                                                </>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            currentQuestion.answers?.map((answer, index) => (
                                <div
                                    key={answer.id}
                                    className={`${styles.answerOption} ${isAttemptCompleted ? styles.disabled : ""}`}
                                    onClick={handleAnswerOptionClick(
                                        answer.id,
                                        currentQuestion.type === QuestionType.SINGLE_CHOICE
                                    )}>
                                    {currentQuestion.type === QuestionType.SINGLE_CHOICE ? (
                                        <input
                                            type="radio"
                                            checked={selectedAnswers.includes(answer.id)}
                                            readOnly
                                            disabled={isAttemptCompleted!}
                                        />
                                    ) : (
                                        <Checkbox
                                            id={`checkbox-${index}`}
                                            checked={selectedAnswers.includes(answer.id)}
                                            onChange={handleCheckboxChange(answer.id)}
                                            disabled={isAttemptCompleted!}
                                        />
                                    )}
                                    <label>{answer.text}</label>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {currentPage === totalPages && !isAttemptCompleted && (
                    <Button
                        onClick={handleSubmitAnswers}
                        disabled={isLoading || !Object.keys(allAnswers).length}
                        className={styles.submitButton}>
                        {isLoading ? "Отправка..." : "Отправить ответы"}
                    </Button>
                )}
                {currentPage !== totalPages && !isAttemptCompleted && (
                    <Button onClick={() => setCurrentPage(currentPage + 1)} className={styles.submitButton}>
                        Следующий вопрос
                    </Button>
                )}

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
