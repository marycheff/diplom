import TestsSkeleton from "@/components/skeleton/TestSkeleton/TestsSkeleton"
import TestsList from "@/components/shared/TestList/TestsList"
import { Button } from "@/components/ui/Button"
import Loader from "@/components/ui/Loader/Loader"
import Pagination from "@/components/ui/Pagination/Pagination"
import { useTestStore } from "@/store/useTestStore"
import { TestDTO } from "@/types/testTypes"
import { useEffect, useState } from "react"

const TestManagement = () => {
    const { getTests, isTestsFetching } = useTestStore()
    const [tests, setTests] = useState<TestDTO[]>([])
    const [total, setTotal] = useState<number>(0)
    const [limit] = useState<number>(10)
    const [page, setPage] = useState<number>(1)

    const getTestsFromStore = async (currentPage: number = page) => {
        const data = await getTests(currentPage, limit)
        console.log(data?.total)
        console.log(data)
        if (data) {
            setTests(data.tests)
            setTotal(data.total)
        }
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
                <TestsSkeleton/>
            ) : (
                <>
                    <TestsList tests={tests} total={total} />
                    <Pagination page={page} totalPages={totalPages} changePage={handlePageChange} />
                </>
            )}
        </section>
    )
}

export default TestManagement
