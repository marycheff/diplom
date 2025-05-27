import Button from "@/shared/ui/Button/Base/Button"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import styles from "./CopyButton.module.scss"

interface CopyButtonProps {
    textToCopy: string
    className?: string
    showOnHover?: boolean
    variant?: "icon" | "text"
}

const CopyButton = ({ textToCopy, className = "", showOnHover = false, variant = "icon" }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false)
    const [isParentHovered, setIsParentHovered] = useState(false)
    const [isTimeout, setIsTimeout] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const parent = buttonRef.current?.parentElement
        if (!parent || !showOnHover) return

        const handleMouseEnter = () => setIsParentHovered(true)
        const handleMouseLeave = () => setIsParentHovered(false)

        parent.addEventListener("mouseenter", handleMouseEnter)
        parent.addEventListener("mouseleave", handleMouseLeave)

        return () => {
            parent.removeEventListener("mouseenter", handleMouseEnter)
            parent.removeEventListener("mouseleave", handleMouseLeave)
        }
    }, [showOnHover])

    const handleCopy = async () => {
        if (isTimeout) return

        try {
            setIsTimeout(true)
            await navigator.clipboard.writeText(textToCopy)
            setIsCopied(true)
            toast.success("Скопировано!")

            setTimeout(() => {
                setIsCopied(false)
                setIsTimeout(false)
            }, 1500)
        } catch (err) {
            setIsTimeout(false)
            toast.error("Ошибка копирования")
        }
    }

    const getIcon = () =>
        isCopied ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.icon}>
                <path d="M19 21H8V7h11m0-2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-3-4H4c-1.1 0-2 .9-2 2v14h2V3h12V1z" />
            </svg>
        )

    if (variant === "text") {
        return (
            <Button onClick={handleCopy} className={`${styles.textButton} ${className}`}>
                <span className={styles.content}>
                    {isCopied ? "Скопировано" : "Копировать"}
                    {getIcon()}
                </span>
            </Button>
        )
    }

    return (
        <button
            ref={buttonRef}
            className={`${styles.iconButton} ${className}`}
            onClick={handleCopy}
            title={isTimeout ? "Подождите..." : "Скопировать"}
            aria-label={isTimeout ? "Подождите..." : "Копировать в буфер обмена"}
            type="button"
            disabled={isTimeout}
            data-visible={showOnHover ? isParentHovered : true}>
            {getIcon()}
        </button>
    )
}

export default CopyButton
