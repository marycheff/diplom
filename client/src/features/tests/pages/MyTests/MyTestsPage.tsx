import MyTestsTable from "@/features/tests/components/Tables/MyTestsTable/MyTestsTable"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { useCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestDTO, TestsListDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import SearchBar from "@/shared/ui/SearchBar/SearchBar"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const MyTestsPage = () => {
    const [tests, setTests] = useState<TestDTO[]>([])
    const { getMyTests, searchMyTests, isFetching } = useTestStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(2)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } =
        useCache<TestsListDTO>(useTestStore, "my-tests")
    const { handleSearch: search, handleResetSearch: resetSearch } = useSearch()
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
                data = await searchMyTests(query, currentPage, limit)
            } else {
                data = await getMyTests(currentPage, limit)
            }
            if (data) {
                setTests(data.tests)
                setTotal(data.total)
                saveToCache(cacheKey, data)
            }
        },
        [getCacheKey, getCachedData, saveToCache, searchMyTests, getMyTests, limit]
    )

    useEffect(() => {
        const params = new URLSearchParams(location.search)
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
    }, [location.search, fetchData, cacheVersion])

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(location.search)
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
        resetSearch()
        clearCache()
        fetchData(1)
    }

    const handleUpdateButton = () => {
        clearCache()
        fetchData(page, searchQuery || undefined)
    }
    const totalPages = Math.ceil(total / limit)
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

            <Button
                onClick={handleResetSearch}
                disabled={isFetching || !new URLSearchParams(location.search).get("query")}>
                Сбросить
            </Button>

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
                    {totalPages > 0 && page <= totalPages ? (
                        <>
                            <MyTestsTable tests={tests} total={total} />
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

export default MyTestsPage
