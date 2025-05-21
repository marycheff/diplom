import TestsTable from "@/features/tests/components/Tables/TestsTable/TestsTable"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from "./AllTestsPage.module.scss"

const UnmoderatedTestsPage = () => {
    // Состояния компонента
    const [tests, setTests] = useState<TestDTO[]>([])
    const [total, setTotal] = useState<number | null>(null)
    const [page, setPage] = useState<number>(1)
    const [limit] = useState<number>(TABLE_LIMIT)

    const { getUnmoderatedTests, isFetching } = useTestStore()

    // Функция для загрузки данных
    const fetchTests = useCallback(async () => {
        if (isFetching) return
        const data = await getUnmoderatedTests(page, limit)
        if (data) {
            setTests(data.tests)
            setTotal(data.total)
        }
    }, [page, limit, getUnmoderatedTests])

    // Загрузка данных при монтировании или изменении страницы
    useEffect(() => {
        fetchTests()
    }, [fetchTests])

    // Обработчик смены страницы
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    // Вычисление общего количества страниц
    const totalPages = total !== null ? Math.ceil(total / limit) : 0

    return (
        <>
            {/* Элементы управления */}
            <div className={styles.controls}>
                <Button onClick={fetchTests} disabled={isFetching} className={styles.navigationButton}>
                    Обновить
                </Button>
                <Link to={ROUTES.ADMIN_TESTS}>
                    <Button className={styles.navigationButton}>Все тесты</Button>
                </Link>
            </div>

            {/* Условный рендеринг */}
            {isFetching || total === null ? (
                <TableSkeleton />
            ) : total > 0 ? (
                <>
                    <TestsTable tests={tests} total={total} type="unmoderated" />
                    <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                </>
            ) : (
                <NothingFound />
            )}
        </>
    )
}

export default UnmoderatedTestsPage
