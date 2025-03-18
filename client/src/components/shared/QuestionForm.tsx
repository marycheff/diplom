import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Loader from "@/components/ui/Loader/Loader"
import Select from "@/components/ui/Select/Select"
import { FC } from "react"
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
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
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
            <Input
                clearable
                placeholder="Вопрос"
                name="question"
                register={register}
                setValue={setValue}
                errors={errors?.question}
                validationRules={questionValidation}
            />
            <Input
                clearable
                placeholder="Введите правильный ответ"
                name="answer"
                register={register}
                setValue={setValue}
                errors={errors?.answer}
                validationRules={answerValidation}
            />
            <Select name="numOfAnswers" register={register} />
            <Button type="submit" disabled={isButtonDisabled || isLoading}>
                {isLoading ? "Загрузка..." : "Генерация"}
            </Button>
        </form>
    )
}

export default QuestionForm
