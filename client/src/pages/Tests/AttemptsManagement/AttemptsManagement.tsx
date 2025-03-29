import AttemptsTable from "@/components/shared/Tables/AttemptsTable/AttemptsTable"
import TableSkeleton from "@/components/skeletons/TestsListSkeleton/TableSkeleton"
import { BackButton, Button, HomeButton } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useAttemptsCache } from "@/hooks/useAttemptsCache"
import { useAttemptStore } from "@/store/useAttemptStore"
import { TestAttemptDTO } from "@/types/testTypes"
import { formatDate } from "@/utils/formatter"
import { isValidObjectId } from "@/utils/validator"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

const AttemptsManagement = () => {
    const { testId } = useParams<{ testId: string }>()
    const { getTestAttempts, isFetching } = useAttemptStore()
    const [attempts, setAttempts] = useState<TestAttemptDTO[]>([])
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } = useAttemptsCache()

    if (!testId) {
        return <div>ID теста не указан</div>
    }
    if (!isValidObjectId(testId)) {
        return <div>Невалидный Id</div>
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
        const pageParam = parseInt(params.get("page") || "1", 10)

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
            <BackButton />
            <HomeButton />
            <br />
            <br />
            <Button onClick={handleUpdateButton} disabled={isFetching}>
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
                            <AttemptsTable attempts={attempts} total={total} />
                            <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                        </>
                    ) : (
                        <div>Ничего не найдено</div>
                    )}
                </>
            )}
        </>
    )
}

export default AttemptsManagement
