import { FC, ReactNode, useEffect, useState } from "react"
import styles from "./Modal.module.scss"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    fullScreen?: boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title, fullScreen }) => {
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        if (isOpen) {
            // Сохраняем ширину скроллбара перед блокировкой прокрутки
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

            // Блокируем прокрутку, но сохраняем оригинальную ширину страницы
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`

            setIsClosing(false)
        } else {
            // Восстанавливаем нормальное состояние
            document.body.style.overflow = ""
            document.body.style.paddingRight = ""
        }

        return () => {
            document.body.style.overflow = ""
            document.body.style.paddingRight = ""
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
        <div
            className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`}
            // onClick={handleClose}
        >
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ""} ${
                    fullScreen ? styles.fullScreen : ""
                }`}
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
