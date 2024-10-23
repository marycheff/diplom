// QuestionForm.tsx
import React from "react"
import MyButton from "../UI/button/MyButton"
import MyInput from "../UI/input/MyInput"
import MySelect from "../UI/select/MySelect"
import Loader from "../UI/loader/Loader"

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
            {isLoading && <Loader />}
            <MyInput
                placeholder='Вопрос'
                name='question'
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
            <MyInput
                placeholder='Введите правильный ответ'
                name='answer'
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
            <MySelect name='numOfAnswers' register={register} />
            <MyButton disabled={isButtonDisabled}>
                {isLoading ? "Загрузка..." : "Генерация"} {/* Изменение текста кнопки */}
            </MyButton>
        </form>
    )
}

export default QuestionForm
