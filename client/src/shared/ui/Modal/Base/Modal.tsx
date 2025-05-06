import { FC, ReactNode, useEffect, useState } from "react"
import styles from "./Modal.module.scss"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    fullScreen?: boolean
    isConfirmation?: boolean
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children, title, fullScreen, isConfirmation = false }) => {
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
                className={`
                    ${styles.modalContent}
                    ${isClosing ? styles.closing : ""}
                    ${fullScreen ? styles.fullScreen : ""}
                    ${isConfirmation ? styles.confirmation : ""}
                `}
                onMouseDown={e => e.stopPropagation()} // предотвращает срабатывание, если клик начался в содержимом
            >
                <button className={styles.closeButton} onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            fill="currentColor"
                            d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                        />
                    </svg>
                </button>
                {title && <h2 className={styles.modalTitle}>{title}</h2>}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    )
}

export default Modal
