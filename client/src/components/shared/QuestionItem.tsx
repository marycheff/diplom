import { Button } from "@/components/ui/Button"
import { QuestionDTO } from "@/types/testTypes"
import clsx from "clsx"
import { FC } from "react"
import styles from "./QuestionItem.module.scss"

interface QuestionItemProps {
    question: QuestionDTO
    expanded: boolean
    onToggle: () => void
    onEdit: () => void
    onDelete: () => void
}

const QuestionItem: FC<QuestionItemProps> = ({ question, expanded, onToggle, onEdit, onDelete }) => {
    return (
        <div className={styles.questionItem}>
            <div className={styles.questionHeader}>
                <p className={styles.questionText}>{question.text}</p>
                <div className={styles.actions}>
                    <Button onClick={onEdit}>✏️</Button>
                    <Button onClick={onDelete}>🗑️</Button>
                    <Button onClick={onToggle}>{expanded ? "▲" : "▼"}</Button>
                </div>
            </div>
            {
                <div className={clsx(styles.questionContent, expanded && styles.expanded)}>
                    {question.answers.map((answer, index) => (
                        <div key={answer.id} className={answer.isCorrect ? styles.correctAnswer : styles.answer}>
                            {answer.text}
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default QuestionItem
