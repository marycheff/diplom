import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { RoleLabels, UserDTO } from "@/shared/types"
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
import styles from "./UsersTable.module.scss"

interface UsersTableProps {
	users: UserDTO[] | undefined
	total: number
}

const columnHelper = createColumnHelper<UserDTO>()

const UsersTable: FC<UsersTableProps> = ({ users = [], total }) => {
	const { user: currentUser } = useAuthStore()
	const [sorting, setSorting] = useState<SortingState>([])

	const columns = useMemo(
		() => [
			columnHelper.display({
				id: "actions",
				header: "",
				cell: (info) =>
					info.row.original.id === currentUser?.id ? (
						<span>(Вы)</span>
					) : (
						<Link
							to={generatePath(ROUTES.ADMIN_USER_INFO, {
								userId: info.row.original.id,
							})}
							className="actionLink"
						>
							Перейти
						</Link>
					),
			}),
			columnHelper.accessor("email", {
				header: "Email",
				cell: (info) => info.getValue(),
				sortingFn: "basic",
			}),
			columnHelper.accessor("name", {
				header: "Имя",
				cell: (info) => info.getValue() || "—",
				sortingFn: "basic",
			}),
			columnHelper.accessor("surname", {
				header: "Фамилия",
				cell: (info) => info.getValue() || "—",
				sortingFn: "basic",
			}),
			columnHelper.accessor("patronymic", {
				header: "Отчество",
				cell: (info) => info.getValue() || "—",
				sortingFn: "basic",
			}),
			columnHelper.accessor("role", {
				header: "Роль",
				cell: (info) => RoleLabels[info.getValue()],
				sortingFn: "basic",
			}),
			columnHelper.accessor("isBlocked", {
				header: "Статус",
				cell: (info) => (info.getValue() ? "Заблокирован" : "Активен"),
				sortingFn: "basic",
			}),
			columnHelper.accessor("isActivated", {
				header: "Активирован",
				cell: (info) => (info.getValue() ? "Да" : "Нет"),
				sortingFn: "basic",
			}),
		],
		[currentUser]
	)

	const table = useReactTable({
		data: users,
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
			{users.length > 0 && (
				<div className={styles.usersData}>
					<div className={styles.usersCount}>
						<h3>Всего: {total}</h3>
						<h3>На странице: {users.length}</h3>
					</div>

					<div className={styles.tableResponsive}>
						<table>
							<thead>
								{table.getHeaderGroups().map((headerGroup) => (
									<tr key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<th
												key={header.id}
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

export default UsersTable
