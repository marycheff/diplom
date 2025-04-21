import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { AttemptAnswer, QuestionType, TestAttemptDTO, UserTestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Loader from "@/shared/ui/Loader/Loader"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import styles from "./Questions.module.scss"

const Questions = () => {
    const { attemptId } = useParams<{ attemptId: string }>()
    if (!attemptId) {
        return <div>ID попытки не указан</div>
    }
    if (!isValidUUID(attemptId)) {
        return <div>Невалидный Id</div>
    }

    // State for current question's selected answers
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

    // State for all answers in the test
    const [allAnswers, setAllAnswers] = useState<Record<string, string[]>>({})

    // State for submission status

    const { isFetching: isTestFetching, getTestForUserById } = useTestStore()
    const { isFetching: isAttemptFetching, getAttemptById, saveAnswers, completeAttempt, isLoading } = useAttemptStore()

    const [test, setTest] = useState<UserTestDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptDTO | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

    // Load saved answers from localStorage when component mounts
    useEffect(() => {
        if (attemptId) {
            const savedAnswers = localStorage.getItem(`test_answers_${attemptId}`)
            if (savedAnswers) {
                try {
                    const parsedAnswers = JSON.parse(savedAnswers)
                    setAllAnswers(parsedAnswers)
                } catch (error) {
                    console.error("Failed to parse saved answers", error)
                }
            }
        }
    }, [attemptId])

    // Update localStorage whenever allAnswers changes
    useEffect(() => {
        if (attemptId && Object.keys(allAnswers).length > 0) {
            localStorage.setItem(`test_answers_${attemptId}`, JSON.stringify(allAnswers))
        }
    }, [allAnswers, attemptId])

    const fetchAttempt = async () => {
        const fetchedAttempt = await getAttemptById(attemptId)
        if (fetchedAttempt) {
            setAttempt(fetchedAttempt)
        }
    }

    const fetchTest = async () => {
        if (!attempt) {
            return
        }
        const fetchedTest = await getTestForUserById(attempt.test.id)
        if (fetchedTest) {
            setTest(fetchedTest)
        }
    }

    useEffect(() => {
        fetchAttempt()
    }, [attemptId])

    useEffect(() => {
        if (attempt) {
            fetchTest()
        }
    }, [attempt])

    // Load selected answers for current question when page changes
    useEffect(() => {
        if (test && test.questions && test.questions.length > 0) {
            const currentQuestion = test.questions[currentPage - 1]
            if (currentQuestion) {
                const questionId = currentQuestion.id
                setSelectedAnswers(allAnswers[questionId] || [])
            }
        }
    }, [currentPage, test, allAnswers])

    if (isAttemptFetching || isTestFetching) {
        return <Loader fullScreen />
    }

    if (!attempt) {
        return <div>Попытка не найдена</div>
    }

    if (!test) {
        return <div>Тест не найден</div>
    }

    const questions = test.questions || []
    const totalPages = questions.length

    const handlePageChange = (newPage: number) => {
        // Save current answers before changing page
        if (currentQuestion) {
            saveCurrentQuestionAnswers()
        }
        setCurrentPage(newPage)
    }

    // Save current question's answers to allAnswers state
    const saveCurrentQuestionAnswers = () => {
        if (currentQuestion) {
            setAllAnswers(prev => ({
                ...prev,
                [currentQuestion.id]: selectedAnswers,
            }))
        }
    }

    if (questions.length === 0) {
        return <div>В тесте нет вопросов</div>
    }

    const currentQuestion = questions[currentPage - 1]

    const handleAnswerOptionClick = (answerId: string, isSingleChoice: boolean) => () => {
        let newSelectedAnswers: string[]

        if (isSingleChoice) {
            newSelectedAnswers = [answerId]
        } else {
            if (selectedAnswers.includes(answerId)) {
                newSelectedAnswers = selectedAnswers.filter(id => id !== answerId)
            } else {
                newSelectedAnswers = [...selectedAnswers, answerId]
            }
        }

        setSelectedAnswers(newSelectedAnswers)

        // Update allAnswers immediately
        setAllAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: newSelectedAnswers,
        }))
    }

    const handleCheckboxChange = (answerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const newSelectedAnswers = [...selectedAnswers, answerId]
            setSelectedAnswers(newSelectedAnswers)

            // Update allAnswers immediately
            setAllAnswers(prev => ({
                ...prev,
                [currentQuestion.id]: newSelectedAnswers,
            }))
        } else {
            const newSelectedAnswers = selectedAnswers.filter(id => id !== answerId)
            setSelectedAnswers(newSelectedAnswers)

            // Update allAnswers immediately
            setAllAnswers(prev => ({
                ...prev,
                [currentQuestion.id]: newSelectedAnswers,
            }))
        }
    }

    // Submit all answers to the server
    const handleSubmitAnswers = async () => {
        // Save current question answers first
        saveCurrentQuestionAnswers()

        // Format answers for API
        const formattedAnswers: AttemptAnswer[] = Object.entries(allAnswers).map(([questionId, answersIds]) => ({
            questionId,
            answersIds,
            // timeSpent will be added later
        }))

        await saveAnswers(attemptId, formattedAnswers)
        toast.success("Ответы успешно отправлены")
        toast.success("Попытка завершена.")

        await completeAttempt(attemptId)

        localStorage.removeItem(`test_answers_${attemptId}`)

        setAllAnswers({})
        // toast.success("Ответы успешно отправлены. Попытка завершена.")
    }

    return (
        <div className={styles.questionsContainer}>
            <div className={styles.paginationContainer}>
                <TestPagination page={currentPage} totalPages={totalPages} changePage={handlePageChange} />
            </div>
            <div className={styles.questionHeader}>
                <h2>
                    Вопрос {currentPage} из {totalPages}
                </h2>
            </div>

            <div className={styles.questionContent}>
                <h3>{currentQuestion.text}</h3>

                {/* Отображение вариантов ответа */}
                <div className={styles.answerOptions}>
                    {currentQuestion.answers?.map((answer, index) => (
                        <div
                            key={index}
                            className={styles.answerOption}
                            onClick={handleAnswerOptionClick(
                                answer.id,
                                currentQuestion.type === QuestionType.SINGLE_CHOICE
                            )}>
                            {currentQuestion.type === QuestionType.SINGLE_CHOICE ? (
                                <input
                                    type="radio"
                                    id={`answer-${index}`}
                                    name="answer"
                                    checked={selectedAnswers.includes(answer.id)}
                                    onChange={() => {}}
                                />
                            ) : (
                                // <Checkbox
                                //     id={`answer-${index}`}
                                //     checked={selectedAnswers.includes(answer.id)}
                                //     onChange={handleCheckboxChange(answer.id)}
                                // />
                                <input
                                    type="checkbox"
                                    id={`answer-${index}`}
                                    name="answer"
                                    checked={selectedAnswers.includes(answer.id)}
                                    onChange={() => {}}
                                />
                            )}

                            <label htmlFor={`answer-${index}`}>{answer.text}</label>
                        </div>
                    ))}
                </div>
            </div>
            {currentPage === totalPages && (
                <div className={styles.submitContainer}>
                    <Button onClick={handleSubmitAnswers} disabled={isLoading || Object.keys(allAnswers).length === 0}>
                        {isLoading ? "Отправка..." : "Отправить ответы"}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Questions
