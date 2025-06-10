import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { useState } from "react"
import styles from "./BlockedUserPage.module.scss"
import { FaExclamationTriangle } from "react-icons/fa"
import { LogoutButtonWithModal } from "@/shared/ui/LogoutButtonWithModal/LogoutButtonWithModal"

const BlockedUserPage = () => {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
	const { logout } = useAuthStore()

	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				<FaExclamationTriangle />
			</div>

			<h1 className={styles.title}>Ваш аккаунт заблокирован</h1>

			<p className={styles.description}>
				Доступ к системе ограничен за неправомерное использование. Вы можете выйти из системы.
			</p>

			<LogoutButtonWithModal />
		</div>
	)
}

export default BlockedUserPage
