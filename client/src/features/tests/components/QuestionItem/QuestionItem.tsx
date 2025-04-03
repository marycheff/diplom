import { QuestionDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from "clsx"
import { FC } from "react"
import styles from "./QuestionItem.module.scss"

interface QuestionItemProps {
    id: string
    order: number
    question: QuestionDTO
    expanded: boolean
    onToggle: () => void
    onEdit: () => void
    onDelete: () => void
}

const QuestionItem: FC<QuestionItemProps> = ({ id, order, question, expanded, onToggle, onEdit, onDelete }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        animateLayoutChanges: () => false,
    })

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition: transition + ", box-shadow 0.2s, background-color 0.2s",
        zIndex: isDragging ? 999 : "auto",
        position: isDragging ? "relative" : "static",
        boxShadow: isDragging ? "0 5px 15px rgba(0, 0, 0, 0.2)" : "none",
        backgroundColor: isDragging ? "#f8f8f8" : undefined,
        opacity: isDragging ? 0.8 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className={styles.questionItem}>
            <div className={styles.questionHeader}>
                <div className={styles.dragHandle} {...attributes} {...listeners}>
                    ☰
                </div>
                <p className={styles.questionText}>
                    {order}.{question.text}
                </p>

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
            {!isDragging && (
                <div className={clsx(styles.questionContent, expanded && styles.expanded)}>
                    {question.answers.map(answer => (
                        <div key={answer.id} className={answer.isCorrect ? styles.correctAnswer : styles.answer}>
                            {answer.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default QuestionItem
