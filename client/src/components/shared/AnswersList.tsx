import { FC } from "react"

type Answer = {
    text: string
    isCorrect: boolean
}

type AnswersListProps = {
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
                    <input
                        type="text"
                        value={answer.text}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder={`Ответ ${index + 1}`}
                    />
                    <input type="checkbox" checked={answer.isCorrect} onChange={() => handleCorrectChange(index)} />

                    <button type="button" disabled={answer.isCorrect} onClick={() => removeAnswer(index)}>
                        X
                    </button>
                </div>
            ))}
            <button type="button" onClick={addAnswer}>
                +
            </button>
        </div>
    )
}

export default AnswersList
