import TestsList from "@/components/shared/TestList/TestsList"
import TestsListSkeleton from "@/components/skeletons/TestsListSkeleton/TestsSkeleton"
import { Button } from "@/components/ui/Button"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useTestStore } from "@/store/useTestStore"
import { TestDTO } from "@/types/testTypes"
import { useEffect, useState } from "react"

const TestsManagement = () => {
    const { getTests, isTestsFetching } = useTestStore()
    const [tests, setTests] = useState<TestDTO[]>([])
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)

    const getTestsFromStore = async (currentPage: number = page) => {
        const data = await getTests(currentPage, limit)
        if (data) {
            setTests(data.tests)
            setTotal(data.total)
        }
        return
    }
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    useEffect(() => {
        getTestsFromStore(page)
    }, [page])

    const totalPages = Math.ceil(total / limit)
    return (
        <section className="tests-section">
            <h2>Тесты</h2>
            <div className="tests-actions">
                <Button onClick={getTestsFromStore} disabled={isTestsFetching} isLoading={isTestsFetching}>
                    {tests.length === 0 ? "Получить список тестов" : "Обновить"}
                </Button>
            </div>
            {isTestsFetching ? (
                // <Loader fullScreen={false} />
                <TestsListSkeleton />
            ) : (
                <>
                    <TestsList tests={tests} total={total} />
                    <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                </>
            )}
        </section>
    )
}

export default TestsManagement
