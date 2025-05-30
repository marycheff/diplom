import { InputHTMLAttributes } from "react"

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
	checked: boolean
	onChange?: () => void
	className?: string
	disabled?: boolean
	leftLabel?: string
	rightLabel?: string
}
