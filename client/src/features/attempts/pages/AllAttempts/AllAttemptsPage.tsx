import AttemptFilters from "@/features/attempts/components/AttemptFilters/AttemptFilters"
import AttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/AttemptsTable"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import styles from "@/features/tests/pages/AllTests/AllTestsPage.module.scss"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useAttemptsCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { AttemptDTO, AttemptFilterParams, AttemptStatus } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AllAttemptsPage = () => {
	const { filterAttempts, isFetching } = useAttemptStore()
	const [attempts, setAttempts] = useState<AttemptDTO[]>([])
	const [total, setTotal] = useState<number | null>(null)
	const [limit] = useState<number>(TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)
	const [filters, setFilters] = useState<AttemptFilterParams>({})
	const navigate = useNavigate()
	const location = useLocation()
	const { handleResetSearch: resetSearch } = useSearch()
	const params = new URLSearchParams(location.search)

	const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate, } = useAttemptsCache()

	const fetchData = useCallback(
		async (currentPage: number, filterParams?: AttemptFilterParams) => {
			if (isFetching) return

			const cacheKey = getCacheKey(currentPage, "", filterParams)
			const cachedData = getCachedData(cacheKey)

			if (cachedData) {
				setAttempts(cachedData.attempts)
				setTotal(cachedData.total)
				return
			}

			const data = await filterAttempts({
				page: currentPage,
				limit,
				...filterParams,
			})

			if (data) {
				setAttempts(data.attempts)
				setTotal(data.total)
				saveToCache(cacheKey, data)
			}
		},
		[filterAttempts, getCacheKey, getCachedData, saveToCache, limit]
	)

	useEffect(() => {
		const status = params.get("status") as AttemptStatus | undefined
		const pageParam = parseInt(params.get("page") || "1", 10)

		const filterParams: AttemptFilterParams = {
			status,
		}

		fetchData(pageParam, filterParams)
		setFilters(filterParams)
		setPage(pageParam)
	}, [location.search, fetchData, cacheVersion])

	const handlePageChange = (newPage: number) => {
		params.set("page", newPage.toString())
		navigate({ search: params.toString() })
	}

	const handleFilterChange = (newFilters: Partial<AttemptFilterParams>) => {
		const updatedFilters = { ...filters, ...newFilters }
		setFilters(updatedFilters)

		Object.entries(updatedFilters).forEach(([key, value]) => {
			if (value !== undefined) {
				params.set(key, String(value))
			} else {
				params.delete(key)
			}
		})

		params.delete("page")
		navigate({ search: params.toString() })
	}

	const handleResetFilters = () => {
		setFilters({})
		params.delete("status")
		navigate({ search: params.toString() })
	}

	const handleUpdateButton = () => {
		clearCache()
	}

	const handleResetSearch = () => {
		resetSearch()
	}

	const isDataLoaded = total !== null
	const totalPages = total !== null ? Math.ceil(total / limit) : 0
	const shouldShowContent = totalPages > 0 && page <= totalPages

	return (
		<>
			<AttemptFilters
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
							<AttemptsTable
								attempts={attempts}
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

export default AllAttemptsPage
