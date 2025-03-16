import { FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import styles from "./InternetConnectionStatus.module.css"

const InternetConnectionStatus: FC = () => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine)

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true)
            toast.success("Соединение восстановлено")
        }

        const handleOffline = () => {
            setIsOnline(false)
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])
    if (isOnline) {
        return null
    }

    return (
        <div className={styles.connectionOverlay}>
            <div className={styles.connectionMessage}>
                <div className={styles.connectionIcon}>
                    {/* Example SVG icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="24px"
                        height="24px">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                    </svg>
                </div>
                <h2>Нет подключения к интернету</h2>
                <p>Пожалуйста, проверьте ваше соединение и попробуйте снова.</p>
            </div>
        </div>
    )
}

export default InternetConnectionStatus
