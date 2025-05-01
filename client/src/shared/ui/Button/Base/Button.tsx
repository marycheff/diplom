import { forwardRef } from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "./Button.props"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            type = "button",
            isLoading,
            disabled,
            onClick,
            loadingText = "Загрузка...",
            className,
            ...restProps // Собираем остальные пропсы
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                type={type}
                disabled={isLoading || disabled}
                onClick={onClick}
                className={`
                    ${styles.button}
                    ${className || ""}
                `}
                {...restProps} // Передаем все остальные пропсы
            >
                {isLoading ? loadingText : children}
            </button>
        )
    }
)

export default Button
