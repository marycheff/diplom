import UserAttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/UserAttemptsTable"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { AttemptWithSnapshotDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { USER_TABLE_LIMIT } from "@/shared/utils/constants"
import { isValidUUID } from "@/shared/utils/validator"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./UserAttempts.module.scss"

const UserAttempts = () => {
    const { userId } = useParams<{ userId: string }>()

    if (!userId) {
        return <NothingFound title="ID пользователя не указан" />
    }
    if (!isValidUUID(userId)) {
        return <NothingFound title="Невалидный ID пользователя" />
    }

    const [attempts, setAttempts] = useState<AttemptWithSnapshotDTO[]>([])
    const [total, setTotal] = useState<number | null>(null)
    const [limit] = useState<number>(USER_TABLE_LIMIT)
    const [page, setPage] = useState<number>(1)

    const { getUserAttempts, isFetching } = useAttemptStore()

    const fetchData = useCallback(
        async (currentPage: number) => {
            if (isFetching) return

            const data = await getUserAttempts(userId, currentPage, limit)
            if (data) {
                setAttempts(data.attempts)
                setTotal(data.total)
            }
        },
        [getUserAttempts, limit, userId]
    )

    useEffect(() => {
        fetchData(page)
    }, [fetchData, page])

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handleUpdateButton = () => {
        fetchData(page)
    }

    const isDataLoaded = total !== null
    const hasAttempts = total !== null && total > 0
    const totalPages = total !== null ? Math.ceil(total / limit) : 0
    const shouldShowPagination = totalPages > 0 && page <= totalPages
    const emptyAttemptsPage = total === 0 && page === 1 && isDataLoaded

    return (
        <div className={styles.userAttemptsContainer}>
            {/* <div className={styles.buttonsContainer}>
                <Button onClick={handleUpdateButton} disabled={isFetching}>
                    Обновить
                </Button>
            </div> */}

            {isFetching || !isDataLoaded ? (
                <TableSkeleton />
            ) : emptyAttemptsPage ? (
                <div className={styles.emptyState}>
                    <p className={styles.description}>Пользователь еще не проходил тесты</p>
                </div>
            ) : (
                <>
                    {shouldShowPagination ? (
                        <div className={styles.contentContainer}>
                            <UserAttemptsTable attempts={attempts} total={total} />
                            <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                        </div>
                    ) : (
                        <NothingFound />
                    )}
                </>
            )}
        </div>
    )
}

export default UserAttempts
