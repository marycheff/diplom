// QuestionForm.tsx
import React from "react"
import MyInput from "./UI/input/MyInput"
import MySelect from "./UI/select/MySelect"
import MyButton from "./UI/button/MyButton"

type QuestionFormProps = {
    register: any
    errors: any
    isButtonDisabled: boolean
    isLoading: boolean // Добавлено новое свойство
    onSubmit: () => void // Функция, вызываемая при отправке формы
}

const QuestionForm: React.FC<QuestionFormProps> = ({ register, errors, isButtonDisabled, isLoading, onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <MyInput
                placeholder='Вопрос'
                name='question'
                register={register}
                validationRules={{
                    required: "Вопрос обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length
                        const isText = /^[^\d]*[a-zA-Zа-яА-Я]+[^\d]*$/.test(value)
                        if (!isText) {
                            return "Вопрос должен содержать текст, а не только числа"
                        }
                        if (value.length > 100) {
                            return "Вопрос не должен превышать 100 символов"
                        }
                        return wordCount >= 2 && wordCount <= 10 ? true : "Вопрос должен содержать от 2 до 10 слов"
                    },
                }}
                errors={errors}
            />
            <MyInput
                placeholder='Введите правильный ответ'
                name='answer'
                register={register}
                validationRules={{
                    required: "Ответ обязателен",
                    validate: (value: string) => {
                        const wordCount = value.trim().split(/\s+/).length
                        const isText = /[a-zA-Zа-яА-Я]/.test(value)
                        if (!isText) {
                            return "Ответ должен содержать текст, а не только числа"
                        }
                        if (value.length > 100) {
                            return "Ответ не должен превышать 100 символов"
                        }
                        return (wordCount >= 1 && wordCount <= 5) || "Ответ должен содержать от 1 до 5 слов"
                    },
                }}
                errors={errors}
            />
            <MySelect name='numOfAnswers' register={register} />
            <MyButton disabled={isButtonDisabled}>
                {isLoading ? "Загрузка..." : "Генерация"} {/* Изменение текста кнопки */}
            </MyButton>
        </form>
    )
}

export default QuestionForm