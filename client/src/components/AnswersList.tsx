// AnswersList.tsx
import React from "react"

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

const AnswersList: React.FC<AnswersListProps> = ({
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
                        type='text'
                        value={answer.text}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder={`Ответ ${index + 1}`}
                    />
                    <input type='checkbox' checked={answer.isCorrect} onChange={() => handleCorrectChange(index)} />
                    {!answer.isCorrect && (
                        <button type='button' onClick={() => removeAnswer(index)}>
                            Удалить
                        </button>
                    )}
                </div>
            ))}
            <button type='button' onClick={addAnswer}>
                +
            </button>
        </div>
    )
}

export default AnswersList
