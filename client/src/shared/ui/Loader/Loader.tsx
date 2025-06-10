import { FC, useEffect, useState } from "react"
import styles from "./Loader.module.scss"

interface LoaderProps {
	delay?: number
	text?: string
	fullScreen?: boolean
	centeredInParent?: boolean
}

const Loader: FC<LoaderProps> = ({ delay = 100, text = "", fullScreen = false, centeredInParent = false }) => {
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

	const className = fullScreen ? styles.loaderOverlay : centeredInParent ? styles.loaderAbsolute : styles.loaderRelative

	return (
		<div className={className}>
			<div className={styles.loader}></div>
			<div className={styles.loaderText}>{text}</div>
		</div>
	)
}

export default Loader
