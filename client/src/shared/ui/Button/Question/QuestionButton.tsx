import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { FC, useRef } from "react"
import { BsQuestionCircle } from "react-icons/bs"
import styles from "./QuestionButton.module.scss"

interface QuestionButtonProps {
    tooltip: string
    className?: string
    variant?: "primary" | "secondary"
}

const QuestionButton: FC<QuestionButtonProps> = ({ tooltip, className = "", variant = "primary" }) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className={`${styles.questionButton} ${className}`}
                aria-label="Показать подсказку">
                <BsQuestionCircle className={styles.icon} />
            </button>
            <Tooltip targetRef={buttonRef} content={tooltip} />
        </>
    )
}

export default QuestionButton
