import SearchBar from "@/components/shared/SearchBar/SearchBar"
import UsersList from "@/components/shared/UserList/UsersList"
import TestsListSkeleton from "@/components/skeleton/TestsListSkeleton/TestsSkeleton"
import { BackButton, Button, HomeButton } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const UserManagement = () => {
    const [users, setUsers] = useState<UserDTO[]>()
    const { getUsers, searchUser, isUsersFetching } = useUserStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(20)
    const [page, setPage] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const navigate = useNavigate()
    const location = useLocation()

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
        const data = await getUsers(currentPage, limit)
        if (data) {
            setUsers(data.users)
            setTotal(data.total)
        }
    }

    const searchUsersFromStore = async (currentPage: number = page, query: string = "") => {
        const data = await searchUser(query, currentPage, limit)
        if (data) {
            setUsers(data.users)
            setTotal(data.total)
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

    const handleSearch = async () => {
        const trimmedQuery = searchQuery.trim()
        const params = new URLSearchParams(location.search)
        const paramsQueryText = params.get("query")

        if (paramsQueryText === trimmedQuery || trimmedQuery === "") {
            return
        }
        params.set("query", trimmedQuery)
        params.set("page", "1")
        navigate({ search: params.toString() })
        await searchUsersFromStore(1, trimmedQuery)
    }

    const handleClearSearchBar = () => {
        setSearchQuery("")
    }

    const handleResetSearch = () => {
        setSearchQuery("")
        const params = new URLSearchParams(location.search)
        params.delete("query")
        params.set("page", "1")
        navigate({ search: params.toString() })
        getUsersFromStore(1)
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

                    <Button onClick={handleResetSearch} disabled={isUsersFetching}>
                        Сбросить
                    </Button>

                    <Button
                        onClick={() => getUsersFromStore(page)}
                        disabled={isUsersFetching}
                        isLoading={isUsersFetching}>
                        {users?.length === 0 ? "Получить список пользователей" : "Обновить"}
                    </Button>

                    {totalPages > 0 ? (
                        <>
                            <UsersList users={users} total={total} />
                            <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                        </>
                    ) : (
                        <div>Нет пользователей</div>
                    )}
                </>
            )}
        </>
    )
}

export default UserManagement
