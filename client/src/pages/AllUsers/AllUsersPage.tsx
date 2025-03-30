import SearchBar from "@/components/shared/SearchBar/SearchBar"
import UsersTable from "@/components/shared/Tables/UsersTable/UsersTable"
import TableSkeleton from "@/components/skeletons/TestsListSkeleton/TableSkeleton"
import { Button } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useUsersCache } from "@/hooks/useUsersCache"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { formatDate } from "@/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const AllUsersPage = () => {
    const [users, setUsers] = useState<UserDTO[]>([])
    const { getUsers, searchUser, isFetching } = useUserStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } = useUsersCache()

    const fetchData = useCallback(
        async (currentPage: number, query?: string) => {
            if (isFetching) return

            const cacheKey = getCacheKey(currentPage, query)
            const cachedData = getCachedData(cacheKey)

            if (cachedData) {
                setUsers(cachedData.users)
                setTotal(cachedData.total)
                return
            }
            let data
            if (query) {
                data = await searchUser(query, currentPage, limit)
            } else {
                data = await getUsers(currentPage, limit)
            }
            if (data) {
                setUsers(data.users)
                setTotal(data.total)
                saveToCache(cacheKey, data)
            }
        },
        [getCacheKey, getCachedData, saveToCache, searchUser, getUsers, limit]
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
        const trimmedQuery = searchQuery.trim()
        if (trimmedQuery) {
            const params = new URLSearchParams(location.search)
            params.set("query", trimmedQuery)
            params.set("page", "1")
            navigate({ search: params.toString() })
        }
    }

    const handleClearSearchBar = () => {
        const params = new URLSearchParams(location.search)
        params.delete("query")
        navigate({ search: params.toString() })
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
                            <UsersTable users={users} total={total} />
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

export default AllUsersPage
