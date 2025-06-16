import { useState, useMemo } from "react"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { AttemptStatus, AttemptStatusLabels, AttemptWithSnapshotDTO } from "@/shared/types"
import { formatDate } from "@/shared/utils/formatter"
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	SortingState,
} from "@tanstack/react-table"
import { generatePath, Link } from "react-router-dom"
import styles from "./AttemptsTable.module.scss"

interface UserAttemptsTableProps {
	attempts: AttemptWithSnapshotDTO[] | undefined
	total: number
}

const columnHelper = createColumnHelper<AttemptWithSnapshotDTO>()

const UserAttemptsTable = ({ attempts = [], total }: UserAttemptsTableProps) => {
	const { isAdmin } = useAuthStore()
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "action",
				header: "",
				cell: ({ row }) => {
					const attempt = row.original
					const path =
						attempt.status === AttemptStatus.IN_PROGRESS
							? generatePath(ROUTES.PASS_ATTEMPT, { attemptId: attempt.id })
							: isAdmin
							? generatePath(ROUTES.ADMIN_ATTEMPT_INFO, { attemptId: attempt.id })
							: generatePath(ROUTES.ATTEMPT_RESULTS, { attemptId: attempt.id })

					return (
						<Link
							to={path}
							className="actionLink"
						>
							{attempt.status === AttemptStatus.IN_PROGRESS ? "Продолжить" : "Перейти"}
						</Link>
					)
				},
			}),
			columnHelper.accessor((row) => row.snapshot?.title || "", {
				id: "test",
				header: "Тест",
				cell: ({ row }) => {
					const snapshot = row.original.snapshot
					if (!snapshot) return <span className={styles.emptyField}>—</span>
					return isAdmin ? (
						<Link
							to={`/admin/tests/${snapshot.testId}`}
							className="actionLink"
						>
							{snapshot.title}
						</Link>
					) : (
						snapshot.title
					)
				},
				sortingFn: "basic",
			}),
			columnHelper.accessor("status", {
				header: "Статус",
				cell: (info) => AttemptStatusLabels[info.getValue()],
				sortingFn: "basic",
			}),
			columnHelper.accessor("startedAt", {
				header: "Начат",
				cell: (info) => formatDate(info.getValue()),
				sortingFn: "datetime",
			}),
			columnHelper.accessor("completedAt", {
				header: "Завершен",
				cell: (info) => (info.getValue() ? formatDate(info.getValue()) : "—"),
				sortingFn: "datetime",
			}),
			columnHelper.accessor("score", {
				header: "Результат",
				cell: (info) =>
					typeof info.getValue() === "number" ? `${info.getValue()}%` : <span className={styles.emptyField}>—</span>,
				sortingFn: "basic",
			}),
		],
		[isAdmin]
	)

	const table = useReactTable({
		data: attempts,
		columns,
		state: { sorting },
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	const getSortIcon = (canSort: boolean, isSorted: false | "asc" | "desc") => {
		if (!canSort) return null
		if (isSorted === "asc") return " ↑"
		if (isSorted === "desc") return " ↓"
		return " ↕"
	}

	return (
		<>
			{attempts.length > 0 && (
				<div className={styles.attemptsData}>
					<div className={styles.attemptsCount}>
						<h3>Всего: {total}</h3>
						<h3>На странице: {attempts.length}</h3>
					</div>

					<div className={styles.tableResponsive}>
						<table>
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
												scope="col"
												onClick={header.column.getToggleSortingHandler()}
												className={[
													header.column.getCanSort() ? styles.sortableHeader : "",
													header.column.getIsSorted() ? styles.sortedHeader : "",
												]
													.filter(Boolean)
													.join(" ")}
											>
												<span className={styles.headerContent}>
													<span className={styles.sortIcon}>
														{getSortIcon(header.column.getCanSort(), header.column.getIsSorted())}
													</span>
													{flexRender(header.column.columnDef.header, header.getContext())}
												</span>
											</th>
										))}
									</tr>
								))}
							</thead>
							<tbody>
								{table.getRowModel().rows.map((row) => (
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => (
											<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}

export default UserAttemptsTable
