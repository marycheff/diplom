import React, { useEffect, useState } from "react"
import styles from "./Loader.module.css"

interface LoaderProps {
    delay?: number
    text?: string
    fullScreen?: boolean
}

const Loader: React.FC<LoaderProps> = ({ delay = 0, text = "", fullScreen = false }) => {
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

    // Выбор класса на основе значения fullScreen
    const overlayClass = fullScreen ? styles.loaderOverlay : styles.loaderRelative

    return (
        <div className={overlayClass}>
            <div className={styles.loader}></div>
            <div className={styles.loaderText}>{text}</div>
        </div>
    )
}

export default Loader
