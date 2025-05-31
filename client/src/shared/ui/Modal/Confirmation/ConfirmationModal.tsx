import { Button } from "@/shared/ui/Button"
import { Modal } from "@/shared/ui/Modal"
import { ReactNode, useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./ConfirmationModal.module.scss"

interface ConfirmationModalProps<T = any> {
	isOpen: boolean
	onClose: () => void
	onConfirm: SubmitHandler<T>
	title?: string
	children: ReactNode
	confirmText?: string
	cancelText?: string
	fullScreen?: boolean
	hideCancel?: boolean
}

const ConfirmationModal = <T extends Record<string, any> = {}>({
	isOpen,
	onClose,
	onConfirm,
	title,
	children,
	confirmText = "Подтвердить",
	cancelText = "Отмена",
	hideCancel = false,
}: ConfirmationModalProps<T>) => {
	const { handleSubmit, reset } = useForm<T>()

	// Сброс формы при открытии/закрытии модального окна
	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen, reset])

	// Обработчик закрытия
	const handleClose = () => {
		onClose()
	}

	// Обработчик подтверждения
	const handleConfirm: SubmitHandler<T> = (data) => {
		onConfirm(data)
		onClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title={title}
			isConfirmation
		>
			<form
				onSubmit={handleSubmit(handleConfirm)}
				className={styles.confirmationForm}
			>
				<div className={styles.modalBody}>{children}</div>
				<footer className={styles.modalFooter}>
					{!hideCancel && (
						<Button
							className={styles.cancelButton}
							onClick={handleClose}
						>
							{cancelText}
						</Button>
					)}
					<Button
						type="submit"
						className={styles.confirmButton}
					>
						{confirmText}
					</Button>
				</footer>
			</form>
		</Modal>
	)
}

export default ConfirmationModal
