import { Button } from "@/components/ui/Button"
import { FC, ReactNode } from "react"
import styles from "./Modal.module.scss"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    fullScreen?: boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <Button onClick={onClose}> &times;</Button>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default Modal
