import { FC } from "react"
import styles from "./BlankMarkerDisplay.module.scss"

interface BlankMarkerDisplayProps {
	className?: string
}

const BlankMarkerDisplay: FC<BlankMarkerDisplayProps> = ({ className }) => {
	return <span className={`${styles.blankMarker} ${className || ""}`}></span>
}

export default BlankMarkerDisplay
