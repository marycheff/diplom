import { useState } from "react"
import { useForm } from "react-hook-form"
import api from "../http"
import MyButton from "./UI/button/MyButton"
import MyInput from "./UI/input/MyInput"
import MySelect from "./UI/select/MySelect"

type FormData = {
    question: string
    answer: string
    numOfAnswers: number
}

const TestForm = () => {
    const [response, setResponse] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [editableInputs, setEditableInputs] = useState<boolean[]>([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const askQuestion = async (data: FormData) => {
        setIsLoading(true)
        setIsSubmitted(true)

        try {
            const res = await api.post("/chat/generate-answers", {
                question: data.question,
                answer: data.answer,
                numOfAnswers: data.numOfAnswers,
            })

            setResponse(res.data.generatedAnswers)
            setEditableInputs(new Array(res.data.generatedAnswers.length).fill(false))
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setResponse([])
                console.error(error.response.data.message)
            } else {
                console.error("Ошибка на стороне сервера", error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEditable = (index: number) => {
        const updatedEditableInputs = [...editableInputs]
        updatedEditableInputs[index] = !updatedEditableInputs[index]
        setEditableInputs(updatedEditableInputs)
    }

    const handleInputChange = (index: number, value: string) => {
        const updatedResponse = [...response]
        updatedResponse[index] = value
        setResponse(updatedResponse)
    }

    return (
        <div>
            <h2>Задать вопрос нейросети</h2>

            <form onSubmit={handleSubmit(askQuestion)}>
                {/* Вопрос */}
                <MyInput
                    placeholder='Вопрос'
                    name='question'
                    register={register}
                    validationRules={{
                        required: "Вопрос обязателен",
                        validate: (value: string) => {
                            const wordCount = value.trim().split(/\s+/).length
                            const isText = /^[^\d]*[a-zA-Zа-яА-Я]+[^\d]*$/.test(value) // Проверка, что есть буквы, а не только числа
                            if (!isText) {
                                return "Вопрос должен содержать текст, а не только числа"
                            }
                            if (value.length > 100) {
                                return "Вопрос не должен превышать 100 символов"
                            }
                            return (wordCount >= 2 && wordCount <= 10) || "Вопрос должен содержать от 2 до 10 слов"
                        },
                    }}
                    errors={errors}
                />

                <MyInput
                    placeholder='Правильный ответ'
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

                {/* Количество ответов */}
                <MySelect name='numOfAnswers' register={register} />

                {/* Кнопка отправки */}
                <MyButton isLoading={isLoading}>Отправить</MyButton>
            </form>

            {!isLoading && isSubmitted && response.length === 0 && (
                <p>Данный вопрос некорректен, задайте другой вопрос</p>
            )}

            {response.length > 0 && (
                <div>
                    <h3>Ответы нейросети:</h3>
                    {response.map((resp, index) => (
                        <div key={index}>
                            <input
                                type='text'
                                value={resp}
                                readOnly={!editableInputs[index]}
                                onChange={e => handleInputChange(index, e.target.value)}
                            />
                            <button onClick={() => toggleEditable(index)}>
                                {editableInputs[index] ? "Сохранить" : "Редактировать"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TestForm
