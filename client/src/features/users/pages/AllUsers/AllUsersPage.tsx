import styles from "@/features/tests/pages/AllTests/AllTestsPage.module.scss"
import UserFilters from "@/features/users/components/Filters/UserFilters"
import UsersTable from "@/features/users/components/Tables/UsersTable/UsersTable"
import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { UserDTO, UserFilterParams } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import SearchBar from "@/shared/ui/SearchBar/SearchBar"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const AllUsersPage = () => {
	const [users, setUsers] = useState<UserDTO[]>([])
	const { filterUsers, searchUser, isFetching } = useUserStore()
	const [total, setTotal] = useState<number | null>(null)
	const [limit] = useState<number>(TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [filters, setFilters] = useState<UserFilterParams>({})
	const [lastUpdateDate, setLastUpdateDate] = useState<Date | null>(null)
	const navigate = useNavigate()
	const location = useLocation()
	const { handleResetSearch: resetSearch } = useSearch()

	const params = new URLSearchParams(location.search)

	const isFilterActive = Object.values(filters).some((value) => value !== undefined && value !== null)

	const fetchData = useCallback(
		async (currentPage: number, query?: string, filterParams?: UserFilterParams) => {
			if (isFetching) return

			let data
			if (query && !isFilterActive) {
				// Поиск возможен только при отсутствии фильтров
				data = await searchUser(query, currentPage, limit)
			} else {
				
				data = await filterUsers({
					page: currentPage,
					limit,
					...filterParams,
				})
			}

			if (data) {
				setUsers(data.users)
				setTotal(data.total)
				setLastUpdateDate(new Date())
			}
		},
		[filterUsers, searchUser, limit, isFetching, isFilterActive]
	)

	useEffect(() => {
		const query = params.get("query") || ""
		const role = params.get("role") || undefined
		const isActivated = params.get("isActivated")
		const isBlocked = params.get("isBlocked")

		const filterParams: UserFilterParams = {
			role,
			isActivated: isActivated !== null ? isActivated === "true" : undefined,
			isBlocked: isBlocked !== null ? isBlocked === "true" : undefined,
		}

		const pageParam = parseInt(params.get("page") || "1", 10)

		// Сброс query, если фильтры активны
		const hasFilters = Object.values(filterParams).some((value) => value !== undefined && value !== null)
		if (hasFilters && query) {
			params.delete("query")
			setSearchQuery("")
			navigate({ search: params.toString() }, { replace: true })
		} else {
			setSearchQuery(query)
		}

		fetchData(pageParam, query || undefined, filterParams)
		setFilters(filterParams)
		setPage(pageParam)
	}, [location.search])

	const handlePageChange = (newPage: number) => {
		params.set("page", newPage.toString())
		navigate({ search: params.toString() })
	}

	const handleSearch = () => {
		if (isFilterActive) {
			// Поиск невозможен при активных фильтрах
			return
		}
		params.set("query", searchQuery)
		params.delete("page")
		navigate({ search: params.toString() })
	}

	const handleClearSearchBar = () => {
		setSearchQuery("")
	}

	const handleResetSearch = () => {
		resetSearch()
		setSearchQuery("")
		params.delete("query")
		navigate({ search: params.toString() })
	}

	const handleFilterChange = (newFilters: Partial<UserFilterParams>) => {
		const updatedFilters = { ...filters, ...newFilters }
		setFilters(updatedFilters)

		Object.entries(updatedFilters).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				params.set(key, String(value))
			} else {
				params.delete(key)
			}
		})

		// Сброс query при применении фильтров
		params.delete("query")
		setSearchQuery("")
		params.delete("page")
		navigate({ search: params.toString() })
	}

	const handleResetFilters = () => {
		setFilters({})
		const keysToDelete = ["role", "isActivated", "isBlocked"]
		keysToDelete.forEach((key) => params.delete(key))
		navigate({ search: params.toString() })
	}

	const handleUpdateButton = () => {
		fetchData(page, isFilterActive ? undefined : searchQuery, filters)
	}

	const isDataLoaded = total !== null
	const isSearchActive = !!params.get("query")
	const totalPages = total !== null ? Math.ceil(total / limit) : 0
	const shouldShowContent = totalPages > 0 && page <= totalPages

	return (
		<>
			<SearchBar
				name="search"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				handleSearch={handleSearch}
				onClearSearch={handleClearSearchBar}
				onReset={handleResetSearch}
				resetButtonDisabled={isFetching || (!isSearchActive && !isFilterActive)}
				disabled={isFilterActive}
				isSearchActive={isSearchActive}
			/>

			<UserFilters
				filters={filters}
				onFilterChange={handleFilterChange}
				onResetFilters={handleResetFilters}
			/>

			<div className={styles.controls}>
				<div className={styles.buttons}>
					{page > totalPages && (
						<Button
							onClick={handleResetSearch}
							disabled={isFetching}
						>
							Сбросить
						</Button>
					)}
					<Button
						onClick={handleUpdateButton}
						disabled={isFetching}
					>
						Обновить
					</Button>
				</div>

				<Link to={ROUTES.ADMIN_CREATE_USER}>
					<Button className={styles.navigationButton}>Создать пользователя</Button>
				</Link>
				<div className={styles.cacheInfo}>
					<span>Последнее обновление: {lastUpdateDate ? formatDate(lastUpdateDate) : "Нет данных"}</span>
				</div>
			</div>

			{isFetching || !isDataLoaded ? (
				<TableSkeleton />
			) : (
				<>
					{shouldShowContent ? (
						<>
							<UsersTable
								users={users}
								total={total}
							/>
							<Pagination
								page={page}
								totalPages={totalPages}
								changePage={handlePageChange}
							/>
						</>
					) : (
						<NothingFound />
					)}
				</>
			)}
		</>
	)
}

export default AllUsersPage
