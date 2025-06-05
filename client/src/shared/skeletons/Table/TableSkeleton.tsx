import stylesPagination from "@/shared/ui/Pagination/Pagination.module.scss"
import { FC } from "react"
import styles from "./TableSkeleton.module.scss"

interface TableSkeletonProps {
	rows?: number
	cols?: number
}

const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 10, cols = 8 }) => {
	const skeletonData = Array(rows).fill({})
	const columnsArray = Array(cols).fill({})
	const pagesArray = [1, 2, 3]

	return (
		<div className={styles.tableSkeleton}>
			<div className={styles.tableData}>
				<div className={styles.tableResponsive}>
					<table className={styles.table}>
						<thead>
							<tr>
								{columnsArray.map((_, index) => (
									<th
										key={index}
										scope="col"
									>
										<span className={`${styles.skeleton} ${styles.skeletonBox}`}></span>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{skeletonData.map((_, rowIndex) => (
								<tr key={rowIndex}>
									{columnsArray.map((_, colIndex) => (
										<td key={colIndex}>
											<span
												className={`${styles.skeleton} ${styles.skeletonBox} ${
													colIndex === 3 ? styles.skeletonBoxWide : ""
												}`}
											></span>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className={stylesPagination.pageWrapper}>
				{pagesArray.map((p) => (
					<span
						key={p}
						className={`${stylesPagination.page} ${p === 1 ? stylesPagination.pageCurrent : ""} ${styles.skeleton}`}
					>
						{p}
					</span>
				))}
			</div>
		</div>
	)
}

export default TableSkeleton
