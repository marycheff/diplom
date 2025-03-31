import AnswersList from "@/components/shared/AnswersList"
import QuestionForm from "@/components/shared/QuestionForm"
import { Button } from "@/components/ui/Button"
import { useTestStore } from "@/store/useTestStore"
import { GenerateAnswerFormData } from "@/types/testTypes"
import { useState } from "react"
import { useForm } from "react-hook-form"

const TestForm = () => {
    const { generateAnswers, isLoading } = useTestStore()
    const [answers, setAnswers] = useState<{ text: string; isCorrect: boolean }[]>([{ text: "", isCorrect: true }])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<GenerateAnswerFormData>({
        mode: "onChange",
    })

    const askQuestion = async (data: GenerateAnswerFormData) => {
        const response = await generateAnswers(data)

        const generatedAnswers = response.map(answer => ({
            text: answer,
            isCorrect: false,
        }))

        setAnswers([{ text: data.answer, isCorrect: true }, ...generatedAnswers])
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
            <h2>Добавить вопрос</h2>
            <QuestionForm
                register={register}
                setValue={setValue}
                errors={errors}
                isLoading={isLoading}
                isButtonDisabled={}
                onSubmit={handleSubmit(askQuestion)}
            />
            <AnswersList
                answers={answers}
                handleAnswerChange={handleAnswerChange}
                handleCorrectChange={handleCorrectChange}
                removeAnswer={removeAnswer}
                addAnswer={addAnswer}
            />
            <Button>Следующий вопрос</Button>
            <Button>Завершить</Button>
        </div>
    )
}

export default TestForm
