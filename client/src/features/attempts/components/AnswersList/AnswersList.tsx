import { AnswerDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { Input } from "@/shared/ui/Input"
import { FC } from "react"
import styles from "./AnswersList.module.scss"

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
}) => {
    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Ответы</h3>
            {answers.map((answer, index) => (
                <div key={answer.id} className={styles.answerRow}>
                    <Input
                        clearable
                        type="text"
                        value={answer.text}
                        onChange={e => handleAnswerChange(index, e.target.value)}
                        placeholder={`Вариант ответа ${index + 1}`}
                        name={`answer_${index}`}
                        className={styles.input}
                    />
                    <label className={styles.checkboxWrapper}>
                        <Checkbox
                            id={`answer-${index}`}
                            checked={answer.isCorrect}
                            onChange={() => {
                                if (!answer.isCorrect || answers.filter(a => a.isCorrect).length > 1) {
                                    handleCorrectChange(index)
                                }
                            }}
                        />
                        <span className={styles.checkboxLabel}>Правильный</span>
                    </label>
                    <Button onClick={() => removeAnswer(index)} className={styles.deleteButton}>
                        &times;
                    </Button>
                </div>
            ))}
            <Button onClick={addAnswer} className={styles.addButton}>
                Добавить ответ
            </Button>
        </div>
    )
}

export default AnswersList
