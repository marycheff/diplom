import SearchBar from "@/components/shared/SearchBar/SearchBar"
import TestsList from "@/components/shared/TestList/TestsList"
import TestsListSkeleton from "@/components/skeletons/TestsListSkeleton/TestsSkeleton"
import { BackButton, Button, HomeButton } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useTestsCache } from "@/hooks/useTestsCache"
import { useSearch } from "@/hooks/useUsersSearch"
import { useTestStore } from "@/store/useTestStore"
import { TestDTO } from "@/types/testTypes"
import { formatDate } from "@/utils/formatter"
import { useEffect, useState } from "react"
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
    const { handleSearch: handleSearchFromHook, handleReset: handleResetFromHook } = useSearch()

    useEffect(() => {
        if (searchQuery) {
            searchTestsFromStore(page, searchQuery)
        } else {
            fetchTests(page)
        }
    }, [cacheVersion])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("query") || ""
        const pageParam = parseInt(params.get("page") || "1", 10)
        setSearchQuery(query)
        setPage(pageParam)
    }, [location.search])

    const fetchTests = async (currentPage = page) => {
        const cacheKey = getCacheKey(currentPage, "")
        const cachedData = getCachedData(cacheKey)
        if (cachedData) {
            setTests(cachedData.tests)
            setTotal(cachedData.total)
            return
        }

        const data = await getTests(currentPage, limit)
        if (data) {
            setTests(data.tests)
            setTotal(data.total)
            saveToCache(cacheKey, data)
        }
    }

    const searchTestsFromStore = async (currentPage = page, query = "") => {
        const cacheKey = getCacheKey(currentPage, query)
        const cachedData = getCachedData(cacheKey)
        if (cachedData) {
            setTests(cachedData.tests)
            setTotal(cachedData.total)
            return
        }

        const data = await searchTests(query, currentPage, limit)
        if (data) {
            setTests(data.tests)
            setTotal(data.total)
            saveToCache(cacheKey, data)
        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
        const params = new URLSearchParams(location.search)
        params.set("page", newPage.toString())
        if (searchQuery) {
            params.set("query", searchQuery)
            searchTestsFromStore(newPage, searchQuery)
        } else {
            fetchTests(newPage)
        }
        navigate({ search: params.toString() })
    }

    const handleSearch = () => {
        const trimmedQuery = searchQuery.trim()
        if (trimmedQuery === "") {
            return
        }
        handleSearchFromHook(trimmedQuery, 1)
    }

    const handleClearSearchBar = () => {
        setSearchQuery("")
    }

    const handleResetSearch = () => {
        handleResetFromHook()
    }

    const handleUpdateButton = () => {
        clearCache()
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
                disabled={isFetching}
            />

            <Button onClick={handleResetSearch} disabled={isFetching}>
                Сбросить
            </Button>

            <Button onClick={handleUpdateButton} disabled={isFetching}>
                Обновить
            </Button>
            <div className="cache-info">
                <span>Последнее обновление: {formatDate(lastUpdateDate)}</span>
            </div>
            {isFetching ? (
                <TestsListSkeleton />
            ) : (
                <>
                    {totalPages > 0 && page <= totalPages ? (
                        <>
                            <TestsList tests={tests} total={total} />
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
