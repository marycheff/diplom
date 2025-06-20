import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import Header from "@/shared/components/Header/Header"
import AttemptNotFound from "@/shared/components/NotFound/AttemptNotFound"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TestNotFound from "@/shared/components/NotFound/TestNotFound"
import {
	AttemptResultDTO,
	AttemptStatus,
	AttemptUserDTO,
	QuestionType,
	QuestionTypeLabels,
	UserTestDTO,
} from "@/shared/types"
import Loader from "@/shared/ui/Loader/Loader"
import { formatSeconds } from "@/shared/utils/formatter"
import { countCorrectAnswers } from "@/shared/utils/math"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./AttemptResultsPage.module.scss"

const AttemptResultsPage = () => {
	const { attemptId } = useParams<{ attemptId: string }>()
	const [attemptForUser, setAttemptForUser] = useState<AttemptUserDTO | null>(null)
	const [attempt, setAttempt] = useState<AttemptResultDTO | null>(null)
	const [test, setTest] = useState<UserTestDTO | null>(null)
	const { getTestSnapshotForAttempt } = useTestStore()
	const { isAdmin } = useAuthStore()
	const [isAttemptForUserLoaded, setIsAttemptForUserLoaded] = useState(false)
	const [isAttemptLoaded, setIsAttemptLoaded] = useState(false)
	const [isTestLoaded, setIsTestLoaded] = useState(false)
	const [error, setError] = useState<{ type: "attempt" | "test" } | null>(null)

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
			setAttemptForUser(fetchedAttempt || null)
			setIsAttemptForUserLoaded(true)

			if (!fetchedAttempt) {
				setError({ type: "attempt" })
			}
		} catch {
			setIsAttemptForUserLoaded(true)
			setError({ type: "attempt" })
		}
	}

	const fetchAttempt = async () => {
		try {
			const fetchedAttempt = await getAttemptResults(attemptId)
			setAttempt(fetchedAttempt || null)
			setIsAttemptLoaded(true)

			if (!fetchedAttempt) {
				setError({ type: "attempt" })
			}
		} catch {
			setIsAttemptLoaded(true)
			setError({ type: "attempt" })
		}
	}

	// Загрузка данных теста
	const fetchTest = async () => {
		try {
			if (!attemptForUser) return

			const fetchedTest = await getTestSnapshotForAttempt(attemptForUser.testSnapshotId!)
			setTest(fetchedTest || null)
			setIsTestLoaded(true)

			if (!fetchedTest) {
				setError({ type: "test" })
			}
		} catch {
			setIsTestLoaded(true)
			setError({ type: "test" })
		}
	}

	// Инициализация данных при монтировании
	useEffect(() => {
		fetchAttemptForUser()
	}, [attemptId])

	useEffect(() => {
		if (attemptForUser && attemptForUser.status !== AttemptStatus.IN_PROGRESS) {
			fetchTest()
			fetchAttempt()
		}
	}, [attemptForUser])

	// Состояния загрузки
	if (!isAttemptForUserLoaded || (attemptForUser && !isAttemptLoaded) || (attemptForUser && !isTestLoaded)) {
		return (
			<>
				<Header />
				<Loader centeredInParent />
			</>
		)
	}

	// Обработка ошибок
	if (error?.type === "attempt") return <AttemptNotFound />
	if (error?.type === "test") return <TestNotFound />
	if (!attemptForUser) return <AttemptNotFound />

	if (attemptForUser.status === AttemptStatus.IN_PROGRESS) {
		return (
			<>
				<Header />
				<NothingFound
					title="Попытка не завершена"
					description="Завершите попытку и вернитесь позже"
				/>
			</>
		)
	}

	if (attemptForUser.status === AttemptStatus.EXPIRED) {
		return (
			<>
				<Header />
				<NothingFound
					title="Попытка истекла"
					description="Попытка истекла. Посмотреть результаты невозможно"
				/>
			</>
		)
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
								<div className={styles.infoRow}>
									<span className={styles.label}>Времени потрачено:</span>
									{!attempt.timeSpent || attempt.timeSpent === 0 ? (
										<span className={styles.emptyField}>—</span>
									) : (
										<span className={styles.value}>{formatSeconds(attempt.timeSpent)}</span>
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
											<div
												key={question.question.id}
												className={styles.questionBlock}
											>
												<div className={styles.questionHeader}>
													<span className={styles.questionNumber}>{index + 1}</span>
													<span className={styles.questionText}>{question.question.text}</span>
													<span className={styles.questionType}>{QuestionTypeLabels[question.question.type]}</span>
												</div>
												{/* Вердикт по вопросу */}
												{question.userAnswers &&
													question.userAnswers.answers &&
													(() => {
														const correctAnswerIds = question.answers
															.filter((answer) => answer.isCorrect)
															.map((answer) => answer.id)
														const userAnswerIds = question.userAnswers.answers.map((answer) => answer.answer.id)
														const isCorrect =
															question.question.type === QuestionType.TEXT_INPUT ||
															question.question.type === QuestionType.FILL_IN_THE_BLANK
																? question.userAnswers.isCorrect
																: correctAnswerIds.length === userAnswerIds.length &&
																  correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
																  userAnswerIds.every((id) => correctAnswerIds.includes(id))

														return (
															<div
																className={`${styles.questionVerdict} ${
																	isCorrect ? styles.correctVerdict : styles.incorrectVerdict
																}`}
															>
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
														{question.answers.map((answer) => (
															<div
																key={answer.id}
																className={`${styles.answerItem} ${answer.isCorrect ? styles.correctAnswer : ""}`}
															>
																<span className={styles.answerText}>{answer.text}</span>
																{answer.isCorrect && <span className={styles.correctBadge}>Правильный</span>}
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
															question.question.type === QuestionType.FILL_IN_THE_BLANK) ? (
															<>
																{question.question.type === QuestionType.TEXT_INPUT ||
																question.question.type === QuestionType.FILL_IN_THE_BLANK ? (
																	<div className={styles.answerItemWrapper}>
																		<div
																			className={`${styles.answerItem} ${
																				question.userAnswers.isCorrect ? styles.correctAnswer : styles.incorrectAnswer
																			}`}
																		>
																			<span className={styles.answerText}>{question.userAnswers.textAnswer}</span>
																			{question.userAnswers.isCorrect ? (
																				<span className={styles.answerStatus}>Верно</span>
																			) : (
																				<span className={styles.redBadge}>Неверно</span>
																			)}
																		</div>
																	</div>
																) : (
																	question.userAnswers.answers.map((userAnswer) => (
																		<div
																			key={userAnswer.userAnswerId}
																			className={styles.answerItemWrapper}
																		>
																			<div
																				className={`${styles.answerItem} ${
																					userAnswer.answer.isCorrect ? styles.correctAnswer : styles.incorrectAnswer
																				}`}
																			>
																				<span className={styles.answerText}>{userAnswer.answer.text}</span>
																				{userAnswer.answer.isCorrect ? (
																					<span className={styles.answerStatus}>Верно</span>
																				) : (
																					<span className={styles.redBadge}>Неверно</span>
																				)}
																			</div>
																		</div>
																	))
																)}

																{/* Отображение пропущенных правильных ответов для вопросов с множественным выбором */}
																{question.question.type === QuestionType.MULTIPLE_CHOICE && (
																	<>
																		{(() => {
																			const correctAnswerIds = question.answers
																				.filter((answer) => answer.isCorrect)
																				.map((answer) => answer.id)
																			const userAnswerIds = question.userAnswers.answers.map(
																				(answer) => answer.answer.id
																			)
																			const missedCorrectAnswerIds = correctAnswerIds.filter(
																				(id) => !userAnswerIds.includes(id)
																			)
																			if (missedCorrectAnswerIds.length > 0) {
																				const missedCorrectAnswers = question.answers.filter((answer) =>
																					missedCorrectAnswerIds.includes(answer.id)
																				)
																				return (
																					<div className={styles.missedAnswersSection}>
																						<h4 className={styles.missedAnswersTitle}>
																							Пропущенные правильные ответы:
																						</h4>
																						{missedCorrectAnswers.map((answer) => (
																							<div
																								key={answer.id}
																								className={`${styles.answerItem} ${styles.missedAnswer}`}
																							>
																								<span className={styles.answerText}>{answer.text}</span>
																								<span className={styles.redBadge}>Пропущен</span>
																							</div>
																						))}
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
							<div className={styles.infoRow}>
								<span className={styles.label}>Времени потрачено:</span>
								{!attempt.timeSpent || attempt.timeSpent === 0 ? (
									<span className={styles.value}>
										<span className={styles.emptyField}>—</span>
									</span>
								) : (
									<span className={styles.value}>{formatSeconds(attempt.timeSpent)}</span>
								)}
							</div>
							{/* Краткий вердикт по каждому вопросу */}
							{attempt.questions?.length > 0 && (
								<div>
									<span className={styles.label}>Вердикт по вопросам:</span>
									<div className={styles.value}>
										{attempt.questions.map((question, index) => {
											if (!question.userAnswers || !question.userAnswers.answers) return null

											const correctAnswerIds = question.answers
												.filter((answer) => answer.isCorrect)
												.map((answer) => answer.id)
											const userAnswerIds = question.userAnswers.answers.map((answer) => answer.answer.id)
											const isCorrect =
												question.question.type === QuestionType.TEXT_INPUT ||
												question.question.type === QuestionType.FILL_IN_THE_BLANK
													? question.userAnswers.isCorrect
													: correctAnswerIds.length === userAnswerIds.length &&
													  correctAnswerIds.every((id) => userAnswerIds.includes(id)) &&
													  userAnswerIds.every((id) => correctAnswerIds.includes(id))

											return (
												<div
													key={question.question.id}
													className={`${styles.questionVerdict} ${
														isCorrect ? styles.correctVerdict : styles.incorrectVerdict
													}`}
												>
													<div className={styles.verdictLabel}>{question.question.text}</div>
													{/* <div className={styles.verdictValue}>{isCorrect ? "Ответ верный" : "Ответ неверный"}</div> */}
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
