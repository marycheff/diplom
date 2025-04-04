import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

interface TooltipProps {
    content: string
    position?: "top" | "bottom" | "auto" 
    targetRef: React.RefObject<HTMLElement | null>
    delay?: number
}

const Tooltip: FC<TooltipProps> = ({ content, position = "auto", targetRef, delay = 300 }) => {
    const [visible, setVisible] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Управление событиями мыши и задержкой
    useEffect(() => {
        const handleMouseEnter = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = setTimeout(() => {
                setVisible(true)
            }, delay)
        }

        const handleMouseLeave = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            setVisible(false)
        }

        const target = targetRef.current
        if (target) {
            target.addEventListener("mouseenter", handleMouseEnter)
            target.addEventListener("mouseleave", handleMouseLeave)
        }

        return () => {
            if (target) {
                target.removeEventListener("mouseenter", handleMouseEnter)
                target.removeEventListener("mouseleave", handleMouseLeave)
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
        }
    }, [targetRef, delay])

    // Позиционирование тултипа с автоматическим определением позиции
    useEffect(() => {
        if (visible && !targetRef.current) {
            setVisible(false)
        } else if (tooltipRef.current && targetRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight

            // Определяем позицию
            let actualPosition: "top" | "bottom" = position === "auto" ? "top" : position

            if (position === "auto") {
                const spaceAbove = targetRect.top // Место сверху от элемента
                const spaceBelow = viewportHeight - targetRect.bottom // Место снизу

                // Если сверху недостаточно места, но снизу хватает, переключаем на "bottom"
                if (spaceAbove < tooltipRect.height + 8 && spaceBelow >= tooltipRect.height + 8) {
                    actualPosition = "bottom"
                } else {
                    actualPosition = "top"
                }
            }

            let top: number
            let left: number

            if (actualPosition === "top") {
                top = targetRect.top - tooltipRect.height - 8
                left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
            } else {
                top = targetRect.bottom + 8
                left = targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
            }

            const viewportWidth = window.innerWidth
            if (left < 0) left = 8
            if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8

            tooltipRef.current.style.top = `${top}px`
            tooltipRef.current.style.left = `${left}px`
        }
    }, [visible, position, targetRef])

    return createPortal(
        <div ref={tooltipRef} className={`${styles.tooltip} ${visible ? styles.visible : ""}`}>
            {content}
        </div>,
        document.getElementById("portal-root")!
    )
}

export default Tooltip
