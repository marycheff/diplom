import TestsList from "@/components/shared/TestsList"
import { Button } from "@/components/ui/Button/Button"
import Loader from "@/components/ui/Loader/Loader"
import { useTestStore } from "@/store/useTestStore"
import { TestDTO } from "@/types/testTypes"
import { useState } from "react"
const TestManagement = () => {
    const { getTests, isTestsFetching } = useTestStore()
    const [tests, setTests] = useState<TestDTO[]>([])

    const getTestsFromStore = async () => {
        const tests = await getTests()
        if (tests !== undefined) {
            setTests(tests)
        }
    }
    // useEffect(() => {
    //     getTestsFromStore()
    // }, [])
    return (
        <section className="tests-section">
            <h2>Тесты</h2>
            <div className="tests-actions">
                <Button onClick={getTestsFromStore} disabled={isTestsFetching} isLoading={isTestsFetching}>
                    {tests.length === 0 ? "Получить список тестов" : "Обновить"}
                </Button>
            </div>
            {isTestsFetching ? <Loader fullScreen={false} /> : <TestsList tests={tests} />}
        </section>
    )
}

export default TestManagement
