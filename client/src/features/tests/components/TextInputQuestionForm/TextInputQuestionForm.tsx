import { GenerateAnswerFormData } from "@/shared/types"
import { answerValidationRules, questionValidationRules } from "@/shared/types/utils/validationRules"
import ImageUpload from "@/shared/ui/ImageUpload/ImageUpload"
import { ValidatedInput } from "@/shared/ui/Input"
import { FC, FormEvent, useCallback } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch } from "react-hook-form"

interface TextInputFormData {
    question: string
    answer: string
    numOfAnswers?: number
}

interface TextInputQuestionFormProps {
    register: UseFormRegister<GenerateAnswerFormData & TextInputFormData>
    errors?: FieldErrors<GenerateAnswerFormData & TextInputFormData>
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    setValue: UseFormSetValue<GenerateAnswerFormData & TextInputFormData>
    trigger: UseFormTrigger<GenerateAnswerFormData & TextInputFormData>
    watch: UseFormWatch<GenerateAnswerFormData>
}

const TextInputQuestionForm: FC<TextInputQuestionFormProps> = ({
    register,
    errors,
    onSubmit,
    setValue,
    trigger,
    watch,
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
                multiline
                placeholder="Вопрос"
                name="question"
                trigger={trigger}
                register={register}
                setValue={setValue}
                errors={errors?.question}
                validationRules={questionValidationRules}
            />

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
            <ImageUpload onImageSelect={handleImageSelect} currentImage={imageValue} />
        </form>
    )
}

export default TextInputQuestionForm
