import { useState, ReactNode } from "react"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { FiLogOut } from "react-icons/fi"
import cn from "classnames"
import styles from "./LogoutButtonWithModal.module.scss"

type LogoutButtonWithModalProps = {
	buttonText?: string
	buttonClassName?: string
	icon?: ReactNode
	showIcon?: boolean
}

export const LogoutButtonWithModal = ({
	buttonText = "Выйти из системы",
	buttonClassName,
	icon = <FiLogOut />,
	showIcon = true,
}: LogoutButtonWithModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { logout } = useAuthStore()

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			<Button
				className={cn(styles.button, buttonClassName)}
				onClick={openModal}
			>
				{showIcon && <span className={styles.icon}>{icon}</span>}
				{buttonText}
			</Button>

			<ConfirmationModal
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={logout}
				title="Подтверждение выхода"
				confirmText="Выйти"
				cancelText="Отмена"
			>
				<p>Вы уверены, что хотите завершить текущую сессию?</p>
			</ConfirmationModal>
		</>
	)
}
