import { ButtonProps } from "@/components/ui/Button/Base/Button.props"
import { FC, useState } from "react"
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
    const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom">("top")

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget
        const rect = button.getBoundingClientRect()
        if (rect.top < 20) {
            setTooltipPosition("bottom")
        } else {
            setTooltipPosition("top")
        }
    }

    return (
        <button
            type={type}
            disabled={isLoading || disabled}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            className={`
                ${styles.button}
                ${tooltip ? styles["button--with-tooltip"] : ""} 
                ${isLoading ? styles["button--loading"] : ""}
                ${className}
            `}
            data-tooltip={tooltip}
            data-tooltip-position={tooltipPosition}>
            {isLoading ? loadingText : children}
        </button>
    )
}

export default Button
