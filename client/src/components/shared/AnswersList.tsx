import { Button } from "@/components/ui/Button"
import Checkbox from "@/components/ui/Checkbox/Checkbox"
import { Input } from "@/components/ui/Input"
import { AnswerDTO } from "@/types/testTypes"
import { FC } from "react"

interface AnswersListProps {
    answers: AnswerDTO[]
    handleAnswerChange: (index: number, value: string) => void
    handleCorrectChange: (index: number) => void
    removeAnswer: (index: number) => void
    addAnswer: () => void
    correctAnswer?: string
}

const AnswersList: FC<AnswersListProps> = ({
    answers,
    handleAnswerChange,
    handleCorrectChange,
    removeAnswer,
    addAnswer,
    correctAnswer,
}) => {
    return (
        <div>
            <h3>Ответы</h3>
            {answers.map((answer, index) => (
                <div key={answer.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    <Input
                        clearable
                        type="text"
                        value={answer.text}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder={`Вариант ответа ${index + 1}`}
                        name={""}
                    />
                    <Checkbox
                        id={`answer-${index}`}
                        checked={answer.isCorrect}
                        onChange={() => handleCorrectChange(index)}
                    />
                    <Button onClick={() => removeAnswer(index)}>&times;</Button>
                </div>
            ))}
            <Button onClick={addAnswer}>Добавить ответ</Button>
        </div>
    )
}

export default AnswersList
