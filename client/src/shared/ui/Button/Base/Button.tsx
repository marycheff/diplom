import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { ButtonHTMLAttributes, forwardRef, ReactNode, useImperativeHandle, useRef } from "react"
import styles from "./Button.module.scss"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	isLoading?: boolean
	disabled?: boolean
	onClick?: () => void
	loadingText?: string
	type?: "button" | "reset" | "submit"
	tooltip?: string
	className?: string
	variant?: "primary" | "secondary"
}

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
			variant = "primary",
			...restProps
		},
		forwardedRef
	) => {
		const innerRef = useRef<HTMLButtonElement>(null)
		// Синхронизация внутреннего ref с переданным извне
		useImperativeHandle(forwardedRef, () => innerRef.current!)

		return (
			<>
				<button
					ref={innerRef}
					type={type}
					disabled={isLoading || disabled}
					onClick={onClick}
					className={`${styles.button} ${variant === "secondary" ? styles.secondary : ""} ${className || ""}`}
					{...restProps}
					aria-describedby={tooltip ? "tooltip" : undefined}
				>
					{isLoading ? loadingText : children}
				</button>
				{tooltip && (
					<Tooltip
						targetRef={innerRef}
						content={tooltip}
					/>
				)}
			</>
		)
	}
)
export default Button
