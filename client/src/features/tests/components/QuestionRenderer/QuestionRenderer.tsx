import ImageWithFallback from "@/shared/components/ImageWithFallback/ImageWithFallback"
import { QuestionType, QuestionTypeLabels, UserQuestionDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { getImageUrl } from "@/shared/utils"
import { formatSpaces } from "@/shared/utils/formatter"
import { ChangeEvent, FC, Fragment, useEffect, useState } from "react"
import styles from "./QuestionRenderer.module.scss"

export interface QuestionRendererProps {
	question: UserQuestionDTO
	selectedAnswers: string[]
	textAnswer: string
	isPreviewMode?: boolean
	isCompleted?: boolean
	onAnswerChange: (questionId: string, answers: string[]) => void
	onTextAnswerChange: (questionId: string, text: string) => void
	onNextQuestion?: () => void
	onSubmitAnswers?: () => void
	isLastQuestion?: boolean
	isLoading?: boolean
}

const QuestionRenderer: FC<QuestionRendererProps> = ({
	question,
	selectedAnswers,
	textAnswer,
	isPreviewMode = false,
	isCompleted = false,
	onAnswerChange,
	onTextAnswerChange,
	onNextQuestion,
	onSubmitAnswers,
	isLastQuestion = false,
	isLoading = false,
}) => {
	const [localTextAnswer, setLocalTextAnswer] = useState<string>(textAnswer)
	const [localSelectedAnswers, setLocalSelectedAnswers] = useState<string[]>(selectedAnswers)

	useEffect(() => {
		setLocalTextAnswer(textAnswer)
	}, [textAnswer])

	useEffect(() => {
		setLocalSelectedAnswers(selectedAnswers)
	}, [selectedAnswers])

	const handleAnswerOptionClick = (answerId: string, isSingleChoice: boolean) => () => {
		if (isCompleted || isPreviewMode) return

		const newAnswers = isSingleChoice
			? [answerId]
			: localSelectedAnswers.includes(answerId)
			? localSelectedAnswers.filter((id) => id !== answerId)
			: [...localSelectedAnswers, answerId]

		setLocalSelectedAnswers(newAnswers)
		onAnswerChange(question.id, newAnswers)
	}

	const handleCheckboxChange = (answerId: string) => (e: ChangeEvent<HTMLInputElement>) => {
		if (isCompleted || isPreviewMode) return

		const newAnswers = e.target.checked
			? [...localSelectedAnswers, answerId]
			: localSelectedAnswers.filter((id) => id !== answerId)

		setLocalSelectedAnswers(newAnswers)
		onAnswerChange(question.id, newAnswers)
	}

	const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		if (isCompleted || isPreviewMode) return

		setLocalTextAnswer(e.target.value)
		onTextAnswerChange(question.id, e.target.value)
	}

	const handleBlur = () => {
		if (isCompleted || isPreviewMode) return
		onTextAnswerChange(question.id, formatSpaces(localTextAnswer))
	}

	return (
		<>
			{question.image && (
				<div className={styles.questionImage}>
					<ImageWithFallback
						src={getImageUrl(question.image)}
						alt="изображение не загрузилось"
					/>
				</div>
			)}
			<div className={styles.questionContent}>
				<div className={styles.questionHeader}>
					{question.type !== QuestionType.FILL_IN_THE_BLANK ? <h3>{question.text}</h3> : <h3>Заполните пропуск</h3>}
					<h4 className={styles.questionType}>{QuestionTypeLabels[question.type].toLowerCase()}</h4>
				</div>

				<div className={styles.answerOptions}>
					{question.type === QuestionType.TEXT_INPUT ? (
						<textarea
							className={styles.textInput}
							value={localTextAnswer}
							onChange={handleTextChange}
							onBlur={handleBlur}
							disabled={isCompleted || isPreviewMode}
							placeholder="Введите ваш ответ..."
						/>
					) : question.type === QuestionType.FILL_IN_THE_BLANK ? (
						<div className={styles.fillInTheBlankContainer}>
							<div className={styles.questionWithBlank}>
								{question.text.split("{blank}").map((part, index, array) => (
									<Fragment key={index}>
										{part}
										{index < array.length - 1 && (
											<input
												type="text"
												className={styles.blankInput}
												value={localTextAnswer}
												onChange={handleTextChange}
												onBlur={handleBlur}
												disabled={isCompleted || isPreviewMode}
											/>
										)}
									</Fragment>
								))}
							</div>
						</div>
					) : (
						question.answers?.map((answer, index) => (
							<div
								key={answer.id}
								className={`${styles.answerOption} ${isCompleted || isPreviewMode ? styles.disabled : ""}`}
								onClick={handleAnswerOptionClick(answer.id, question.type === QuestionType.SINGLE_CHOICE)}
							>
								{question.type === QuestionType.SINGLE_CHOICE ? (
									<input
										type="radio"
										checked={localSelectedAnswers.includes(answer.id)}
										readOnly
										disabled={isCompleted || isPreviewMode}
									/>
								) : (
									<Checkbox
										id={`checkbox-${question.id}-${index}`}
										checked={localSelectedAnswers.includes(answer.id)}
										onChange={handleCheckboxChange(answer.id)}
										disabled={isCompleted || isPreviewMode}
									/>
								)}
								<label>{answer.text}</label>
							</div>
						))
					)}
				</div>

				{!isPreviewMode && (
					<div className={styles.actionButtons}>
						{isLastQuestion && !isCompleted && (
							<Button
								onClick={onSubmitAnswers}
								disabled={isLoading}
								className={styles.submitButton}
							>
								{isLoading ? "Отправка..." : "Отправить ответы"}
							</Button>
						)}
						{!isLastQuestion && !isCompleted && onNextQuestion && (
							<Button
								onClick={onNextQuestion}
								className={styles.submitButton}
							>
								Следующий вопрос
							</Button>
						)}
					</div>
				)}
				{isPreviewMode && (
					<div className={styles.actionButtons}>
						{isLastQuestion && !isCompleted && (
							<Button
								onClick={onSubmitAnswers}
								disabled
								className={styles.submitButton}
							>
								{isLoading ? "Отправка..." : "Отправить ответы"}
							</Button>
						)}
						{!isLastQuestion && !isCompleted && onNextQuestion && (
							<Button
								onClick={onNextQuestion}
								className={styles.submitButton}
							>
								Следующий вопрос
							</Button>
						)}
					</div>
				)}
			</div>
		</>
	)
}

export default QuestionRenderer
