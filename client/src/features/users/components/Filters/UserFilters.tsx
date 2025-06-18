import { UserFilterParams } from "@/shared/types"
import { Button } from "@/shared/ui/Button"

import Select from "@/shared/ui/Select/Select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import styles from "./UserFilters.module.scss"

interface UserFiltersProps {
	filters: UserFilterParams
	onFilterChange: (newFilters: Partial<UserFilterParams>) => void
	onResetFilters: () => void
}

const UserFilters: FC<UserFiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
	const { register, setValue} = useForm()

	const roleOptions = [
		{ value: "", label: "Все" },
		{ value: "ADMIN", label: "Администратор" },
		{ value: "USER", label: "Пользователь" },
	]

	const activationOptions = [
		{ value: "", label: "Все" },
		{ value: "true", label: "Активирован" },
		{ value: "false", label: "Не активирован" },
	]

	const blockingOptions = [
		{ value: "", label: "Все" },
		{ value: "true", label: "Заблокирован" },
		{ value: "false", label: "Не заблокирован" },
	]

	const handleRoleChange = (value: string) => {
		onFilterChange({ role: value || undefined })
	}

	const handleActivationChange = (value: string) => {
		onFilterChange({
			isActivated: value !== "" ? value === "true" : undefined,
		})
	}

	const handleBlockingChange = (value: string) => {
		onFilterChange({
			isBlocked: value !== "" ? value === "true" : undefined,
		})
	}

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.filterGroup}>
				<Select
					name="role"
					options={roleOptions}
					register={register}
					value={filters.role || ""}
					label="Роль"
					onChange={handleRoleChange}
					setValue={setValue}
				/>
			</div>

			<div className={styles.filterGroup}>
				<Select
					name="isActivated"
					options={activationOptions}
					register={register}
					value={filters.isActivated !== undefined ? String(filters.isActivated) : ""}
					label="Активация"
					onChange={handleActivationChange}
					setValue={setValue}
				/>
			</div>

			<div className={styles.filterGroup}>
				<Select
					name="isBlocked"
					options={blockingOptions}
					register={register}
					value={filters.isBlocked !== undefined ? String(filters.isBlocked) : ""}
					label="Блокировка"
					onChange={handleBlockingChange}
					setValue={setValue}
				/>
			</div>

			<Button
				onClick={onResetFilters}
				className={styles.resetButton}
			>
				Сбросить фильтры
			</Button>
		</div>
	)
}

export default UserFilters
