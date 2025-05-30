import { InputProps } from "@/shared/ui/Input"
import { FC, KeyboardEvent } from "react"
import { FiSearch } from "react-icons/fi"
import styles from "./SearchBar.module.scss"

export interface SearchBarProps extends InputProps {
	handleSearch: () => void
	onClearSearch: () => void
}

const SearchBar: FC<SearchBarProps> = ({
	value,
	onChange,
	handleSearch,
	onClearSearch,
	placeholder = "Поиск",
	...rest
}) => {
	const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSearch()
			;(event.target as HTMLInputElement).blur()
		}
	}

	return (
		<div className={styles.searchBar}>
			<input
				type="text"
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				className={styles.input}
				{...rest}
			/>

			{value && (
				<button
					type="button"
					onClick={onClearSearch}
					className={styles.clearButton}
					aria-label="Очистить поиск"
				>
					&times;
				</button>
			)}

			<button
				type="button"
				onClick={handleSearch}
				className={styles.searchButton}
				aria-label="Найти"
			>
				<FiSearch size={18} />
			</button>
		</div>
	)
}

export default SearchBar
