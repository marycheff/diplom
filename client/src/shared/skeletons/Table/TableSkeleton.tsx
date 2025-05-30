import stylesPagination from "@/shared/ui/Pagination/Pagination.module.scss"
import { FC } from "react"
import "./TableSkeleton.scss"
interface TableSkeletonProps {
	rows?: number
}
const TableSkeleton: FC<TableSkeletonProps> = ({ rows = 10 }) => {
	const skeletonData = Array(rows).fill({})
	const pagesArray = [1, 2, 3]

	return (
		<div className="table-skeleton">
			<div className="table-data">
				<div className="table-responsive">
					<table>
						<thead>
							<tr>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
								<th scope="col">
									<span className="skeleton skeleton-box"></span>
								</th>
							</tr>
						</thead>
						<tbody>
							{skeletonData.map((_, index) => (
								<tr key={index}>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box skeleton-box--wide"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
									</td>
									<td>
										<span className="skeleton skeleton-box"></span>
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
						className={`${stylesPagination.page} ${p === 1 ? stylesPagination.pageCurrent : ""} skeleton`}
					>
						{p}
					</span>
				))}
			</div>
		</div>
	)
}

export default TableSkeleton
