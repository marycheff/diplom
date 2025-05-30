import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { useState } from "react"
import styles from "./BlockedUserPage.module.scss"

const BlockedUserPage = () => {
	const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
	const { logout } = useAuthStore()

	return (
		<div className={styles.container}>
			<div className={styles.icon}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
					/>
				</svg>
			</div>

			<h1 className={styles.title}>Ваш аккаунт заблокирован</h1>

			<p className={styles.description}>
				Доступ к системе ограничен за неправомерное использование. Для получения подробной информации о причинах
				блокировки и дальнейших действиях, пожалуйста, обратитесь в службу поддержки.
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
