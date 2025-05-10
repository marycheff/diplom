import MyAttemptsCards from "@/features/attempts/components/Cards/AttemptsCards/MyAttemptsCards"
import MyAttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/MyAttemptsTable"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { AttemptsListDTO, TestAttemptDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./MyAttemptsPage.module.scss"

type ViewMode = "table" | "cards"

const MyAttemptsPage = () => {
    const [attempts, setAttempts] = useState<TestAttemptDTO[]>([])
    const [total, setTotal] = useState<number | null>(null)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        const savedViewMode = localStorage.getItem("myAttemptsViewMode")
        return (savedViewMode as ViewMode) || "cards"
    })
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } =
        useCache<AttemptsListDTO>(useAttemptStore, "my-attempts")
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search)

    const { handleResetSearch: resetSearch } = useSearch()

    const { getMyAttempts, isFetching } = useAttemptStore()

    const toggleViewMode = () => {
        const newViewMode = viewMode === "table" ? "cards" : "table"
        setViewMode(newViewMode)
        localStorage.setItem("myAttemptsViewMode", newViewMode)
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
            const data = await getMyAttempts(currentPage, limit)
            if (data) {
                setAttempts(data.attempts)
                setTotal(data.total)
                saveToCache(cacheKey, data)
            }
        },
        [getCacheKey, getCachedData, saveToCache, getMyAttempts, limit]
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
    const shouldShowPagination = totalPages > 0 && page <= totalPages
    const emptyAttemptsPage = total === 0 && page === 1 && isDataLoaded

    return (
        <>
            {page > totalPages && (
                <Button onClick={handleResetSearch} disabled={isFetching}>
                    Сбросить
                </Button>
            )}

            <div className={styles.buttonsContainer}>
                <Button onClick={handleUpdateButton} disabled={isFetching}>
                    Обновить
                </Button>
                <Button onClick={toggleViewMode} disabled={isFetching}>
                    {viewMode === "table" ? "Показать карточками" : "Показать таблицей"}
                </Button>
            </div>
            <div className="cache-info">
                <span>Последнее обновление: {lastUpdateDate ? formatDate(lastUpdateDate) : "Нет данных"}</span>
            </div>
            {isFetching || !isDataLoaded ? (
                <TableSkeleton />
            ) : emptyAttemptsPage ? (
                <div className={styles.emptyState}>
                    <div className={styles.emoji}>
                        <svg fill="#A2E3C4" viewBox="0 0 410.758 410.758">
                            <path d="M350.604,60.153C311.812,21.362,260.237,0,205.379,0C150.521,0,98.945,21.362,60.154,60.153S0,150.52,0,205.378 c0,54.858,21.363,106.437,60.154,145.227c38.791,38.791,90.366,60.153,145.225,60.153c54.859,0,106.434-21.362,145.225-60.153 c38.791-38.79,60.154-90.366,60.154-145.227C410.758,150.521,389.395,98.944,350.604,60.153z M91.78,169.325 c0-27.57,22.43-50,50-50c27.57,0,50,22.43,50,50c0,8.283-6.716,15-15,15c-8.284,0-15-6.717-15-15c0-11.027-8.972-20-20-20 c-11.028,0-20,8.973-20,20c0,8.283-6.716,15-15,15C98.496,184.325,91.78,177.608,91.78,169.325z M292.355,289.648 c-7.3,3.916-16.392,1.174-20.31-6.125c-12.427-23.154-36.397-38.406-62.562-39.806c-26.393-1.407-52.003,11.326-66.8,33.229 c-1.435,2.125-2.771,4.337-3.973,6.574c-3.919,7.301-13.014,10.041-20.311,6.123c-7.3-3.918-10.041-13.012-6.123-20.311 c1.68-3.127,3.544-6.215,5.545-9.178c19.625-29.049,52.843-46.543,87.713-46.543c1.844,0,3.696,0.049,5.548,0.146 c36.559,1.953,70.047,23.248,87.396,55.576C302.397,276.636,299.655,285.73,292.355,289.648z M303.978,184.325 c-8.283,0-15-6.717-15-15c0-11.027-8.972-20-20-20c-11.027,0-19.999,8.973-19.999,20c0,8.283-6.717,15-15,15 c-8.285,0-15-6.717-15-15c0-27.57,22.43-50,49.999-50c27.57,0,50,22.43,50,50C318.978,177.608,312.262,184.325,303.978,184.325z" />
                        </svg>
                    </div>
                    <h2 className={styles.title}>Вы еще не проходили тесты</h2>
                    <p className={styles.description}>
                        Проходите тесты, чтобы увидеть результаты и оценку вашего выполнения
                    </p>
                </div>
            ) : (
                <>
                    {shouldShowPagination ? (
                        <>
                            {viewMode === "table" ? (
                                <MyAttemptsTable attempts={attempts} total={total} />
                            ) : (
                                <MyAttemptsCards attempts={attempts} total={total} />
                            )}
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

export default MyAttemptsPage
