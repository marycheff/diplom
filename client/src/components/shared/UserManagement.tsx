import UsersList from "@/components/shared/UserList/UsersList"
import TestsListSkeleton from "@/components/skeleton/TestsListSkeleton/TestsSkeleton"
import { Button } from "@/components/ui/Button"
import Pagination from "@/components/UI/Pagination/Pagination"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { UserDTO } from "@/types/userTypes"
import { useEffect, useState } from "react"

const UserManagement = () => {
    const [users, setUsers] = useState<UserDTO[]>()
    const { getUsers, isUsersFetching, isLoading } = useUserStore()
    const { user: currentUser } = useAuthStore()
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)

    const getUsersFromStore = async (currentPage: number = page) => {
        const data = await getUsers(currentPage, limit)
        if (data) {
            setUsers(data.users)
            setTotal(data.total)
        }
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    useEffect(() => {
        getUsersFromStore()
    }, [])

    const totalPages = Math.ceil(total / limit)

    return (
        <>
            {isUsersFetching ? (
                <TestsListSkeleton />
            ) : (
                <>
                    <Button onClick={getUsersFromStore} disabled={isUsersFetching} isLoading={isUsersFetching}>
                        {users?.length === 0 ? "Получить список тестов" : "Обновить"}
                    </Button>
                    <UsersList users={users} total={total} />
                    <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                </>
            )}
        </>
    )
}

export default UserManagement
