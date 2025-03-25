import { Button } from "@/components/ui/Button"
import ValidatedInput from "@/components/ui/Input/Validated/ValidatedInput"

import Loader from "@/components/ui/Loader/Loader"
import Select from "@/components/ui/Select/Select"
import { FC, FormEvent } from "react"
import { FieldErrors, RegisterOptions, UseFormRegister, UseFormSetValue } from "react-hook-form"

type QuestionFormFields = {
    question: string
    answer: string
    numOfAnswers: number
}

type QuestionFormProps = {
    register: UseFormRegister<QuestionFormFields>
    errors?: FieldErrors<QuestionFormFields>
    isLoading: boolean
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    isButtonDisabled: boolean
    setValue: UseFormSetValue<QuestionFormFields>
}

const QuestionForm: FC<QuestionFormProps> = ({ register, errors, isButtonDisabled, isLoading, onSubmit, setValue }) => {
    const hasText = (value: string): boolean => /[a-zA-Zа-яА-Я]/.test(value)
    const isWithinWordCount = (value: string, min: number, max: number): boolean => {
        const wordCount = value.trim().split(/\s+/).length
        return wordCount >= min && wordCount <= max
    }
    const isWithinCharLimit = (value: string, max: number): boolean => value.length <= max

    const questionValidation: RegisterOptions = {
        required: "Вопрос обязателен",
        validate: (value: string) => {
            if (!hasText(value)) return "Вопрос должен содержать текст"
            if (!isWithinCharLimit(value, 100)) return "Вопрос не должен превышать 100 символов"
            if (!isWithinWordCount(value, 2, 10)) return "Вопрос должен содержать от 2 до 10 слов"
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
            {isLoading && <Loader />}
            <ValidatedInput
                clearable
                placeholder="Вопрос"
                name="question"
                register={register}
                setValue={setValue}
                errors={errors?.question}
                validationRules={questionValidation}
            />
            <ValidatedInput
                clearable
                placeholder="Введите правильный ответ"
                name="answer"
                register={register}
                setValue={setValue}
                errors={errors?.answer}
                validationRules={answerValidation}
            />
            <Select
                register={register}
                label="Количество ответов для генерации"
                name="numOfAnswers"
                options={[{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }]}
                value="1"
            />
            <Button type="submit" disabled={isButtonDisabled || isLoading}>
                {isLoading ? "Загрузка..." : "Генерация"}
            </Button>
        </form>
    )
}

export default QuestionForm
