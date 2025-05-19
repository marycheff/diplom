import styles from "@/features/tests/pages/AllTests/AllTestsPage.module.scss"
import UsersTable from "@/features/users/components/Tables/UsersTable/UsersTable"
import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { UserDTO, UsersListDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import SearchBar from "@/shared/ui/SearchBar/SearchBar"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

const AllUsersPage = () => {
    const [users, setUsers] = useState<UserDTO[]>([])
    const { getUsers, searchUser, isFetching } = useUserStore()
    const [total, setTotal] = useState<number | null>(null)
    const [limit] = useState<number>(TABLE_LIMIT)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } =
        useCache<UsersListDTO>(useUserStore, "users")
    const { handleSearch: search, handleResetSearch: resetSearch } = useSearch()
    const params = new URLSearchParams(location.search)
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
        const query = params.get("query") || ""
        let pageParam = parseInt(params.get("page") || "1", 10)
        if (!params.has("page")) {
            params.set("page", "1")
            navigate({ search: params.toString() })
            pageParam = 1
        }
        fetchData(pageParam, query || undefined)
        setSearchQuery(query)
        setPage(pageParam)
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
        resetSearch()
        // clearCache()
        // fetchData(1)
    }

    const handleUpdateButton = () => {
        clearCache()
        fetchData(page, searchQuery || undefined)
    }

    const isDataLoaded = total !== null
    const hasUsers = total !== null && total > 0
    const isSearchActive = !!params.get("query")
    const totalPages = total !== null ? Math.ceil(total / limit) : 0
    const shouldShowContent = totalPages > 0 && page <= totalPages

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

            <div className={styles.controls}>
                <div className={styles.buttons}>
                    <Button onClick={handleResetSearch} disabled={isFetching || !isSearchActive}>
                        Сбросить
                    </Button>
                    <Button onClick={handleUpdateButton} disabled={isFetching}>
                        Обновить
                    </Button>
                </div>

                <Link to={ROUTES.ADMIN_CREATE_USER}>
                    <Button className={styles.navigationButton}>Создать</Button>
                </Link>
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
                            <UsersTable users={users} total={total} />
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

export default AllUsersPage
