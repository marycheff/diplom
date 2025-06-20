import TestTimer from "@/features/attempts/components/Timer/TestTimer"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import QuestionRenderer from "@/features/tests/components/QuestionRenderer/QuestionRenderer"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import Header from "@/shared/components/Header/Header"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import { useImagePreloader } from "@/shared/hooks/useImagePreloader"
import { usePreventLeave } from "@/shared/hooks/usePreventLeave"
import { useTestSocket } from "@/shared/hooks/useTestSocket"
import { AttemptAnswer, AttemptStatus, AttemptUserDTO, UserTestDTO } from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal } from "@/shared/ui/Modal"
import TestPagination from "@/shared/ui/Pagination/TestPagination/TestPagination"
import { getImageUrl } from "@/shared/utils"
import { getDecryptedTime, saveEncryptedTime } from "@/shared/utils/crypto"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { generatePath, useNavigate, useParams } from "react-router-dom"
import styles from "./TestTaking.module.scss"

const TestTaking = () => {
	// Параметры маршрута
	const { attemptId } = useParams<{ attemptId: string }>()
	const timerRef = useRef<{ syncTime: () => Promise<void> }>(null)

	// Состояния компонента
	const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
	const [textAnswer, setTextAnswer] = useState<string>("")
	const [allAnswers, setAllAnswers] = useState<Record<string, string[]>>({})
	const [allTextAnswers, setAllTextAnswers] = useState<Record<string, string>>({})
	const [test, setTest] = useState<UserTestDTO | null>(null)
	const [attempt, setAttempt] = useState<AttemptUserDTO | null>(null)
	const [currentPage, setCurrentPage] = useState(1)
	const [timeLimit, setTimeLimit] = useState(0)
	const [isAttemptLoaded, setIsAttemptLoaded] = useState(false)
	const [isTestLoaded, setIsTestLoaded] = useState(false)

	const navigate = useNavigate()

	// Хуки из store
	const { getTestForAttempt } = useTestStore()
	const { getAttemptForUserById, saveAnswers, completeAttempt, isLoading } = useAttemptStore()
	const isSubmittingRef = useRef<boolean>(false)
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

			attempt.answers.forEach((answer) => {
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
		} catch (error) {
			setIsAttemptLoaded(true)
			setIsTestLoaded(true)
			return <AttemptNotFound />
		}
	}

	// Загрузка данных теста
	const fetchTest = async () => {
		try {
			if (!attempt) return
			const fetchedTest = await getTestForAttempt(attempt.testId, attemptId)
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

	const [showUpdateModal, setShowUpdateModal] = useState(false)

	useTestSocket(attempt?.testId || "", () => {
		if (attempt && !isAttemptCompleted && !isSubmittingRef.current) {
			fetchTest()
			setShowUpdateModal(true)
		}
	})

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

	const { isImagePreloaded } = useImagePreloader({
		questions: test?.questions || [],
		currentPage,
		preloadRadius: 3, // Предзагрузка 3 вопросов вперед и назад
		priority: true,
	})

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
		if (isSubmittingRef.current || isAttemptCompleted) return
		toast.error("Время закончилось. Ваши ответы будут отправлены автоматически.", {
			duration: 5000, // 5 секунд
		})
		await submitAnswers()
	}

	// Вспомогательные функции
	const saveCurrentQuestionAnswers = () => {
		if (!currentQuestion) return
		if (currentQuestion.type === "TEXT_INPUT" || currentQuestion.type === "FILL_IN_THE_BLANK") {
			setAllTextAnswers((prev) => ({ ...prev, [currentQuestion.id]: textAnswer }))
		} else {
			setAllAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedAnswers }))
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
		setAllAnswers((prev) => ({ ...prev, [questionId]: answers }))
		updateAnswerTime(questionId)
	}

	// Обработчик изменения текстового ответа
	const handleTextAnswerChange = (questionId: string, text: string) => {
		setTextAnswer(text)
		setAllTextAnswers((prev) => ({ ...prev, [questionId]: text }))
		updateAnswerTime(questionId)
	}

	// Состояние для модального окна подтверждения
	const [showConfirmationModal, setShowConfirmationModal] = useState(false)
	const [pendingSubmit, setPendingSubmit] = useState(false)

	// Отправка результатов
	const handleSubmitAnswers = async () => {
		saveCurrentQuestionAnswers()

		// Проверка, что не на все вопросы есть заполненные ответы
		const hasUnansweredQuestions = test?.questions?.some((question) => {
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
		if (isSubmittingRef.current || isAttemptCompleted) {
			return
		}
		isSubmittingRef.current = true

		try {
			if (!test || !test.questions) return

			// Фильтрация ответов
			const filteredAnswers = Object.fromEntries(
				Object.entries(allAnswers).filter(([questionId]) => test.questions!.some((q) => q.id === questionId))
			)
			const filteredTextAnswers = Object.fromEntries(
				Object.entries(allTextAnswers).filter(([questionId]) => test.questions!.some((q) => q.id === questionId))
			)

			// Обновление состояния
			setAllAnswers(filteredAnswers)
			setAllTextAnswers(filteredTextAnswers)

			// Очистка localStorage от удаленных вопросов
			Object.keys(allAnswers).forEach((qId) => {
				if (!test.questions!.some((q) => q.id === qId)) {
					localStorage.removeItem(`answer_time_${attemptId}_${qId}`)
				}
			})

			const formattedAnswers: AttemptAnswer[] = []

			// Форматирование обычных ответов
			Object.entries(filteredAnswers).forEach(([questionId, answersIds]) => {
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
			Object.entries(filteredTextAnswers).forEach(([questionId, textAnswer]) => {
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
			Object.keys(allAnswers).forEach((qId) => localStorage.removeItem(`answer_time_${attemptId}_${qId}`))
			Object.keys(allTextAnswers).forEach((qId) => localStorage.removeItem(`answer_time_${attemptId}_${qId}`))

			toast.success("Ответы успешно отправлены. Попытка завершена.")
			if (attempt) {
				navigate(generatePath(ROUTES.ATTEMPT_RESULTS, { attemptId: attempt.id }))
			} else {
				navigate(ROUTES.HOME)
			}

			setAllAnswers({})
			setAllTextAnswers({})
		} catch (error) {
			console.error("Ошибка при отправке ответов:", error)
		} finally {
			isSubmittingRef.current = false
		}
	}

	// Состояния загрузки
	if (!isAttemptLoaded || !isTestLoaded) {
		return (
			<>
				<Header />
				<Loader centeredInParent />
			</>
		)
	}

	// После загрузки проверяем наличие данных
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
			<Header />
			<div className={styles.questionsContainer}>
				{isAttemptCompleted && (
					<div className={styles.completedBanner}>Попытка завершена. Изменение ответов недоступно.</div>
				)}

				{timeLimit > 0 && !isAttemptCompleted && (
					<TestTimer
						ref={timerRef}
						attemptId={attemptId}
						timeLimit={timeLimit}
						startedAt={attempt?.startedAt || new Date()}
						onTimeExpired={handleTimeExpired}
					/>
				)}

				<TestPagination
					page={currentPage}
					totalPages={totalPages}
					changePage={handlePageChange}
				/>

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
					isImagePreloaded={currentQuestion.image ? isImagePreloaded(getImageUrl(currentQuestion.image)) : false}
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
					cancelText="Отмена"
				>
					<p>Вы ответили не на все вопросы. Вы уверены, что хотите отправить ответы?</p>
				</ConfirmationModal>

				<ConfirmationModal
					isOpen={showUpdateModal}
					onClose={() => setShowUpdateModal(false)}
					onConfirm={() => setShowUpdateModal(false)}
					title="Обновление теста"
					confirmText="Ок"
					hideCancel={true}
				>
					<p>Тест был обновлен автором. Изменения вступили в силу</p>
				</ConfirmationModal>
			</div>
		</>
	)
}

export default TestTaking
