import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import Modal from "@/shared/ui/Modal/Base/Modal"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import styles from "./AccountDeletionModal.module.scss"

interface AccountDeletionModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
}

const AccountDeletionModal = ({ isOpen, onClose, onConfirm }: AccountDeletionModalProps) => {
	const { user } = useAuthStore()
	const { register, setValue, trigger, watch, reset } = useForm({
		mode: "onChange",
		defaultValues: {
			confirmation: "",
		},
	})

	const inputValue = watch("confirmation")
	const isConfirmed = inputValue === user?.email

	const handleConfirm = () => {
		if (isConfirmed) {
			onConfirm()
		}
	}
	useEffect(() => {
		if (!isOpen) {
			reset()
		}
	}, [isOpen, reset])

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Подтверждение удаления аккаунта"
			isConfirmation
		>
			<div className={styles.content}>
				<div className={styles.contentBody}>
					<p>
						<strong>Внимание!</strong> При удалении аккаунта, все созданные Вами тесты, а также попытки прохождения этих
						тестов другими пользователями будут <strong>удалены навсегда.</strong>
					</p>
					<p>
						Чтобы подтвердить удаление аккаунта, введите <strong>свой email-адрес</strong> ниже:
					</p>
					<ValidatedInput
						type="text"
						name="confirmation"
						className={styles.input}
						register={register}
						setValue={setValue}
						trigger={trigger}
					/>
				</div>
				<div className={styles.buttons}>
					<Button
						onClick={onClose}
						variant="secondary"
					>
						Отмена
					</Button>
					<Button
						onClick={handleConfirm}
						disabled={!isConfirmed}
						className={styles.danger}
					>
						Удалить аккаунт
					</Button>
				</div>
			</div>
		</Modal>
	)
}

export default AccountDeletionModal
