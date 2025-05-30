import { GenerateAnswerFormData } from "@/shared/types"
import { answerValidationRules, questionValidationRules } from "@/shared/types/utils/validationRules"
import { AIButton } from "@/shared/ui/Button"
import ImageUpload from "@/shared/ui/ImageUpload/ImageUpload"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { FC, FormEvent, useCallback } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form"

interface QuestionFormProps {
	register: UseFormRegister<GenerateAnswerFormData>
	errors?: FieldErrors<GenerateAnswerFormData>
	isGenerating: boolean
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
	isButtonDisabled: boolean
	setValue: UseFormSetValue<GenerateAnswerFormData>
	trigger: UseFormTrigger<GenerateAnswerFormData>
	watch: UseFormWatch<GenerateAnswerFormData>
	withGenerateButton?: boolean
}

const QuestionForm: FC<QuestionFormProps> = ({
	register,
	errors,
	isButtonDisabled,
	isGenerating,
	onSubmit,
	setValue,
	trigger,
	watch,
	withGenerateButton = true
}) => {
	const imageValue = watch("image")

	const handleImageSelect = useCallback(
		(base64Image: string) => {
			setValue("image", base64Image)
		},
		[setValue]
	)

	return (
		<form onSubmit={onSubmit}>
			<ValidatedInput
				placeholder="Вопрос"
				name="question"
				trigger={trigger}
				register={register}
				setValue={setValue}
				errors={errors?.question}
				validationRules={questionValidationRules}
				multiline
			/>
			{withGenerateButton && (
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
			)}

			<ImageUpload
				onImageSelect={handleImageSelect}
				currentImage={imageValue}
			/>

			{withGenerateButton && (
				<>
					<Select
						register={register}
						label="Количество ответов для генерации"
						name="numOfAnswers"
						options={[{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]}
						value="3"
					/>

					<AIButton
						type="submit"
						generating={isGenerating}
						disabled={isButtonDisabled}
					>
						{isGenerating ? "Генерация" : "Генерировать"}
					</AIButton>
				</>
			)}
		</form>
	)
}

export default QuestionForm
