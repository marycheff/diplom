import { FC, useRef, useState } from "react"
import { ButtonProps } from "./Button.props"

import Tooltip from "@/components/ui/Tooltip/Tooltip"
import styles from "./Button.module.scss"

export const Button: FC<ButtonProps> = ({
    children,
    type = "button",
    isLoading,
    disabled,
    onClick,
    loadingText = "Загрузка...",
    tooltip,
    className,
}) => {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("top")

    const handleMouseEnter = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight
            const threshold = 50 

            if (rect.top < threshold) {
                setTooltipPosition("bottom")
            } else if (viewportHeight - rect.bottom < threshold) {
                setTooltipPosition("top")
            } else {
                setTooltipPosition("top")
            }
        }
    }

    return (
        <>
            <button
                ref={buttonRef}
                type={type}
                disabled={isLoading || disabled}
                onClick={onClick}
                onMouseEnter={handleMouseEnter}
                className={`
                    ${styles.button}
                    ${className || ""}
                `}>
                {isLoading ? loadingText : children}
            </button>
            {tooltip && <Tooltip content={tooltip} position={tooltipPosition} targetRef={buttonRef} />}
        </>
    )
}

export default Button
