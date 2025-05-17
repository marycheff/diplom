import AttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/AttemptsTable"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import styles from "@/features/tests/pages/AllTests/AllTestsPage.module.scss"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { AttemptsListDTO, TestAttemptDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
const AllAttemptsPage = () => {
    const { getAllAttempts, isFetching } = useAttemptStore()
    const [attempts, setAttempts] = useState<TestAttemptDTO[]>([])
    const [total, setTotal] = useState<number | null>(null)
    const [limit] = useState<number>(TABLE_LIMIT)
    const [page, setPage] = useState<number>(1)
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } =
        useCache<AttemptsListDTO>(useAttemptStore)
    const { handleResetSearch: resetSearch } = useSearch()
    const params = new URLSearchParams(location.search)
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
            const data = await getAllAttempts(currentPage, limit)
            if (data) {
                setAttempts(data.attempts)
                setTotal(data.total)
                saveToCache(cacheKey, data)
            }
        },
        [getCacheKey, getCachedData, saveToCache, getAllAttempts, limit]
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        let pageParam = parseInt(params.get("page") || "1", 10)
        if (!params.has("page")) {
            params.set("page", "1")
            navigate({ search: params.toString() })
            pageParam = 1
        }

        setPage(pageParam)
        fetchData(pageParam)
    }, [location.search, fetchData, cacheVersion, navigate])

    const handlePageChange = (newPage: number) => {
        params.set("page", newPage.toString())
        navigate({ search: params.toString() })
    }

    const handleUpdateButton = () => {
        clearCache()
    }
    const handleResetSearch = () => {
        // clearCache()
        resetSearch()
        // fetchData(1)
    }
    const isDataLoaded = total !== null
    const hasTests = total !== null && total > 0
    const isSearchActive = !!params.get("query")
    const totalPages = total !== null ? Math.ceil(total / limit) : 0
    const shouldShowContent = totalPages > 0 && page <= totalPages

    return (
        <>
            <div className={styles.controls}>
                <div className={styles.buttons}>
                    {page > totalPages && (
                        <Button onClick={handleResetSearch} disabled={isFetching}>
                            Сбросить
                        </Button>
                    )}
                    <Button onClick={handleUpdateButton} disabled={isFetching}>
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
                    {attempts.length > 0 && totalPages > 0 && page <= totalPages ? (
                        <>
                            <AttemptsTable attempts={attempts} total={total} />
                            <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
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
