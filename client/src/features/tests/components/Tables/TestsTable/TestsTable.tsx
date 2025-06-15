import { ROUTES } from "@/router/paths"
import { TestDTO, VisibilityStatusLabels } from "@/shared/types"
import { shortenText } from "@/shared/utils/formatter"
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
import styles from "./TestsTable.module.scss"

interface TestsTableProps {
	tests: TestDTO[]
	total: number
	type?: "all" | "unmoderated"
}

const columnHelper = createColumnHelper<TestDTO>()

const TestsTable: FC<TestsTableProps> = ({ tests, total, type = "all" }) => {
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "goToDetails",
				header: "",
				cell: (info) => (
					<Link
						to={
							type === "unmoderated"
								? generatePath(ROUTES.ADMIN_UNMODERATED_TEST_INFO, {
										testId: info.row.original.id,
								  })
								: generatePath(ROUTES.ADMIN_TEST_INFO, {
										testId: info.row.original.id,
								  })
						}
						className="actionLink"
					>
						Перейти
					</Link>
				),
			}),

			columnHelper.accessor("moderatedAt", {
				header: "Модерирован",
				cell: (info) => (info.getValue() ? "Да" : "Нет"),
				sortingFn: "basic",
			}),
			columnHelper.accessor("author.email", {
				header: "Автор",
				cell: (info) => (
					<Link
						to={generatePath(ROUTES.ADMIN_USER_INFO, {
							userId: info.row.original.author.id,
						})}
						className="actionLink"
						title={info.getValue()}
					>
						{shortenText(info.getValue(), 30)}
					</Link>
				),
				sortingFn: "basic",
			}),
			columnHelper.accessor("title", {
				header: "Название",
				cell: (info) => shortenText(info.getValue(), 30),
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
			columnHelper.accessor("totalAttempts", {
				header: "Кол-во попыток",
				cell: (info) => {
					const attempts = info.getValue()
					return attempts === 0 ? (
						"0"
					) : (
						<Link
							to={
								type === "unmoderated"
									? generatePath(ROUTES.ADMIN_UNMODERATED_TEST_ATTEMPTS, {
											testId: info.row.original.id,
									  })
									: generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, {
											testId: info.row.original.id,
									  })
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
		[type]
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

export default TestsTable
