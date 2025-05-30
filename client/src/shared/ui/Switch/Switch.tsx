import { SwitchProps } from "@/shared/ui/Switch/Switch.props"
import { ForwardedRef, forwardRef } from "react"
import styles from "./Switch.module.scss"

export const Switch = forwardRef(
	(
		{ checked, onChange, className, leftLabel, rightLabel, ...props }: SwitchProps,
		ref: ForwardedRef<HTMLInputElement>
	) => (
		<label className={`${styles.switch} ${className || ""}`}>
			{leftLabel && <span className={styles.label}>{leftLabel}</span>}
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				ref={ref}
				{...props}
			/>
			<span className={styles.slider} />
			{rightLabel && <span className={styles.label}>{rightLabel}</span>}
		</label>
	)
)

export default Switch
