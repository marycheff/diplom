import AttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/AttemptsTable"
import { useAttemptsCache } from "@/features/attempts/hooks/useAttemptsCache"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestAttemptDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const TestAttemptsPage = () => {
	const { testId } = useParams<{ testId: string }>()
	const { getTestAttempts, isFetching } = useAttemptStore()
	const [attempts, setAttempts] = useState<TestAttemptDTO[]>([])
	const [total, setTotal] = useState<number>(0)
	const [limit] = useState<number>(TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)
	const navigate = useNavigate()
	const location = useLocation()
	const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } = useAttemptsCache()

	if (!testId) {
		return <NothingFound title="ID теста не указан" />
	}
	if (!isValidUUID(testId)) {
		return <NothingFound title="Невалидный ID теста" />
	}

	const fetchData = useCallback(
		async (currentPage: number) => {
			if (isFetching) return

			const cacheKey = getCacheKey(currentPage)
			const cachedData = getCachedData(cacheKey)

			if (cachedData) {
				setAttempts(cachedData.attempts)
				setTotal(cachedData.total)
				return
			}
			const data = await getTestAttempts(testId, currentPage, limit)
			if (data) {
				setAttempts(data.attempts)
				setTotal(data.total)
				saveToCache(cacheKey, data)
			}
		},
		[getCacheKey, getCachedData, saveToCache, getTestAttempts, limit]
	)
	useEffect(() => {
		const params = new URLSearchParams(location.search)
		let pageParam = parseInt(params.get("page") || "1", 10)
		// if (!params.has("page")) {
		// 	params.set("page", "1")
		// 	navigate({ search: params.toString() })
		// 	pageParam = 1
		// }

		setPage(pageParam)
		fetchData(pageParam)
	}, [location.search, fetchData, cacheVersion])

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(location.search)
		params.set("page", newPage.toString())
		navigate({ search: params.toString() })
	}

	const handleUpdateButton = () => {
		clearCache()
	}

	const totalPages = Math.ceil(total / limit)
	return (
		<>
			<Button
				onClick={handleUpdateButton}
				disabled={isFetching}
			>
				Обновить
			</Button>

			<div className="cache-info">
				<span>Последнее обновление: {lastUpdateDate ? formatDate(lastUpdateDate) : "Нет данных"}</span>
			</div>
			{isFetching ? (
				<TableSkeleton />
			) : (
				<>
					{attempts.length > 0 && totalPages > 0 && page <= totalPages ? (
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
						<div>Ничего не найдено</div>
					)}
				</>
			)}
		</>
	)
}

export default TestAttemptsPage
