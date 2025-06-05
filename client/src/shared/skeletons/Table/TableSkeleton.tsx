import stylesPagination from "@/shared/ui/Pagination/Pagination.module.scss"
import { FC } from "react"
import styles from "./TableSkeleton.module.scss"

interface TableSkeletonProps {
	rows?: number
}

const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 10 }) => {
	const skeletonData = Array(rows).fill({})
	const pagesArray = [1, 2, 3]

	return (
		<div className={styles.tableSkeleton}>
			<div className={styles.tableSkeletonData}>
				<div className={styles.tableSkeletonResponsive}>
					<table>
						<thead>
							<tr>
								{[...Array(8)].map((_, i) => (
									<th
										key={i}
										scope="col"
									>
										<span className={`${styles.skeleton} ${styles.skeletonBox}`}></span>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{skeletonData.map((_, index) => (
								<tr key={index}>
									{[...Array(7)].map((_, i) => (
										<td key={i}>
											<span
												className={`${styles.skeleton} ${styles.skeletonBox} ${i === 3 ? styles.skeletonBoxWide : ""}`}
											></span>
										</td>
									))}
									<td>
										<span className={`${styles.skeleton} ${styles.skeletonBox}`}></span>
									</td>
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
