import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { TestDTO, VisibilityStatusLabels } from "@/shared/types"
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table"
import { FC, useMemo, useState } from "react"
import { generatePath, Link } from "react-router-dom"
import styles from "./UserTestsTable.module.scss"

interface MyTestsTableProps {
	tests: TestDTO[]
	total: number
}

const columnHelper = createColumnHelper<TestDTO>()

const UserTestsTable: FC<MyTestsTableProps> = ({ tests, total }) => {
	const { isAdmin } = useAuthStore()
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "actions",
				header: "",
				cell: (info) => (
					<Link
						to={
							isAdmin
								? generatePath(ROUTES.ADMIN_MY_TEST_INFO, { testId: info.row.original.id })
								: generatePath(ROUTES.MY_TEST_INFO, { testId: info.row.original.id })
						}
						className="actionLink"
					>
						Перейти
					</Link>
				),
			}),
			columnHelper.accessor("title", {
				header: "Название",
				cell: (info) => info.getValue(),
				sortingFn: "basic",
			}),
			columnHelper.accessor("visibilityStatus", {
				header: "Статус публикации",
				cell: (info) => VisibilityStatusLabels[info.getValue()],
				sortingFn: "basic",
			}),
			columnHelper.accessor("questions", {
				header: "Кол-во вопросов",
				cell: (info) => (info.getValue() ? info.getValue()?.length : 0),
				sortingFn: (rowA, rowB) => {
					const aVal = rowA.original.questions?.length || 0
					const bVal = rowB.original.questions?.length || 0
					return aVal - bVal
				},
			}),
			columnHelper.accessor("settings.requireRegistration", {
				header: "Требуется регистрация",
				cell: (info) => (info.getValue() ? "Да" : "Нет"),
				sortingFn: "basic",
			}),
			columnHelper.accessor("settings.showDetailedResults", {
				header: "Показывать детальные результаты",
				cell: (info) => (info.getValue() ? "Да" : "Нет"),
				sortingFn: "basic",
			}),
			columnHelper.accessor("totalAttempts", {
				header: "Кол-во попыток",
				cell: (info) => {
					const attempts = info.getValue()
					return attempts === 0 ? (
						"0"
					) : (
						<Link
							to={
								isAdmin
									? generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, { testId: info.row.original.id })
									: generatePath(ROUTES.MY_TEST_ATTEMPTS, { testId: info.row.original.id })
							}
							className="actionLink"
						>
							{attempts}
						</Link>
					)
				},
				sortingFn: "basic",
			}),
		],
		[isAdmin]
	)

	const table = useReactTable({
		data: tests,
		columns,
		state: {
			sorting,
		},
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
			{tests && tests.length > 0 && (
				<div className={styles.testsData}>
					<div className={styles.testsCount}>
						<h3>Всего: {total}</h3>
						<h3>На странице: {tests.length}</h3>
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
												]
													.filter(Boolean)
													.join(" ")}
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
			)}
		</>
	)
}

export default UserTestsTable
