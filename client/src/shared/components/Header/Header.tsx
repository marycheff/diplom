import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import styles from "./Header.module.scss"

const Header = () => {
	const { user } = useAuthStore()
	const navigate = useNavigate()

	return (
		<header className={styles.header}>
			<div className={styles.logo}>НейроТест</div>
			<div className={styles.authButtons}>
				{user ? (
					<>
						<Button onClick={() => navigate(ROUTES.HOME)}>Главная</Button>
						<Button
							onClick={() => navigate(ROUTES.MY_ATTEMPTS)}
							variant="secondary"
						>
							Мои результаты
						</Button>
					</>
				) : (
					<>
						<Button onClick={() => navigate(ROUTES.LOGIN)}>Авторизация</Button>
						<Button
							onClick={() => navigate(ROUTES.REGISTER)}
							variant="secondary"
						>
							Регистрация
						</Button>
					</>
				)}
			</div>
		</header>
	)
}

export default Header
