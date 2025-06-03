import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { useState } from "react"
import styles from "./BlockedUserPage.module.scss"
import { FaExclamationTriangle } from "react-icons/fa"

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

			<Button
				className={styles.button}
				onClick={() => setIsLogoutModalOpen(true)}
			>
				Выйти из системы
			</Button>

			<ConfirmationModal
				isOpen={isLogoutModalOpen}
				onClose={() => setIsLogoutModalOpen(false)}
				onConfirm={logout}
				title="Подтверждение выхода"
				confirmText="Выйти"
				cancelText="Отмена"
			>
				<p>Вы уверены, что хотите завершить текущую сессию?</p>
			</ConfirmationModal>
		</div>
	)
}

export default BlockedUserPage
