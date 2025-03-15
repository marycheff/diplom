import React, { useEffect, useState } from "react"
import styles from "./Loader.module.css" 

const Loader: React.FC<{ delay?: number; text?: string }> = ({ delay = 0, text = "" }) => {
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

    return (
        <div className={styles.loaderOverlay}>
            <div className={styles.loader}></div>
            <div className={styles.loaderText}>{text}</div>
        </div>
    )
}

export default Loader
