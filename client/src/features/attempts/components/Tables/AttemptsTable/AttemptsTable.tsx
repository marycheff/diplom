import {
	useReactTable,
	getCoreRowModel,
	getSortedRowModel,
	flexRender,
	createColumnHelper,
	type SortingState,
} from "@tanstack/react-table"
import { useState, useMemo } from "react"
import { Link, generatePath } from "react-router-dom"
import { AttemptDTO, AttemptStatusLabels, GenderLabels, PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { ROUTES } from "@/router/paths"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { formatDate } from "@/shared/utils/formatter"
import styles from "./AttemptsTable.module.scss"

interface AttemptsTableProps {
	attempts: AttemptDTO[] | undefined
	total: number
}

const columnHelper = createColumnHelper<AttemptDTO>()

const AttemptsTable = ({ attempts = [], total }: AttemptsTableProps) => {
	const { isAdmin } = useAuthStore()
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "actions",
				header: "",
				cell: (info) => {
					const attempt = info.row.original
					const to = isAdmin
						? generatePath(ROUTES.ADMIN_ATTEMPT_INFO, { attemptId: attempt.id })
						: generatePath(ROUTES.MY_TEST_ATTEMPT_INFO, {
								testId: attempt.test.id,
								attemptId: attempt.id,
						  })

					return (
						<Link
							to={to}
							className="actionLink"
						>
							Перейти
						</Link>
					)
				},
			}),
			columnHelper.display({
				id: "user",
				header: "Пользователь",
				cell: (info) => {
					const { user, preTestUserData } = info.row.original

					if (user) {
						return isAdmin ? (
							<Link
								to={generatePath(ROUTES.ADMIN_USER_INFO, { userId: user.id })}
								className="actionLink"
							>
								{user.email}
							</Link>
						) : (
							<span>{user.email}</span>
						)
					}

					if (preTestUserData) {
						const display = Object.entries(preTestUserData)
							.map(([key, value]) => {
								const label = PreTestUserDataLabels[key as PreTestUserData] || key
								const displayValue =
									key === PreTestUserData.Gender && value ? GenderLabels[value.toString()] || value : value
								return `${label}: ${displayValue}`
							})
							.join(", ")
						return <span>{display}</span>
					}

					return <span className={styles.emptyField}>аноним</span>
				},
			}),

			
			columnHelper.accessor((row) => row.test.title, {
				id: "test",
				header: "Тест",
				cell: (info) => {
					const attempt = info.row.original
					const path = isAdmin ? ROUTES.ADMIN_TEST_INFO : ROUTES.MY_TEST_INFO
					return (
						<Link
							to={generatePath(path, { testId: attempt.test.id })}
							className="actionLink"
						>
							{attempt.test.title}
						</Link>
					)
				},
				sortingFn: "text",
			}),
			columnHelper.accessor("status", {
				header: "Статус",
				cell: (info) => AttemptStatusLabels[info.getValue()],
				sortingFn: "basic",
			}),
			columnHelper.accessor("startedAt", {
				header: "Начата",
				cell: (info) => formatDate(info.getValue()),
				sortingFn: "datetime",
			}),
			columnHelper.accessor("completedAt", {
				header: "Завершена",
				cell: (info) => (info.getValue() ? formatDate(info.getValue()!) : "—"),
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

	if (!attempts || attempts.length === 0) return null

	return (
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
										className={[
											header.column.getCanSort() ? styles.sortableHeader : "",
											sorting[0]?.id === header.column.id ? styles.sortedHeader : "",
										].join(" ")}
										onClick={header.column.getToggleSortingHandler()}
										title={
											header.column.getCanSort()
												? header.column.getNextSortingOrder() === "asc"
													? "Сортировать по возрастанию"
													: header.column.getNextSortingOrder() === "desc"
													? "Сортировать по убыванию"
													: "Очистить сортировку"
												: undefined
										}
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
	)
}

export default AttemptsTable
