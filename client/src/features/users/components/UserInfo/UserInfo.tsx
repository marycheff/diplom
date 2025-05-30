import UserAttempts from "@/features/attempts/components/UserAttempts/UserAttempts"
import UserTests from "@/features/tests/components/UserTests/UserTests"
import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { UserDTO, UsersListDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import CopyButton from "@/shared/ui/Button/Copy/CopyButton"
import Loader from "@/shared/ui/Loader/Loader"
import { ConfirmationModal } from "@/shared/ui/Modal"
import { shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./UserInfo.module.scss"
const UserInfo = () => {
	const { userId } = useParams<{ userId: string }>()

	if (!userId) {
		return <NothingFound title="ID пользователя не указан" />
	}
	if (!isValidUUID(userId)) {
		return <NothingFound title="Невалидный ID пользователя" />
	}

	const { getUserById, isLoading, blockUser, unblockUser, deleteUser, isFetching } = useUserStore()
	const [user, setUser] = useState<UserDTO>({} as UserDTO)
	const navigate = useNavigate()
	const [deleteModalOpen, setDeleteModalOpen] = useState(false)
	const [blockModalOpen, setBlockModalOpen] = useState(false)
	const [isDataLoaded, setIsDataLoaded] = useState(false)
	const { clearCache } = useCache<UsersListDTO>(useUserStore, "users")

	const fetchUser = async () => {
		try {
			const user = await getUserById(userId)
			if (user !== undefined) {
				setUser(user)
			}
			setIsDataLoaded(true)
		} catch {
			setIsDataLoaded(true)
		}
	}
	const handleDeleteUser = async () => {
		setDeleteModalOpen(true)
	}

	const confirmDeleteUser = async () => {
		await deleteUser(user.id)
		toast.success("Пользователь удален")
		navigate(ROUTES.ADMIN_USERS)
		clearCache()
		setDeleteModalOpen(false)
	}

	const handleBlockUser = async () => {
		setBlockModalOpen(true)
	}

	const confirmBlockUser = async () => {
		await blockUser(user.id)
		setUser({ ...user, isBlocked: true })
		toast.success("Пользователь заблокирован")
		clearCache()
		setBlockModalOpen(false)
	}

	const handleUnblockUser = async () => {
		await unblockUser(user.id)
		setUser({ ...user, isBlocked: false })
		toast.success("Пользователь разблокирован")
	}

	useEffect(() => {
		fetchUser()
	}, [userId, getUserById])
	if (isFetching || !isDataLoaded) {
		return <Loader fullScreen />
	}
	if (Object.keys(user).length === 0) {
		return <NothingFound title="Пользователь не найден" />
	}

	return (
		<>
			{isFetching ? (
				<Loader />
			) : (
				user && (
					<div className={styles.container}>
						<div className={styles.infoBlock}>
							<h1 className={styles.blockTitle}>Информация о пользователе</h1>
							<div className={styles.blockContent}>
								<div className={styles.infoRow}>
									<span className={styles.label}>ID</span>

									<span className={styles.value}>
										{shortenText(user.id)}
										<CopyButton textToCopy={user.id} />
									</span>
								</div>
								<div className={styles.infoRow}>
									<span className={styles.label}>Email</span>
									<span className={styles.value}>
										{user.email || <span className={styles.emptyField}>не указан</span>}
									</span>
								</div>
								<div className={styles.infoRow}>
									<span className={styles.label}>Имя</span>
									<span className={styles.value}>
										{user.name || <span className={styles.emptyField}>не указано</span>}
									</span>
								</div>
								<div className={styles.infoRow}>
									<span className={styles.label}>Фамилия</span>
									<span className={styles.value}>
										{user.surname || <span className={styles.emptyField}>не указана</span>}
									</span>
								</div>
								<div className={styles.infoRow}>
									<span className={styles.label}>Отчество</span>
									<span className={styles.value}>
										{user.patronymic || <span className={styles.emptyField}>не указано</span>}
									</span>
								</div>
								<div>
									{user.isBlocked ? (
										<Button
											onClick={() => handleUnblockUser()}
											disabled={isLoading}
										>
											Разблокировать
										</Button>
									) : (
										<Button
											onClick={() => handleBlockUser()}
											disabled={isLoading}
										>
											Заблокировать
										</Button>
									)}
									<Button
										onClick={() => handleDeleteUser()}
										disabled={isLoading}
									>
										Удалить
									</Button>
								</div>
							</div>
						</div>
						<div className={styles.infoBlock}>
							<h1 className={styles.blockTitle}>Попытки пользователя</h1>
							<UserAttempts />
						</div>
						<div className={styles.infoBlock}>
							<h1 className={styles.blockTitle}>Тесты пользователя</h1>
							<UserTests />
						</div>
					</div>
				)
			)}
			<ConfirmationModal
				isOpen={deleteModalOpen}
				onClose={() => setDeleteModalOpen(false)}
				onConfirm={confirmDeleteUser}
				title="Удаление пользователя"
				confirmText="Удалить"
				cancelText="Отмена"
			>
				<p>Вы уверены, что хотите удалить этого пользователя?</p>
			</ConfirmationModal>
			<ConfirmationModal
				isOpen={blockModalOpen}
				onClose={() => setBlockModalOpen(false)}
				onConfirm={confirmBlockUser}
				title="Блокировка пользователя"
				confirmText="Заблокировать"
				cancelText="Отмена"
			>
				<p>Вы уверены, что хотите заблокировать этого пользователя?</p>
			</ConfirmationModal>
		</>
	)
}

export default UserInfo
