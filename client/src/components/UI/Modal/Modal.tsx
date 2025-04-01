import { FC, ReactNode, useEffect, useState } from "react"
import styles from "./Modal.module.scss"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    fullScreen?: boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
            setIsClosing(false)
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
            setIsClosing(false)
        }, 200)
    }

    if (!isOpen) return null

    return (
        <div className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`} onClick={handleClose}>
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ""}`}
                onClick={e => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleClose}>
                    {" "}
                    &times;
                </button>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default Modal
