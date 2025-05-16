import { GenerateAnswerFormData } from "@/shared/types"
import { answerValidationRules, questionValidationRules } from "@/shared/types/utils/validationRules"
import { ValidatedInput } from "@/shared/ui/Input"
import { FC, FormEvent } from "react"
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"

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
}

const TextInputQuestionForm: FC<TextInputQuestionFormProps> = ({ register, errors, onSubmit, setValue, trigger }) => {
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
            <br />
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
        </form>
    )
}

export default TextInputQuestionForm
