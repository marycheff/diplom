import { useLocation, useNavigate } from "react-router-dom"
import styles from "./BackButton.module.scss"

const BackButton = () => {
	const navigate = useNavigate()
	const location = useLocation()

	// Функция для проверки, можно ли вернуться назад в рамках вашего приложения
	const canGoBack = () => {
		// Есть ли предыдущая запись в истории роутера
		return window.history.length > 1 && location.key !== "default"
	}

	const goBack = () => {
		if (canGoBack()) {
			navigate(-1) 
		}
	}

	return canGoBack() ? (
		<button
			className={styles.backButton}
			onClick={goBack}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M15 18L9 12L15 6"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	) : null
}

export default BackButton
