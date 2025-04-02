import { FC, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import styles from "./Tooltip.module.scss"

interface TooltipProps {
    content: string
    position: "top" | "bottom"
    targetRef: React.RefObject<HTMLButtonElement | null>
}

const Tooltip: FC<TooltipProps> = ({ content, position, targetRef }) => {
    const [visible, setVisible] = useState(false)
    const tooltipRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseEnter = () => setVisible(true)
        const handleMouseLeave = () => setVisible(false)

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
        }
    }, [targetRef])

    useEffect(() => {
        if (tooltipRef.current && targetRef.current) {
            const targetRect = targetRef.current.getBoundingClientRect()
            const tooltipRect = tooltipRef.current.getBoundingClientRect()

            let top: number
            let left: number

            if (position === "top") {
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
