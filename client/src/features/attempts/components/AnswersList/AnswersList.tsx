import { AnswerDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { Input } from "@/shared/ui/Input"
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
                        name={`answer_${index}`}
                    />
                    <Checkbox
                        id={`answer-${index}`}
                        checked={answer.isCorrect}
                        onChange={() => {
                            //  не пытается ли пользователь снять последний отмеченный checkbox
                            if (!answer.isCorrect || answers.filter(a => a.isCorrect).length > 1) {
                                handleCorrectChange(index)
                            }
                        }}
                    />
                    <Button onClick={() => removeAnswer(index)}>&times;</Button>
                </div>
            ))}
            <Button onClick={addAnswer}>Добавить ответ</Button>
        </div>
    )
}

export default AnswersList