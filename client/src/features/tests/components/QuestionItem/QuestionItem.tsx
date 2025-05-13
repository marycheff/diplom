import { QuestionDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from "clsx"
import { FC, useRef } from "react"
import { FaAngleDown, FaAngleUp, FaTrash } from "react-icons/fa"
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

    const questionTextRef = useRef<HTMLParagraphElement>(null) // Ссылка на элемент <p>

    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        transition: transition + ", box-shadow 0.2s, background-color 0.2s",
        zIndex: isDragging ? 999 : "auto",
        position: isDragging ? "relative" : "static",
        boxShadow: isDragging ? "0 5px 15px rgba(0, 0, 0, 0.2)" : "none",
        backgroundColor: isDragging ? "#f8f8f8" : undefined,
        opacity: isDragging ? 0.8 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} className={`${styles.questionItem} ${isDragging ? styles.dragging : ""}`}>
            <div className={styles.questionHeader}>
                <div className={styles.leftSection}>
                    <div className={styles.dragHandle} {...attributes} {...listeners}>
                        ☰
                    </div>
                    <p ref={questionTextRef} className={styles.questionText} onClick={onEdit}>
                        {order}. {question.text}
                    </p>
                    <Tooltip content={question.text} targetRef={questionTextRef} />
                </div>
                <div className={styles.actions}>
                    {/* <Button onClick={onEdit} tooltip="Редактировать">
                        ✏️
                    </Button> */}
                    <Button onClick={onDelete} title="Удалить">
                        <FaTrash />
                    </Button>
                    <Button
                        onClick={onToggle}
                        title={expanded ? "Свернуть" : "Развернуть"}
                        className={styles.toggleButton}>
                        {expanded ? <FaAngleUp /> : <FaAngleDown />}
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
