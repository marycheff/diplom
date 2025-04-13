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
    const [mouseDownStartedOutside, setMouseDownStartedOutside] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`
            setIsClosing(false)
        } else {
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

    // Обработчик нажатия мыши по оверлею
    const onOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        // Проверяем, что событие произошло именно на оверлее, а не на дочерних элементах
        if (e.target === e.currentTarget) {
            setMouseDownStartedOutside(true)
        }
    }

    // Обработчик отпускания мыши
    const onOverlayMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDownStartedOutside && e.target === e.currentTarget) {
            handleClose()
        }
        setMouseDownStartedOutside(false)
    }

    if (!isOpen) return null

    return (
        <div
            className={`${styles.modalOverlay} ${isClosing ? styles.closing : ""}`}
            onMouseDown={onOverlayMouseDown}
            onMouseUp={onOverlayMouseUp}>
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ""} ${
                    fullScreen ? styles.fullScreen : ""
                }`}
                onMouseDown={e => e.stopPropagation()} // предотвращает срабатывание, если клик начался в содержимом
            >
                <button className={styles.closeButton} onClick={handleClose}>
                    &times;
                </button>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                {children}
            </div>
        </div>
    )
}

export default Modal
