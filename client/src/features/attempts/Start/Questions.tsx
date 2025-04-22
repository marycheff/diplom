import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { AttemptAnswer, QuestionType, TestAttemptDTO, UserTestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { getDecryptedTime, saveEncryptedTime } from "@/shared/utils/crypto"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import styles from "./Questions.module.scss"

const Questions = () => {
    // Параметры маршрута
    const { attemptId } = useParams<{ attemptId: string }>()

    // Состояния компонента
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [allAnswers, setAllAnswers] = useState<Record<string, string[]>>({})
    const [test, setTest] = useState<UserTestDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptDTO | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    // Хуки из store
    const { isFetching: isTestFetching, getTestForUserById } = useTestStore()
    const { isFetching: isAttemptFetching, getAttemptById, saveAnswers, completeAttempt, isLoading } = useAttemptStore()

    // Проверка валидности attemptId
    if (!attemptId) return <div>ID попытки не указан</div>
    if (!isValidUUID(attemptId)) return <div>Невалидный Id</div>

    // Загрузка сохраненных ответов из localStorage при монтировании
    useEffect(() => {
        const loadSavedAnswers = async () => {
            try {
                const savedAnswers = localStorage.getItem(`test_answers_${attemptId}`)
                if (savedAnswers) {
                    setAllAnswers(JSON.parse(savedAnswers))
                }
            } catch {
                toast.error("Ошибка в получении сохраненных ответов")
            }
        }
        loadSavedAnswers()
    }, [attemptId])

    // Сохранение ответов в localStorage при изменении allAnswers
    useEffect(() => {
        if (attemptId && Object.keys(allAnswers).length > 0) {
            localStorage.setItem(`test_answers_${attemptId}`, JSON.stringify(allAnswers))
        }
    }, [allAnswers, attemptId])

    // Загрузка данных попытки
    const fetchAttempt = async () => {
        const fetchedAttempt = await getAttemptById(attemptId)
        setAttempt(fetchedAttempt || null)
    }

    // Загрузка данных теста
    const fetchTest = async () => {
        if (!attempt) return
        const fetchedTest = await getTestForUserById(attempt.test.id)
        setTest(fetchedTest || null)
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
            setSelectedAnswers(allAnswers[currentQuestion.id] || [])
        }
    }, [currentPage, test, allAnswers])

    // Обработчики событий
    const handlePageChange = (newPage: number) => {
        saveCurrentQuestionAnswers()
        setCurrentPage(newPage)
    }

    const handleAnswerOptionClick = (answerId: string, isSingleChoice: boolean) => () => {
        const newAnswers = isSingleChoice
            ? [answerId]
            : selectedAnswers.includes(answerId)
            ? selectedAnswers.filter(id => id !== answerId)
            : [...selectedAnswers, answerId]

        setSelectedAnswers(newAnswers)
        updateAnswersState(newAnswers)
    }

    const handleCheckboxChange = (answerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const saveCurrentQuestionAnswers = () => {
        if (currentQuestion) {
            setAllAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswers }))
        }
    }

    const updateAnswerTime = (questionId: string) => {
        const timeKey = `answer_time_${attemptId}_${questionId}`
        const currentTime = new Date().toISOString()
        saveEncryptedTime(timeKey, currentTime)
    }

    // Отправка результатов
    const handleSubmitAnswers = async () => {
        try {
            saveCurrentQuestionAnswers()

            const formattedAnswers: AttemptAnswer[] = Object.entries(allAnswers).map(([questionId, answersIds]) => {
                const timeKey = `answer_time_${attemptId}_${questionId}`
                const answeredAt = getDecryptedTime(timeKey)
                return {
                    questionId,
                    answersIds,
                    answeredAt,
                }
            })

            await saveAnswers(attemptId, formattedAnswers)
            // await completeAttempt(attemptId)

            // Очистка localStorage
            localStorage.removeItem(`test_answers_${attemptId}`)
            Object.keys(allAnswers).forEach(qId => localStorage.removeItem(`answer_time_${attemptId}_${qId}`))

            toast.success("Ответы успешно отправлены. Попытка завершена.")
            setAllAnswers({})
        } catch (error) {
            toast.error("Ошибка при отправке ответов")
        }
    }

    // Состояния загрузки
    if (isAttemptFetching || isTestFetching) return <Loader fullScreen />
    if (!attempt) return <div>Попытка не найдена</div>
    if (!test) return <div>Тест не найден</div>
    if (!test.questions?.length) return <div>В тесте нет вопросов</div>

    const currentQuestion = test.questions[currentPage - 1]
    const totalPages = test.questions.length

    return (
        <div className={styles.questionsContainer}>
            <TestPagination page={currentPage} totalPages={totalPages} changePage={handlePageChange} />

            <div className={styles.questionHeader}>
                <h2>
                    Вопрос {currentPage} из {totalPages}
                </h2>
            </div>

            <div className={styles.questionContent}>
                <h3>{currentQuestion.text}</h3>

                <div className={styles.answerOptions}>
                    {currentQuestion.answers?.map((answer, index) => (
                        <div
                            key={answer.id}
                            className={styles.answerOption}
                            onClick={handleAnswerOptionClick(
                                answer.id,
                                currentQuestion.type === QuestionType.SINGLE_CHOICE
                            )}>
                            {currentQuestion.type === QuestionType.SINGLE_CHOICE ? (
                                <input type="radio" checked={selectedAnswers.includes(answer.id)} readOnly />
                            ) : (
                                <input type="checkbox" checked={selectedAnswers.includes(answer.id)} readOnly />
                            )}
                            <label>{answer.text}</label>
                        </div>
                    ))}
                </div>
            </div>

            {currentPage === totalPages && (
                <Button
                    onClick={handleSubmitAnswers}
                    disabled={isLoading || !Object.keys(allAnswers).length}
                    className={styles.submitButton}>
                    {isLoading ? "Отправка..." : "Отправить ответы"}
                </Button>
            )}
        </div>
    )
}

export default Questions
