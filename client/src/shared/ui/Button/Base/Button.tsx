import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { forwardRef, useImperativeHandle, useRef } from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "./Button.props"

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            tooltip,
            type = "button",
            isLoading,
            disabled,
            onClick,
            loadingText = "Загрузка...",
            className,
            ...restProps
        },
        forwardedRef
    ) => {
        const innerRef = useRef<HTMLButtonElement>(null)
        // Синхронизируем внутренний ref с переданным извне
        useImperativeHandle(forwardedRef, () => innerRef.current!)

        return (
            <>
                <button
                    ref={innerRef}
                    type={type}
                    disabled={isLoading || disabled}
                    onClick={onClick}
                    className={`${styles.button} ${className || ""}`}
                    {...restProps}
                    aria-describedby={tooltip ? "tooltip" : undefined} // Для доступности
                >
                    {isLoading ? loadingText : children}
                </button>
                {tooltip && <Tooltip targetRef={innerRef} content={tooltip} />}
            </>
        )
    }
)
export default Button
