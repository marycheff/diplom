import { ShortTestInfo } from "@/shared/types"
import { testDescriptionValidationRules, testTitleValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import ImageUpload from "@/shared/ui/ImageUpload/ImageUpload"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { FC, useCallback } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./TestInfoEditor.module.scss"

interface TestInfoEditorProps {
	data: ShortTestInfo
	onChangingComplete: (data: ShortTestInfo) => void
	onCancel?: () => void
}

const TestInfoEditor: FC<TestInfoEditorProps> = ({ data, onChangingComplete: onChangingComplete }) => {
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
			image: data.image,
		},
	})
	const currentValues = watch()
	const imageValue = watch("image")

	const handleImageSelect = useCallback(
		(base64Image: string) => {
			setValue("image", base64Image)
		},
		[setValue]
	)
	const hasErrors = Object.keys(formState.errors).length > 0
	const hasChanged =
		formatSpaces(currentValues.title) !== data.title ||
		formatSpaces(currentValues.description) !== data.description ||
		currentValues.image !== data.image
	const isFormValid = !hasErrors || !hasChanged

	const onSubmit: SubmitHandler<ShortTestInfo> = (data) => {
		onChangingComplete({
			title: data.title,
			description: data.description,
			image: data.image,
		})
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className={styles.form}
		>
			<div className={styles.formContentWrapper}>
				<div className={styles.formContent}>
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
						<div className={styles.section}>
							<span className={styles.imageUploadTitle}>Изображение теста</span>
							<ImageUpload
								onImageSelect={handleImageSelect}
								currentImage={imageValue}
								hideToggleButton
								type="test"
							/>
						</div>
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
