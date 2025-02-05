// TestForm.tsx
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../http/axios"
import MyButton from "../UI/button/MyButton"
import AnswersList from "./AnswersList"
import QuestionForm from "./QuestionForm"

type FormData = {
    question: string
    answer: string
    numOfAnswers: number
}

const TestForm = () => {
    const [response, setResponse] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [answers, setAnswers] = useState<{ text: string; isCorrect: boolean }[]>([
        { text: "", isCorrect: true }, // Правильный ответ
    ])

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>()

    const watchedQuestion = watch("question")
    const watchedAnswer = watch("answer")

    useEffect(() => {
        setIsButtonDisabled(!watchedQuestion || !watchedAnswer)
    }, [watchedQuestion, watchedAnswer])

    const askQuestion = async (data: FormData) => {
        setIsLoading(true)
        setIsSubmitted(true)
        setIsButtonDisabled(true)

        try {
            const res = await api.post("/chat/generate-answers", {
                question: data.question,
                answer: data.answer,
                numOfAnswers: data.numOfAnswers,
            })

            const generatedAnswers = res.data.generatedAnswers.map((answer: string) => ({
                text: answer,
                isCorrect: false,
            }))

            setAnswers([{ text: data.answer, isCorrect: true }, ...generatedAnswers])
            setResponse(res.data.generatedAnswers)
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

    const addAnswer = () => {
        setAnswers([...answers, { text: "", isCorrect: false }])
    }

    const removeAnswer = (index: number) => {
        if (!answers[index].isCorrect) {
            setAnswers(answers.filter((_, i) => i !== index))
        }
    }

    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...answers]
        updatedAnswers[index].text = value
        setAnswers(updatedAnswers)
    }

    const handleCorrectChange = (index: number) => {
        const hasCorrectAnswer = answers.some(answer => answer.isCorrect)
        const updatedAnswers = answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index ? !(answer.isCorrect && hasCorrectAnswer) : answer.isCorrect,
        }))

        if (updatedAnswers.filter(answer => answer.isCorrect).length === 0) {
            updatedAnswers[0].isCorrect = true
        }

        setAnswers(updatedAnswers)
    }

    return (
        <div>
            <h2>Задать вопрос нейросети</h2>
            <QuestionForm
                register={register}
                errors={errors}
                isLoading={isLoading}
                isButtonDisabled={isButtonDisabled}
                onSubmit={handleSubmit(askQuestion)}
            />
            <AnswersList
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                handleCorrectChange={handleCorrectChange}
                removeAnswer={removeAnswer}
                addAnswer={addAnswer}
            />
            <MyButton>Следующий вопрос</MyButton>
            <MyButton>Завершить</MyButton>

            {!isLoading && isSubmitted && response.length === 0 && (
                <p>Данный вопрос некорректен, задайте другой вопрос</p>
            )}
        </div>
    )
}

export default TestForm
