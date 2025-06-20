import { FC, useEffect, useState } from "react"
import styles from "./Loader.module.scss"

interface LoaderProps {
	delay?: number
	text?: string
	fullScreen?: boolean
	centeredInParent?: boolean
	transparentOverlay?: boolean
}

const Loader: FC<LoaderProps> = ({
	delay = 100,
	text = "",
	fullScreen = false,
	centeredInParent = false,
	transparentOverlay = false,
}) => {
	const [showLoader, setShowLoader] = useState(false)

	if (delay > 0) {
		useEffect(() => {
			const timer = setTimeout(() => {
				setShowLoader(true)
			}, delay)
			return () => clearTimeout(timer)
		}, [delay])
		if (!showLoader) {
			return null
		}
	}

	const className = fullScreen
		? transparentOverlay
			? `${styles.loaderOverlay} ${styles.transparent}`
			: styles.loaderOverlay
		: centeredInParent
		? styles.loaderAbsolute
		: styles.loaderRelative

	return (
		<div className={className}>
			<div className={styles.loader}></div>
			<div className={styles.loaderText}>{text}</div>
		</div>
	)
}

export default Loader
