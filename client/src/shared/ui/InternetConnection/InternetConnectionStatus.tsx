import { FC, useEffect, useState } from "react"
import toast from "react-hot-toast"
import styles from "./InternetConnectionStatus.module.scss"
import { BiNoSignal } from "react-icons/bi"

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
					<BiNoSignal />
				</div>
				<h2>Нет подключения к интернету</h2>
				<p>Пожалуйста, проверьте ваше соединение и попробуйте снова.</p>
			</div>
		</div>
	)
}

export default InternetConnectionStatus
