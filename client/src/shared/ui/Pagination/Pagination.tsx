import { usePagination } from "@/shared/hooks/usePagination"
import { Button } from "@/shared/ui/Button"
import { FC } from "react"
import styles from "./Pagination.module.scss"

interface PaginationProps {
	totalPages: number
	page: number
	changePage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ totalPages, page, changePage }) => {
	const pagesArray = usePagination(totalPages, page)

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.navigationButtons}>
				{/* Кнопка "В начало" */}
				<Button
					className={styles.navigationButton}
					onClick={() => changePage(1)}
					disabled={page === 1 || totalPages === 0}
				>
					<span className={styles.buttonSymbol}>{"<<"}</span>
					<span className={styles.buttonText}>{"В начало"}</span>
				</Button>

				{/* Кнопка "Назад" */}
				<Button
					className={styles.navigationButton}
					onClick={() => changePage(page - 1)}
					disabled={page === 1 || totalPages === 0}
				>
					<span className={styles.buttonSymbol}>{"<"}</span>
					<span className={styles.buttonText}>{"Назад"}</span>
				</Button>
			</div>

			{/* Список страниц */}
			{pagesArray.map((p, index) => {
				if (p === "...") {
					return (
						<span
							key={`dots-${index}`}
							className={styles.dots}
						>
							...
						</span>
					)
				}
				return (
					<span
						key={p}
						className={page === p ? `${styles.page} ${styles.pageCurrent}` : styles.page}
						onClick={() => typeof p === "number" && changePage(p)}
					>
						{p}
					</span>
				)
			})}

			<div className={styles.navigationButtons}>
				{/* Кнопка "Вперед" */}
				<Button
					className={styles.navigationButton}
					onClick={() => changePage(page + 1)}
					disabled={page === totalPages || totalPages === 0}
				>
					<span className={styles.buttonText}>{"Вперед"}</span>
					<span className={styles.buttonSymbol}>{">"}</span>
				</Button>

				{/* Кнопка "В конец" */}
				<Button
					className={styles.navigationButton}
					onClick={() => changePage(totalPages)}
					disabled={page === totalPages || totalPages === 0}
				>
					<span className={styles.buttonText}>{"В конец"}</span>
					<span className={styles.buttonSymbol}>{">>"}</span>
				</Button>
			</div>
		</div>
	)
}

export default Pagination
