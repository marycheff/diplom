import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import Loader from "@/components/ui/Loader/Loader"
import Select from "@/components/ui/Select/Select"
import { FC } from "react"

type QuestionFormProps = {
    register: any
    errors: any
    isButtonDisabled: boolean
    isLoading: boolean
    onSubmit: () => void
}

const QuestionForm: FC<QuestionFormProps> = ({ register, errors, isButtonDisabled, isLoading, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            {isLoading && <Loader />}
            <Input
                clearable
                placeholder="Вопрос"
                name="question"
                register={register}
                errors={errors?.question}
                validationRules={{
                    required: "Вопрос обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length
                        const hasText = /[a-zA-Zа-яА-Я]/.test(value)

                        if (!hasText) return "Вопрос должен содержать текст"
                        if (value.length > 100) return "Вопрос не должен превышать 100 символов"

                        return wordCount >= 2 && wordCount <= 10 ? true : "Вопрос должен содержать от 2 до 10 слов"
                    },
                }}
            />
            <Input
                placeholder="Введите правильный ответ"
                name="answer"
                register={register}
                errors={errors?.answer}
                validationRules={{
                    required: "Ответ обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length

                        if (value.length > 100) return "Ответ не должен превышать 100 символов"

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