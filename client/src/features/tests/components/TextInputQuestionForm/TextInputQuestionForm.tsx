import { GenerateAnswerFormData } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { FC, FormEvent } from "react"
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"

interface TextInputFormData {
    question: string
    answer: string
    numOfAnswers?: number
}

interface TextInputQuestionFormProps {
    register: UseFormRegister<GenerateAnswerFormData & TextInputFormData>
    errors?: FieldErrors<GenerateAnswerFormData & TextInputFormData>
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    isButtonDisabled: boolean
    setValue: UseFormSetValue<GenerateAnswerFormData & TextInputFormData>
    trigger: UseFormTrigger<GenerateAnswerFormData & TextInputFormData>
    buttonText?: string
}

const TextInputQuestionForm: FC<TextInputQuestionFormProps> = ({
    register,
    errors,
    isButtonDisabled,
    onSubmit,
    setValue,
    trigger,
    buttonText,
}) => {
    const hasText = (value: string): boolean => /[a-zA-Zа-яА-Я]/.test(value)
    const isWithinWordCount = (value: string, min: number, max: number): boolean => {
        const wordCount = formatSpaces(value).split(/\s+/).length
        return wordCount >= min && wordCount <= max
    }
    const isWithinCharLimit = (value: string, max: number): boolean => value.length <= max

    const questionValidation: RegisterOptions = {
        required: "Вопрос обязателен",
        validate: (value: string) => {
            if (!hasText(value)) return "Вопрос должен содержать текст"
            if (!isWithinCharLimit(value, 100)) return "Вопрос не должен превышать 100 символов"
            if (!isWithinWordCount(value, 2, 100)) return "Вопрос должен содержать от 2 слов"
            return true
        },
    }
    const answerValidation: RegisterOptions = {
        required: "Ответ обязателен",
        validate: (value: string) => {
            if (!isWithinCharLimit(value, 100)) return "Ответ не должен превышать 100 символов"
            if (!isWithinWordCount(value, 1, 5)) return "Ответ должен содержать от 1 до 5 слов"
            return true
        },
    }

    return (
        <form onSubmit={onSubmit}>
            <ValidatedInput
                clearable
                placeholder="Вопрос"
                name="question"
                trigger={trigger}
                register={register}
                setValue={setValue}
                errors={errors?.question}
                validationRules={questionValidation}
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
                validationRules={answerValidation}
            />
        </form>
    )
}

export default TextInputQuestionForm
