import { ButtonProps } from "@/components/ui/Button/Button.props"
import { FC } from "react"

export const Button: FC<ButtonProps> = ({
    children,
    type = "button",
    isLoading,
    disabled,
    onClick,
    loadingText = "Загрузка...",
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

    return (
        <button type={type} disabled={isLoading || disabled} onClick={handleClick}>
            {isLoading ? loadingText : children}
        </button>
    )
}
