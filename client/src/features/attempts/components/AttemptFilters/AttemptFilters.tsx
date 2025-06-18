import { AttemptFilterParams, AttemptStatus } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Select from "@/shared/ui/Select/Select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import styles from "./AttemptFilters.module.scss"

interface AttemptFiltersProps {
	filters: AttemptFilterParams
	onFilterChange: (newFilters: Partial<AttemptFilterParams>) => void
	onResetFilters: () => void
}

const AttemptFilters: FC<AttemptFiltersProps> = ({ filters, onFilterChange, onResetFilters }) => {
	const { register, setValue } = useForm()

	const statusOptions = [
		{ value: "", label: "Все" },
		{ value: "IN_PROGRESS", label: "В процессе" },
		{ value: "COMPLETED", label: "Завершена" },
	]

	const handleStatusChange = (value: string) => {
		onFilterChange({
			status: value !== "" ? (value as AttemptStatus) : undefined,
		})
	}
	return (
		<div className={styles.filtersContainer}>
			<div className={styles.filterGroup}>
				<Select
					name="status"
					options={statusOptions}
					register={register}
					value={filters.status || ""}
					label="Статус"
					onChange={handleStatusChange}
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

export default AttemptFilters
