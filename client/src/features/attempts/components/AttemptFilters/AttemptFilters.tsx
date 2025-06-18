import { AttemptFilterParams, AttemptStatus } from "@/shared/types"
import Select from "@/shared/ui/Select/Select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { RxReset } from "react-icons/rx"
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
		{ value: "EXPIRED", label: "Истекла" },
	]

	const handleStatusChange = (value: string) => {
		onFilterChange({
			status: value !== "" ? (value as AttemptStatus) : undefined,
		})
	}
	const isFilterApplied = !!filters.status
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

			{isFilterApplied && (
				<button
					type="button"
					className={styles.resetIconButton}
					onClick={onResetFilters}
					aria-label="Сбросить фильтры"
				>
					<RxReset size={20} />
				</button>
			)}
		</div>
	)
}

export default AttemptFilters
