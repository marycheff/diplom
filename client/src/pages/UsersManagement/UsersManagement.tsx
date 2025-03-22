import SearchBar from "@/components/shared/SearchBar/SearchBar"
import UsersList from "@/components/shared/UserList/UsersList"
import TestsListSkeleton from "@/components/skeletons/TestsListSkeleton/TestsSkeleton"
import { BackButton, Button, HomeButton } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useUsersCache } from "@/hooks/useUsersCache"
import { useUsersSearch } from "@/hooks/useUsersSearch"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const UsersManagement = () => {
    const [users, setUsers] = useState<UserDTO[]>()
    const { getUsers, searchUser, isUsersFetching } = useUserStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(2)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()
    const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion } = useUsersCache()
    const { handleSearch: handleSearchFromHook, handleReset: handleResetFromHook } = useUsersSearch()

    
    useEffect(() => {
        if (searchQuery) {
            searchUsersFromStore(page, searchQuery)
        } else {
            getUsersFromStore(page)
        }
    }, [cacheVersion])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("query") || ""
        const pageParam = parseInt(params.get("page") || "1", 10)

        setSearchQuery(query)
        setPage(pageParam)

        if (query) {
            searchUsersFromStore(pageParam, query)
        } else {
            getUsersFromStore(pageParam)
        }
    }, [location.search])

    const getUsersFromStore = async (currentPage: number = page) => {
        const cacheKey = getCacheKey(currentPage, "")
        const cachedData = getCachedData(cacheKey)
        if (cachedData) {
            setUsers(cachedData.users)
            setTotal(cachedData.total)
            return
        }

        const data = await getUsers(currentPage, limit)
        if (data) {
            setUsers(data.users)
            setTotal(data.total)
            saveToCache(cacheKey, data)
        }
    }

    const searchUsersFromStore = async (currentPage: number = page, query: string = "") => {
        const cacheKey = getCacheKey(currentPage, query)
        const cachedData = getCachedData(cacheKey)
        if (cachedData) {
            setUsers(cachedData.users)
            setTotal(cachedData.total)
            return
        }

        const data = await searchUser(query, currentPage, limit)
        if (data) {
            setUsers(data.users)
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
            searchUsersFromStore(newPage, searchQuery)
        } else {
            getUsersFromStore(newPage)
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
            {isUsersFetching ? (
                <TestsListSkeleton />
            ) : (
                <>
                    <SearchBar
                        name="search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        handleSearch={handleSearch}
                        onClearSearch={handleClearSearchBar}
                        placeholder="Поиск"
                    />

                    <Button onClick={handleResetSearch} disabled={isUsersFetching || !searchQuery}>
                        Сбросить
                    </Button>

                    <Button onClick={handleUpdateButton} disabled={isUsersFetching} isLoading={isUsersFetching}>
                        Обновить
                    </Button>

                    {totalPages > 0 && page <= totalPages ? (
                        <>
                            <UsersList users={users} total={total} />
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

export default UsersManagement
