import { FC, FormEvent, ReactNode } from "react"
import styles from "./AIButton.module.scss"

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
			className={`${styles.button} ${disabled ? styles.disabled : ""} ${generating ? styles.generating : ""}`}
			type={type}
			disabled={disabled || generating}
			onClick={onClick}
		>
			{generating ? (
				<>
					<div className={styles.star}>
						<div className={styles.starInner}></div>
					</div>
					<span className={styles.text}>{children}</span>
					<div className={styles.animation}></div>
				</>
			) : (
				<span className={styles.text}>{children}</span>
			)}
		</button>
	)
}

export default AIButton
