import { ShortTestInfo } from "@/shared/types"
import { testDescriptionValidationRules, testTitleValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./TestInfoEditor.module.scss"
interface TestInfoEditorProps {
	data: ShortTestInfo
	onChangingComplete: (data: ShortTestInfo) => void
	onCancel?: () => void
}

const TestInfoEditor: FC<TestInfoEditorProps> = ({ data, onChangingComplete: onChangingComplete }) => {
	const onSubmit: SubmitHandler<ShortTestInfo> = (data) => {
		onChangingComplete({
			title: data.title,
			description: data.description,
		})
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		formState,
		watch,
		trigger,
	} = useForm<ShortTestInfo>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
		defaultValues: {
			title: data.title,
			description: data.description,
		},
	})
	const currentValues = watch()

	const hasErrors = Object.keys(formState.errors).length > 0
	const hasChanged =
		formatSpaces(currentValues.title) !== data.title || formatSpaces(currentValues.description) !== data.description
	const isFormValid = !hasErrors || !hasChanged

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>
			<div className={styles.formContentWrapper}>
				<div className={styles.formContent}>
					{/* Секция с основными полями */}
					<div className={styles.section}>
						<ValidatedInput
							trigger={trigger}
							name="title"
							placeholder="Название (обязательно)"
							register={register}
							setValue={setValue}
							errors={errors.title}
							validationRules={testTitleValidationRules}
							className={styles.titleInput}
						/>

						<ValidatedInput
							trigger={trigger}
							multiline
							name="description"
							placeholder="Описание"
							register={register}
							setValue={setValue}
							className={styles.descriptionInput}
							validationRules={testDescriptionValidationRules}
							rows={4}
						/>
					</div>
				</div>

				<div className={styles.formActions}>
					<Button
						type="submit"
						disabled={!isFormValid || !hasChanged}
						className={styles.submitButton}
					>
						Сохранить
					</Button>
				</div>
			</div>
		</form>
	)
}

export default TestInfoEditor
