import { GenerateAnswerFormData } from "@/shared/types"
import { answerValidationRules, questionValidationFillInTextRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import ImageUpload from "@/shared/ui/ImageUpload/ImageUpload"
import { ValidatedInput } from "@/shared/ui/Input"
import { FC, FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form"
import BlankMarkerDisplay from "../BlankMarkerDisplay/BlankMarkerDisplay"
import styles from "./FillInTheBlankQuestionForm.module.scss"

interface FillInTheBlankFormData {
	question: string
	answer: string
	numOfAnswers?: number
}

interface FillInTheBlankQuestionFormProps {
	register: UseFormRegister<GenerateAnswerFormData & FillInTheBlankFormData>
	errors?: FieldErrors<GenerateAnswerFormData & FillInTheBlankFormData>
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	setValue: UseFormSetValue<GenerateAnswerFormData & FillInTheBlankFormData>
	trigger: UseFormTrigger<GenerateAnswerFormData & FillInTheBlankFormData>
	isEditing?: boolean
	watch: UseFormWatch<GenerateAnswerFormData & FillInTheBlankFormData>
}

const FillInTheBlankQuestionForm: FC<FillInTheBlankQuestionFormProps> = ({
	register,
	errors,
	onSubmit,
	setValue,
	trigger,
	isEditing = false,
	watch,
}) => {
	const imageValue = watch("image")
	const questionValue = watch("question")

	const handleImageSelect = useCallback(
		(base64Image: string) => {
			setValue("image", base64Image)
		},
		[setValue]
	)

	const [hasBlank, setHasBlank] = useState(false)
	const [displayValue, setDisplayValue] = useState("")

	const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

	const hasBlankMarker = (value: string): boolean => value.includes("____")

	// Отслеживание изменений вопроса через watch
	useEffect(() => {
		const value = questionValue || ""
		updateDisplayValue(value)
		setHasBlank(hasBlankMarker(value))
	}, [questionValue])

	// Проверка наличия маркера при инициализации формы (для режима редактирования)
	useEffect(() => {
		const checkInitialValue = () => {
			const value = questionValue || ""
			setHasBlank(hasBlankMarker(value))
			updateDisplayValue(value)
		}

		// Выполнение проверки с небольшой задержкой, чтобы значение успело установиться
		setTimeout(checkInitialValue, 0)
	}, [isEditing, questionValue])

	// Функция для форматирования отображаемого текста с заменой маркера на визуальный элемент
	const updateDisplayValue = (value: string) => {
		setDisplayValue(value)
	}

	// Функция для преобразования текста с маркером ____ в React элементы
	const formatTextWithBlank = (text: string): ReactNode[] => {
		if (!text) return []

		const parts = text.split("____")
		if (parts.length === 1) return [text] // нет маркера
		const result: ReactNode[] = []
		let blankInserted = false
		parts.forEach((part, index) => {
			if (index > 0 && !blankInserted) {
				// Вставка BlankMarkerDisplay только один раз
				result.push(<BlankMarkerDisplay key={`blank`} />)
				blankInserted = true
			} else if (index > 0) {
				result.push(<span key={`extra-blank-${index}`}>____</span>)
			}
			if (part) {
				result.push(<span key={`text-${index}`}>{part}</span>)
			}
		})

		return result
	}

	// Функция для вставки маркера пропуска с пробелами по бокам
	const insertBlankMarker = () => {
		if (inputRef.current && !hasBlank) {
			const input = inputRef.current
			const cursorPosition = input.selectionStart || 0
			const currentValue = input.value

			const needSpaceBefore = cursorPosition > 0 && currentValue[cursorPosition - 1] !== " "
			// const needSpaceAfter = cursorPosition < currentValue.length && currentValue[cursorPosition] !== " "

			// Формирование маркера с пробелами при необходимости
			const markerWithSpaces = (needSpaceBefore ? " " : "") + "____" + " "
			// (needSpaceAfter ? " " : "")

			// Вставка маркера в позицию курсора
			const newValue =
				currentValue.substring(0, cursorPosition) + markerWithSpaces + currentValue.substring(cursorPosition)

			// Обновление значения в форме
			setValue("question", newValue, { shouldValidate: true })
			// Добавляем немедленное обновление displayValue
			updateDisplayValue(newValue)
			setHasBlank(true)

			// Установка фокуса и позиции курсора после вставленного маркера
			const newCursorPosition = cursorPosition + markerWithSpaces.length
			setTimeout(() => {
				input.focus()
				input.setSelectionRange(newCursorPosition, newCursorPosition)
			}, 0)
		}
	}

	// Функция для удаления маркера пропуска
	const removeBlankMarker = () => {
		if (inputRef.current && hasBlank) {
			const input = inputRef.current
			const currentValue = input.value

			// Находим позицию маркера
			const blankPosition = currentValue.indexOf("____")
			if (blankPosition !== -1) {
				// Проверка наличия пробелов до и после маркера для удаления
				const hasPrevSpace = blankPosition > 0 && currentValue[blankPosition - 1] === " "
				const hasNextSpace = blankPosition + 7 < currentValue.length && currentValue[blankPosition + 7] === " "

				// Определение начала и конца для удаления (включая пробелы, если они были добавлены автоматически)
				const startPos = hasPrevSpace ? blankPosition - 1 : blankPosition
				const endPos = hasNextSpace ? blankPosition + 8 : blankPosition + 7

				// Удаление маркера и пробелов
				const newValue = currentValue.substring(0, startPos) + currentValue.substring(endPos)

				// Обновление значения в форме
				setValue("question", newValue, { shouldValidate: true })
				setHasBlank(false)

				// Установка фокуса и позиции курсора
				setTimeout(() => {
					input.focus()
					input.setSelectionRange(startPos, startPos)
				}, 0)
			}
		}
	}

	return (
		<form
			onSubmit={onSubmit}
			className={styles.form}
		>
			<div className={styles.questionInputContainer}>
				<ValidatedInput
					clearable
					placeholder="Вопрос"
					name="question"
					trigger={trigger}
					register={register}
					setValue={setValue}
					errors={errors?.question}
					multiline
					validationRules={questionValidationFillInTextRules}
					inputRef={(element) => {
						inputRef.current = element
					}}
				/>
				{/* <br /> */}
				<ValidatedInput
					clearable
					placeholder="Правильный ответ"
					name="answer"
					trigger={trigger}
					register={register}
					setValue={setValue}
					errors={errors?.answer}
					validationRules={answerValidationRules}
				/>

				{/* Отображение текста с визуальным представлением пропуска */}
				{displayValue && (
					<div className={styles.previewContainer}>
						<div className={styles.previewLabel}>Предпросмотр:</div>
						<div className={styles.previewContent}>{formatTextWithBlank(displayValue)}</div>
					</div>
				)}

				<div className={styles.blankButtonsContainer}>
					<Button
						type="button"
						onClick={insertBlankMarker}
						className={styles.insertBlankButton}
						disabled={hasBlank}
					>
						Вставить пропуск
					</Button>
					<Button
						type="button"
						onClick={removeBlankMarker}
						className={styles.removeBlankButton}
						disabled={!hasBlank}
						variant="secondary"
					>
						Удалить пропуск
					</Button>
				</div>
			</div>

			<ImageUpload
				onImageSelect={handleImageSelect}
				currentImage={imageValue}
			/>
		</form>
	)
}

export default FillInTheBlankQuestionForm
