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
    const [isMounted, setIsMounted] = useState(false)
    const [mouseDownStartedOutside, setMouseDownStartedOutside] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
            document.body.style.overflow = "hidden"
            document.body.style.paddingRight = `${scrollbarWidth}px`
        } else {
            const timer = setTimeout(() => {
                setIsMounted(false)
                document.body.style.overflow = ""
                document.body.style.paddingRight = ""
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    const handleClose = () => {
        onClose()
    }

    const onOverlayMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setMouseDownStartedOutside(true)
        }
    }

    const onOverlayMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mouseDownStartedOutside && e.target === e.currentTarget) {
            handleClose()
        }
        setMouseDownStartedOutside(false)
    }

    if (!isMounted) return null

    return (
        <div
            className={`${styles.modalOverlay} ${!isOpen ? styles.closing : ""}`}
            onMouseDown={onOverlayMouseDown}
            onMouseUp={onOverlayMouseUp}>
            <div
                className={`
                    ${styles.modalContent}
                    ${!isOpen ? styles.closing : ""}
                    ${fullScreen ? styles.fullScreen : ""}
                    ${isConfirmation ? styles.confirmation : ""}
                `}
                onMouseDown={e => e.stopPropagation()}>
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
