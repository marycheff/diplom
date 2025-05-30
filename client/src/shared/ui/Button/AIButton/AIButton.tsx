import { FC, FormEvent, ReactNode } from "react"
import "./AIButton.scss"

interface AIButtonProps {
	generating?: boolean
	disabled?: boolean
	type?: "button" | "submit" | "reset"
	onClick?: (e: FormEvent<HTMLButtonElement>) => void
	children: ReactNode
}

const AIButton: FC<AIButtonProps> = ({ generating = false, type = "button", onClick, children, disabled = false }) => {
	return (
		<button
			className={`ai-button ${disabled ? "ai-button--disabled" : ""} ${generating ? "ai-button--generating" : ""}`}
			type={type}
			disabled={disabled || generating}
			onClick={onClick}
		>
			{generating ? (
				<>
					<div className="ai-button__star">
						<div className="ai-button__star-inner"></div>
					</div>
					<span className="ai-button__text">{children}</span>
					<div className="ai-button__animation"></div>
				</>
			) : (
				<span className="ai-button__text">{children}</span>
			)}
		</button>
	)
}

export default AIButton
