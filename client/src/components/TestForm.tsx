import { useState } from "react"
import { useForm } from "react-hook-form" // Импортируем react-hook-form
import api from "../http" // Импортируем настроенный экземпляр axios

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
        reset,
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
            setResponse(res.data.generatedAnswers) // Предполагаем, что это массив
            setEditableInputs(new Array(res.data.generatedAnswers.length).fill(false))
           // reset() // Сбрасываем форму после успешной отправки
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    const toggleEditable = (index: number) => {
        const updatedEditableInputs = [...editableInputs]
        updatedEditableInputs[index] = !updatedEditableInputs[index] // Переключаем состояние на противоположное
        setEditableInputs(updatedEditableInputs)
    }

    const handleInputChange = (index: number, value: string) => {
        const updatedResponse = [...response]
        updatedResponse[index] = value
        setResponse(updatedResponse) // Обновляем значение инпута
    }

    return (
        <div>
            <h2>Задать вопрос нейросети</h2>

            {/* Форма с валидацией */}
            <form onSubmit={handleSubmit(askQuestion)}>
                <div>
                    <input
                        type='text'
                        placeholder='Вопрос'
                        {...register("question", {
                            required: "Вопрос обязателен",
                            validate: value => {
                                const wordCount = value.trim().split(/\s+/).length
                                return (wordCount >= 2 && wordCount <= 10) || "Вопрос должен содержать от 2 до 10 слов"
                            },
                        })}
                    />
                    {errors.question && <p>{errors.question.message}</p>}
                </div>

                <div>
                    <input
                        type='text'
                        placeholder='Правильный ответ'
                        {...register("answer", {
                            required: "Ответ обязателен",
                            validate: value => {
                                const wordCount = value.trim().split(/\s+/).length
                                return (wordCount >= 1 && wordCount <= 5) || "Ответ должен содержать от 1 до 5 слов"
                            },
                        })}
                    />
                    {errors.answer && <p>{errors.answer.message}</p>}
                </div>

                {/* Выбор количества ответов */}
                <div>
                    <label>Количество ответов:</label>
                    <select {...register("numOfAnswers", { required: true })}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option selected value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                </div>

                <button>Отправить</button>
            </form>

            {isLoading && <p>Загрузка...</p>}

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
