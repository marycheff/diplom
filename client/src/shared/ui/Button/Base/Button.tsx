import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { FC, useRef } from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "./Button.props"

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

    return (
        <>
            <button
                ref={buttonRef}
                type={type}
                disabled={isLoading || disabled}
                onClick={onClick}
                className={`
                    ${styles.button}
                    ${className || ""}
                `}>
                {isLoading ? loadingText : children}
            </button>
            {tooltip && <Tooltip content={tooltip} targetRef={buttonRef} delay={300} />}
        </>
    )
}

export default Button
