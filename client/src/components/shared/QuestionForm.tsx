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
                placeholder="Вопрос"
                name="question"
                register={register}
                validationRules={{
                    required: "Вопрос обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length
                        const hasText = /[a-zA-Zа-яА-Я]/.test(value) // Проверяем наличие текста

                        // Убираем проверку на наличие только текста
                        if (!hasText) {
                            return "Вопрос должен содержать текст"
                        }

                        if (value.length > 100) {
                            return "Вопрос не должен превышать 100 символов"
                        }

                        return wordCount >= 2 && wordCount <= 10 ? true : "Вопрос должен содержать от 2 до 10 слов"
                    },
                }}
                errors={errors}
            />
            <Input
                placeholder="Введите правильный ответ"
                name="answer"
                register={register}
                validationRules={{
                    required: "Ответ обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length
                        // const hasText = /[a-zA-Zа-яА-Я]/.test(value) // Проверяем наличие текста

                        // if (!hasText) {
                        //     return "Ответ должен содержать текст, а не только числа"
                        // }

                        if (value.length > 100) {
                            return "Ответ не должен превышать 100 символов"
                        }

                        return (wordCount >= 1 && wordCount <= 5) || "Ответ должен содержать от 1 до 5 слов"
                    },
                }}
                errors={errors}
            />
            <Select name="numOfAnswers" register={register} />
            <Button disabled={isButtonDisabled}>
                {isLoading ? "Загрузка..." : "Генерация"} {/* Изменение текста кнопки */}
            </Button>
        </form>
    )
}

export default QuestionForm
