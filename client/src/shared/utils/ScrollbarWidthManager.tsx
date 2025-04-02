import { useEffect } from "react"
import styles from "./Scrollbar.module.scss"
const ScrollbarWidthManager = () => {
    useEffect(() => {
        const updateScrollbarWidth = () => {
            const baseWidth = 10 
            const scale = window.devicePixelRatio 
            const adjustedWidth = baseWidth / scale 
            document.documentElement.style.setProperty("--scrollbar-width", `${adjustedWidth}px`)
        }
        updateScrollbarWidth()
        window.addEventListener("resize", updateScrollbarWidth)
        return () => {
            window.removeEventListener("resize", updateScrollbarWidth)
        }
    }, [])

    return null // Компонент ничего не рендерит
}

export default ScrollbarWidthManager
