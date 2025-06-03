import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa"
import styles from "./ActivationSuccessPage.module.scss"

const ActivationSuccessPage = () => {
	const navigate = useNavigate()
	const params = new URLSearchParams(location.search)
	const accessToken = params.get("accessToken") || ""

	if (accessToken) {
		localStorage.setItem("token", accessToken)
	}

	const handleLoginClick = () => {
		navigate(ROUTES.LOGIN)
	}

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.container}>
				<div className={styles.icon}>
					<FaCheckCircle />
				</div>
				<h1 className={styles.heading}>Активация прошла успешно!</h1>
				<p className={styles.text}>Пожалуйста, войдите в систему снова, чтобы продолжить.</p>
				<Button onClick={handleLoginClick}>Войти</Button>
			</div>
		</div>
	)
}

export default ActivationSuccessPage
