import ImageWithFallback from "@/shared/components/ImageWithFallback/ImageWithFallback"
import { QuestionType, QuestionTypeLabels, UserQuestionDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { getImageUrl } from "@/shared/utils"
import { formatSpaces } from "@/shared/utils/formatter"
import { ChangeEvent, FC, Fragment, memo, useCallback, useEffect, useMemo, useState } from "react"
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
	isImagePreloaded?: boolean
}

const QuestionRenderer: FC<QuestionRendererProps> = memo(
	({
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
		isImagePreloaded = false,
	}) => {
		const [localTextAnswer, setLocalTextAnswer] = useState<string>(textAnswer)
		const [localSelectedAnswers, setLocalSelectedAnswers] = useState<string[]>(selectedAnswers)

		useEffect(() => {
			setLocalTextAnswer(textAnswer)
		}, [textAnswer])

		useEffect(() => {
			setLocalSelectedAnswers(selectedAnswers)
		}, [selectedAnswers])

		// Мемоизация проверок состояния
		const isInteractionDisabled = useMemo(() => isCompleted || isPreviewMode, [isCompleted, isPreviewMode])

		const isSingleChoice = useMemo(() => question.type === QuestionType.SINGLE_CHOICE, [question.type])

		const isTextInput = useMemo(
			() => question.type === QuestionType.TEXT_INPUT || question.type === QuestionType.FILL_IN_THE_BLANK,
			[question.type]
		)

		// Мемоизированные обработчики
		const handleAnswerOptionClick = useCallback(
			(answerId: string) => {
				if (isInteractionDisabled) return

				const newAnswers = isSingleChoice
					? [answerId]
					: localSelectedAnswers.includes(answerId)
					? localSelectedAnswers.filter((id) => id !== answerId)
					: [...localSelectedAnswers, answerId]

				setLocalSelectedAnswers(newAnswers)
				onAnswerChange(question.id, newAnswers)
			},
			[isInteractionDisabled, isSingleChoice, localSelectedAnswers, onAnswerChange, question.id]
		)

		const handleCheckboxChange = useCallback(
			(answerId: string) => (e: ChangeEvent<HTMLInputElement>) => {
				if (isInteractionDisabled) return

				const newAnswers = e.target.checked
					? [...localSelectedAnswers, answerId]
					: localSelectedAnswers.filter((id) => id !== answerId)

				setLocalSelectedAnswers(newAnswers)
				onAnswerChange(question.id, newAnswers)
			},
			[isInteractionDisabled, localSelectedAnswers, onAnswerChange, question.id]
		)

		const handleTextChange = useCallback(
			(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
				if (isInteractionDisabled) return

				const value = e.target.value
				setLocalTextAnswer(value)
				onTextAnswerChange(question.id, value)
			},
			[isInteractionDisabled, onTextAnswerChange, question.id]
		)

		const handleBlur = useCallback(() => {
			if (isInteractionDisabled) return
			onTextAnswerChange(question.id, formatSpaces(localTextAnswer))
		}, [isInteractionDisabled, onTextAnswerChange, question.id, localTextAnswer])

		// Мемоизация заголовка вопроса
		const questionTitle = useMemo(
			() => (question.type !== QuestionType.FILL_IN_THE_BLANK ? question.text : "Заполните пропуск"),
			[question.type, question.text]
		)

		// Мемоизация разделенного текста для fill-in-the-blank
		const questionParts = useMemo(() => {
			if (question.type !== QuestionType.FILL_IN_THE_BLANK) return null
			return question.text.split("____")
		}, [question.type, question.text])

		// Мемоизация параметров изображения
		const imageProps = useMemo(() => {
			if (!question.image) return null

			return {
				src: getImageUrl(question.image),
				alt: "изображение не загрузилось",
				loading: isImagePreloaded ? ("eager" as const) : ("lazy" as const),
				priority: isImagePreloaded,
				preload: isImagePreloaded,
			}
		}, [question.image, isImagePreloaded])

		return (
			<>
				{question.image && imageProps && (
					<div className={styles.questionImage}>
						<ImageWithFallback {...imageProps} />
					</div>
				)}
				<div className={styles.questionContent}>
					<div className={styles.questionHeader}>
						<h3>{questionTitle}</h3>
						<h4 className={styles.questionType}>{QuestionTypeLabels[question.type].toLowerCase()}</h4>
					</div>

					<div className={styles.answerOptions}>
						{question.type === QuestionType.TEXT_INPUT ? (
							<textarea
								className={styles.textInput}
								value={localTextAnswer}
								onChange={handleTextChange}
								onBlur={handleBlur}
								disabled={isInteractionDisabled}
								placeholder="Введите ваш ответ..."
							/>
						) : question.type === QuestionType.FILL_IN_THE_BLANK && questionParts ? (
							<div className={styles.fillInTheBlankContainer}>
								<div className={styles.questionWithBlank}>
									{questionParts.map((part, index) => (
										<Fragment key={index}>
											{part}
											{index < questionParts.length - 1 && (
												<input
													type="text"
													className={styles.blankInput}
													value={localTextAnswer}
													onChange={handleTextChange}
													onBlur={handleBlur}
													disabled={isInteractionDisabled}
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
									className={`${styles.answerOption} ${isInteractionDisabled ? styles.disabled : ""}`}
									onClick={() => handleAnswerOptionClick(answer.id)}
								>
									{isSingleChoice ? (
										<input
											type="radio"
											checked={localSelectedAnswers.includes(answer.id)}
											readOnly
											disabled={isInteractionDisabled}
										/>
									) : (
										<Checkbox
											id={`checkbox-${question.id}-${index}`}
											checked={localSelectedAnswers.includes(answer.id)}
											onChange={handleCheckboxChange(answer.id)}
											disabled={isInteractionDisabled}
										/>
									)}
									<label>{answer.text}</label>
								</div>
							))
						)}
					</div>

					{(!isPreviewMode || isPreviewMode) && (
						<div className={styles.actionButtons}>
							{isLastQuestion && !isCompleted && (
								<Button
									onClick={onSubmitAnswers}
									disabled={isLoading || (isPreviewMode && true)}
									className={styles.submitButton}
								>
									{isLoading ? "Отправка..." : "Отправить ответы"}
								</Button>
							)}
							{!isLastQuestion && !isCompleted && onNextQuestion && (
								<Button
									onClick={onNextQuestion}
									className={styles.submitButton}
									disabled={isPreviewMode}
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
)

QuestionRenderer.displayName = "QuestionRenderer"

export default QuestionRenderer
