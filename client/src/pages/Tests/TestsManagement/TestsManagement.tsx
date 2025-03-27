import SearchBar from "@/components/shared/SearchBar/SearchBar"
import TestsTable from "@/components/shared/Tables/TestsTable/TestsTable"
import TableSkeleton from "@/components/skeletons/TestsListSkeleton/TableSkeleton"
import { BackButton, Button, HomeButton } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useTestsCache } from "@/hooks/useTestsCache"
import { useTestStore } from "@/store/useTestStore"
import { TestDTO } from "@/types/testTypes"
import { formatDate } from "@/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const TestsManagement = () => {
    const [tests, setTests] = useState<TestDTO[]>([])
    const { getTests, searchTests, isFetching } = useTestStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } = useTestsCache()

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
        const params = new URLSearchParams(location.search)
        const query = params.get("query") || ""
        const pageParam = parseInt(params.get("page") || "1", 10)

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
        const trimmedQuery = searchQuery.trim()
        if (trimmedQuery) {
            const params = new URLSearchParams(location.search)
            params.set("query", trimmedQuery)
            params.set("page", "1")
            navigate({ search: params.toString() })
        }
    }

    const handleClearSearchBar = () => {
        setSearchQuery("")
    }

    const handleResetSearch = () => {
        const params = new URLSearchParams(location.search)
        params.delete("query")
        params.set("page", "1")
        navigate({ search: params.toString() })
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
            <BackButton />
            <HomeButton />
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
                            <TestsTable tests={tests} total={total} />
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

export default TestsManagement
