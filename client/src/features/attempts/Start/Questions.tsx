import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { QuestionType, TestAttemptDTO, UserTestDTO } from "@/shared/types"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import Loader from "@/shared/ui/Loader/Loader"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
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
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const handleCheckboxChange = (answerId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedAnswers([...selectedAnswers, answerId])
        } else {
            setSelectedAnswers(selectedAnswers.filter(id => id !== answerId))
        }
    }

    const { isFetching: isTestFetching, getTestForUserById } = useTestStore()
    const { isFetching: isAttemptFetching, getAttemptById } = useAttemptStore()

    const [test, setTest] = useState<UserTestDTO | null>(null)
    const [attempt, setAttempt] = useState<TestAttemptDTO | null>(null)
    const [currentPage, setCurrentPage] = useState(1)

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
        setCurrentPage(newPage)
    }

    if (questions.length === 0) {
        return <div>В тесте нет вопросов</div>
    }

    const currentQuestion = questions[currentPage - 1]
    const handleAnswerOptionClick = (answerId: string, isSingleChoice: boolean) => () => {
        if (isSingleChoice) {
            // For radio buttons, just set the selected answer
            setSelectedAnswers([answerId])
        } else {
            // For checkboxes, toggle the selection
            if (selectedAnswers.includes(answerId)) {
                setSelectedAnswers(selectedAnswers.filter(id => id !== answerId))
            } else {
                setSelectedAnswers([...selectedAnswers, answerId])
            }
        }
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
                                <Checkbox
                                    id={`answer-${index}`}
                                    checked={selectedAnswers.includes(answer.id)}
                                    onChange={handleCheckboxChange(answer.id)}
                                />
                            )}

                            <label htmlFor={`answer-${index}`}>{answer.text}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Questions
