import { Button } from "@/components/ui/Button/Button"
import Checkbox from "@/components/ui/Checkbox/Checkbox"
import { Input } from "@/components/ui/Input"
import { FC } from "react"

type Answer = {
    text: string
    isCorrect: boolean
}
interface AnswersListProps {
    answers: Answer[]
    handleAnswerChange: (index: number, value: string) => void
    handleCorrectChange: (index: number) => void
    removeAnswer: (index: number) => void
    addAnswer: () => void
}
const AnswersList: FC<AnswersListProps> = ({
    answers,
    handleAnswerChange,
    handleCorrectChange,
    removeAnswer,
    addAnswer,
}) => {
    return (
        <div>
            <h3>Ответы</h3>
            {answers.map((answer, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                    <Input
                        name={answer.text}
                        clearable
                        type="text"
                        value={answer.text}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder={`Ответ ${index + 1}`}
                    />
                    {/* <input type="checkbox" checked={answer.isCorrect} onChange={() => handleCorrectChange(index)} /> */}
                    <Checkbox
                        id={`answer-${index}`}
                        checked={answer.isCorrect}
                        onChange={() => handleCorrectChange(index)}
                    />

                    <Button disabled={answer.isCorrect} onClick={() => removeAnswer(index)}>
                        &times;
                    </Button>
                </div>
            ))}
            <Button onClick={addAnswer}>+</Button>
        </div>
    )
}

export default AnswersList
