import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Loader from "@/components/ui/Loader/Loader"
import Select from "@/components/ui/Select/Select"
import { FC } from "react"
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from "react-hook-form"

// Update this type to match FormData in TestForm.tsx
type QuestionFormFields = {
    question: string
    answer: string
    numOfAnswers: number
}

type QuestionFormProps = {
    register: UseFormRegister<QuestionFormFields>
    errors?: FieldErrors<QuestionFormFields> | undefined
    isLoading: boolean
    onSubmit: ReturnType<UseFormHandleSubmit<QuestionFormFields>>
    isButtonDisabled: boolean
}

const QuestionForm: FC<QuestionFormProps> = ({ register, errors, isButtonDisabled, isLoading, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {isLoading && <Loader />}
            <Input<QuestionFormFields>
                clearable
                placeholder="Вопрос"
                name="question"
                register={register}
                errors={errors?.question}
                validationRules={{
                    required: "Вопрос обязателен",
                    validate: (value: string | number) => {
                        // Convert to string to handle both string and number types
                        const strValue = String(value)
                        const wordCount = strValue.trim().split(/\s+/).length
                        const hasText = /[a-zA-Zа-яА-Я]/.test(strValue)

                        if (!hasText) return "Вопрос должен содержать текст"
                        if (strValue.length > 100) return "Вопрос не должен превышать 100 символов"

                        return wordCount >= 2 && wordCount <= 10 ? true : "Вопрос должен содержать от 2 до 10 слов"
                    },
                }}
            />
            <Input<QuestionFormFields>
                placeholder="Введите правильный ответ"
                name="answer"
                register={register}
                errors={errors?.answer}
                validationRules={{
                    required: "Ответ обязателен",
                    validate: (value: string | number) => {
                        // Convert to string to handle both string and number types
                        const strValue = String(value)
                        const wordCount = strValue.trim().split(/\s+/).length

                        if (strValue.length > 100) return "Ответ не должен превышать 100 символов"

                        return wordCount >= 1 && wordCount <= 5 ? true : "Ответ должен содержать от 1 до 5 слов"
                    },
                }}
            />
            <Select name="numOfAnswers" register={register} />
            <Button type="submit" disabled={isButtonDisabled}>
                {isLoading ? "Загрузка..." : "Генерация"}
            </Button>
        </form>
    )
}

export default QuestionForm
