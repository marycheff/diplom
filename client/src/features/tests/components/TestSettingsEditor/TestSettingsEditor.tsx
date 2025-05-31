import { PreTestUserData, PreTestUserDataLabels, TestSettingsDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import QuestionButton from "@/shared/ui/Button/Question/QuestionButton"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { formatSpaces } from "@/shared/utils/formatter"
import { arraysEqual } from "@/shared/utils/math"
import { ChangeEvent, FC, useEffect, useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./TestSettingsEditor.module.scss"

interface TestSettingsEditorProps {
	settings: TestSettingsDTO
	onSettingsComplete: (settings: TestSettingsDTO) => void
	onCancel: () => void
}

const TestSettingsEditor: FC<TestSettingsEditorProps> = ({ onSettingsComplete, onCancel, settings }) => {
	const initialValues = {
		requireRegistration: settings.requireRegistration ? "Да" : "Нет",
		showDetailedResults: settings.showDetailedResults ? "Да" : "Нет",
		shuffleQuestions: settings.shuffleQuestions ? "Да" : "Нет",
		shuffleAnswers: settings.shuffleAnswers ? "Да" : "Нет",
		allowRetake: settings.allowRetake ? "Да" : "Нет",
		inputFields: settings.inputFields || [],
		retakeLimit: settings.retakeLimit,
		hours: Math.floor((settings.timeLimit ?? 0) / 3600),
		minutes: Math.floor(((settings.timeLimit ?? 0) % 3600) / 60),
		seconds: (settings.timeLimit ?? 0) % 60,
	}
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
		defaultValues: initialValues,
	})

	const watchedValues = watch()
	const { inputFields, requireRegistration } = watch()

	useEffect(() => {
		if (requireRegistration === "Нет") {
			setValue("allowRetake", "Да")
		}
	}, [requireRegistration, setValue])

	const isChanged = useMemo(() => {
		// Проверка для строковых полей с форматированием пробелов
		if (
			formatSpaces(watchedValues.requireRegistration) !== formatSpaces(initialValues.requireRegistration) ||
			formatSpaces(watchedValues.showDetailedResults) !== formatSpaces(initialValues.showDetailedResults) ||
			formatSpaces(watchedValues.shuffleQuestions) !== formatSpaces(initialValues.shuffleQuestions) ||
			formatSpaces(watchedValues.shuffleAnswers) !== formatSpaces(initialValues.shuffleAnswers) ||
			formatSpaces(watchedValues.allowRetake) !== formatSpaces(initialValues.allowRetake)
		) {
			return true
		}

		// Проверка для массива inputFields
		if (!arraysEqual(watchedValues.inputFields, initialValues.inputFields)) {
			return true
		}

		// Проверка для числовых полей
		if (
			watchedValues.hours !== initialValues.hours ||
			watchedValues.minutes !== initialValues.minutes ||
			watchedValues.seconds !== initialValues.seconds ||
			watchedValues.retakeLimit !== initialValues.retakeLimit
		) {
			return true
		}

		return false
	}, [watchedValues, initialValues])

	const onSubmit: SubmitHandler<any> = (data) => {
		// Сортировка inputFields в соответствии с порядком в PreTestUserData
		const sortedInputFields = Object.values(PreTestUserData).filter((field) => data.inputFields.includes(field))

		onSettingsComplete({
			requireRegistration: data.requireRegistration === "Да",
			showDetailedResults: data.showDetailedResults === "Да",
			shuffleQuestions: data.shuffleQuestions === "Да",
			shuffleAnswers: data.shuffleAnswers === "Да",
			allowRetake: data.allowRetake === "Да",
			retakeLimit: Number(data.retakeLimit) === 0 ? null : Number(data.retakeLimit),
			timeLimit: Number(data.hours) * 3600 + Number(data.minutes) * 60 + Number(data.seconds),
			inputFields: sortedInputFields,
		})
	}

	const handleCheckboxChange = (field: PreTestUserData) => (event: ChangeEvent<HTMLInputElement>) => {
		const newInputFields = event.target.checked ? [...inputFields, field] : inputFields.filter((f) => f !== field)
		setValue("inputFields", newInputFields)
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>
			<div className={styles.formContentWrapper}>
				<div className={styles.formContent}>
					{/* Блок 1: Настройки переключателей */}
					<div className={styles.section}>
						<div className={styles.selectWithQuestion}>
							<Select
								register={register}
								label="Требуется регистрация: "
								name="requireRegistration"
								options={[
									{ value: "Да", label: "Да" },
									{ value: "Нет", label: "Нет" },
								]}
								value={settings.requireRegistration ? "Да" : "Нет"}
							/>
							<QuestionButton tooltip="Пользователь должен авторизоваться, прежде чем начать тест" />
						</div>
						<Select
							register={register}
							label="Показывать детальные результаты: "
							name="showDetailedResults"
							options={[
								{ value: "Да", label: "Да" },
								{ value: "Нет", label: "Нет" },
							]}
							value={settings.showDetailedResults ? "Да" : "Нет"}
						/>
						<br />
						<Select
							register={register}
							label="Перемешивать вопросы: "
							name="shuffleQuestions"
							options={[
								{ value: "Да", label: "Да" },
								{ value: "Нет", label: "Нет" },
							]}
							value={settings.shuffleQuestions ? "Да" : "Нет"}
						/>
						<br />
						<Select
							register={register}
							label="Перемешивать варианты ответов: "
							name="shuffleAnswers"
							options={[
								{ value: "Да", label: "Да" },
								{ value: "Нет", label: "Нет" },
							]}
							value={settings.shuffleAnswers ? "Да" : "Нет"}
						/>
						<br />

						<div className={styles.selectWithQuestion}>
							<Select
								register={register}
								label="Разрешить повторное прохождение:"
								name="allowRetake"
								options={[
									{ value: "Да", label: "Да" },
									{ value: "Нет", label: "Нет" },
								]}
								value={settings.allowRetake ? "Да" : "Нет"}
								disabled={watchedValues.requireRegistration !== "Да"}
							/>
							<QuestionButton tooltip="Эта настройка доступна только при включенной опции 'Требуется регистрация'." />
							<div className={styles.limitInput}>
								<ValidatedInput
									placeholder="Лимит"
									type="number"
									className={styles.timeInput}
									name="retakeLimit"
									trigger={trigger}
									register={register}
									setValue={setValue}
									errors={errors.retakeLimit}
									disabled={watchedValues.allowRetake !== "Да"}
									validationRules={{
										min: { value: 1, message: "Минимум 1 раз" },
										max: { value: 20, message: "Максимум 20 раз" },
										validate: (value) => !isNaN(Number(value)) || "Некорректное значение",
									}}
								/>
							</div>
						</div>
					</div>

					{/* Блок 2: Поля ввода */}
					<div className={styles.section}>
						<span className={styles.sectionLabel}>Поля ввода ({inputFields.length}):</span>
						<div className={styles.checkboxGroup}>
							{Object.entries(PreTestUserDataLabels).map(([key, label]) => (
								<Checkbox
									key={key}
									id={`inputField-${key}`}
									label={label}
									checked={inputFields.includes(key as PreTestUserData)}
									onChange={handleCheckboxChange(key as PreTestUserData)}
								/>
							))}
						</div>
					</div>

					{/* Блок 3: Лимит времени */}
					<div className={styles.section}>
						<span className={styles.sectionLabel}>Лимит времени:</span>
						<div className={styles.timeInputs}>
							<div className={styles.timeInputWrapper}>
								<span className={styles.timeLabel}>Часы</span>
								<ValidatedInput
									className={styles.timeInput}
									type="number"
									name="hours"
									trigger={trigger}
									register={register}
									setValue={setValue}
									errors={errors.hours}
									validationRules={{
										required: "Обязательное поле",
										min: { value: 0, message: "Минимум 0 часов" },
										max: { value: 4, message: "Максимум 4 часа" },
										validate: (value) => !isNaN(Number(value)) || "Некорректное значение",
									}}
								/>
							</div>
							<div className={styles.timeInputWrapper}>
								<span className={styles.timeLabel}>Минуты</span>
								<ValidatedInput
									className={styles.timeInput}
									type="number"
									name="minutes"
									register={register}
									trigger={trigger}
									setValue={setValue}
									errors={errors.minutes}
									validationRules={{
										required: "Обязательное поле",
										min: { value: 0, message: "Минимум 0 минут" },
										max: { value: 59, message: "Максимум 59 минут" },
										validate: (value) => !isNaN(Number(value)) || "Некорректное значение",
									}}
								/>
							</div>
							<div className={styles.timeInputWrapper}>
								<span className={styles.timeLabel}>Секунды</span>
								<ValidatedInput
									className={styles.timeInput}
									type="number"
									name="seconds"
									trigger={trigger}
									register={register}
									setValue={setValue}
									errors={errors.seconds}
									validationRules={{
										required: "Обязательное поле",
										min: { value: 0, message: "Минимум 0 секунд" },
										max: { value: 59, message: "Максимум 59 секунд" },
										validate: (value) => !isNaN(Number(value)) || "Некорректное значение",
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.formActions}>
					<Button
						type="button"
						onClick={onCancel}
					>
						Отмена
					</Button>
					<Button
						type="submit"
						disabled={!isChanged}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</form>
	)
}

export default TestSettingsEditor
