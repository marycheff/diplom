import { GenerateAnswerFormData } from "@/shared/types"
import { answerValidationRules, questionValidationRules } from "@/shared/types/utils/validationRules"
import { AIButton } from "@/shared/ui/Button"

import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { formatSpaces } from "@/shared/utils/formatter"
import { FC, FormEvent } from "react"
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue, UseFormTrigger } from "react-hook-form"

interface QuestionFormProps {
    register: UseFormRegister<GenerateAnswerFormData>
    errors?: FieldErrors<GenerateAnswerFormData>
    isGenerating: boolean
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    isButtonDisabled: boolean
    setValue: UseFormSetValue<GenerateAnswerFormData>
    trigger: UseFormTrigger<GenerateAnswerFormData>
}

const QuestionForm: FC<QuestionFormProps> = ({
    register,
    errors,
    isButtonDisabled,
    isGenerating,
    onSubmit,
    setValue,
    trigger,
}) => {
    const hasText = (value: string): boolean => /[a-zA-Zа-яА-Я]/.test(value)
    const isWithinWordCount = (value: string, min: number, max: number): boolean => {
        const wordCount = formatSpaces(value).split(/\s+/).length
        return wordCount >= min && wordCount <= max
    }
    const isWithinCharLimit = (value: string, max: number): boolean => value.length <= max

   

    return (
        <form onSubmit={onSubmit}>
            {/* {isLoading && <Loader delay={300} />} */}
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

            <Select
                register={register}
                label="Количество ответов для генерации"
                name="numOfAnswers"
                options={[{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]}
                value="3"
            />

            <AIButton type="submit" generating={isGenerating} disabled={isButtonDisabled}>
                {isGenerating ? "Генерация" : "Генерировать"}
            </AIButton>
        </form>
    )
}
export default QuestionForm
