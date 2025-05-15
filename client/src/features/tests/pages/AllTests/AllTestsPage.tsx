import TestsTable from "@/features/tests/components/Tables/TestsTable/TestsTable"
import { useTestStore } from "@/features/tests/store/useTestStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestDTO, TestsListDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import SearchBar from "@/shared/ui/SearchBar/SearchBar"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./AllTestsPage.module.scss"
const AllTestsPage = () => {
    const [tests, setTests] = useState<TestDTO[]>([])
    const { getTests, searchTests, isFetching } = useTestStore()
    const [total, setTotal] = useState<number | null>(null)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } =
        useCache<TestsListDTO>(useTestStore, "tests")
    const { handleSearch: search, handleResetSearch: resetSearch } = useSearch()
    const params = new URLSearchParams(location.search)

    const fetchData = useCallback(
        async (currentPage: number, query?: string) => {
            if (isFetching) return
            const cacheKey = getCacheKey(currentPage, query)
            const cachedData = getCachedData(cacheKey)

            if (cachedData) {
                setTests(cachedData.tests)
                setTotal(cachedData.total)
                return
            }
            let data
            if (query) {
                data = await searchTests(query, currentPage, limit)
            } else {
                data = await getTests(currentPage, limit)
            }
            if (data) {
                setTests(data.tests)
                setTotal(data.total)
                saveToCache(cacheKey, data)
            }
        },
        [getCacheKey, getCachedData, saveToCache, searchTests, getTests, limit]
    )

    useEffect(() => {
        const query = params.get("query") || ""
        let pageParam = parseInt(params.get("page") || "1", 10)
        if (!params.has("page")) {
            params.set("page", "1")
            navigate({ search: params.toString() })
            pageParam = 1
        }
        setSearchQuery(query)
        setPage(pageParam)
        fetchData(pageParam, query || undefined)
    }, [location.search, fetchData, cacheVersion, navigate])

    const handlePageChange = (newPage: number) => {
        params.set("page", newPage.toString())

        if (searchQuery) {
            params.set("query", searchQuery)
        }

        navigate({ search: params.toString() })
    }

    const handleSearch = () => {
        search(searchQuery)
    }

    const handleClearSearchBar = () => {
        setSearchQuery("")
    }

    const handleResetSearch = () => {
        // clearCache()
        resetSearch()
        // fetchData(1)
    }

    const handleUpdateButton = () => {
        clearCache()
        fetchData(page, searchQuery || undefined)
    }

    const isDataLoaded = total !== null
    const hasTests = total !== null && total > 0
    const isSearchActive = !!params.get("query")
    const totalPages = total !== null ? Math.ceil(total / limit) : 0
    const shouldShowContent = totalPages > 0 && page <= totalPages

    return (
        <>
            {/* <BackButton />
            <HomeButton /> */}
            <SearchBar
                name="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                handleSearch={handleSearch}
                onClearSearch={handleClearSearchBar}
                placeholder="Поиск"
            />

            <div className={styles.controls}>
                <div className={styles.buttons}>
                    <Button onClick={handleResetSearch} disabled={isFetching || !isSearchActive}>
                        Сбросить
                    </Button>
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
                    {shouldShowContent ? (
                        <>
                            <TestsTable tests={tests} total={total} />
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

export default AllTestsPage
