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
                    <Button onClick={onEdit} tooltip="Редактировать">
                        ✏️
                    </Button>
                    <Button onClick={onDelete} tooltip="Удалить">
                        🗑️
                    </Button>
                    <Button onClick={onToggle} tooltip="Развернуть">
                        {expanded ? "▲" : "▼"}
                    </Button>
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
