import React from "react"
import styles from "./BlankMarkerDisplay.module.scss"

interface BlankMarkerDisplayProps {
    className?: string
}

const BlankMarkerDisplay: React.FC<BlankMarkerDisplayProps> = ({ className }) => {
    return <span className={`${styles.blankMarker} ${className || ""}`}></span>
}

export default BlankMarkerDisplay
