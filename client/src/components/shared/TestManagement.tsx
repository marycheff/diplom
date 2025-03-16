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
            {isTestsFetching ? (
                <Loader fullScreen={false} />
            ) : (
                <div className="tests-content">
                    {tests && tests.length > 0 && (
                        <div className="tests-data">
                            <div className="tests-count">
                                <h3>Тестов: {tests.length}</h3>
                            </div>

                            <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Автор</th>
                                            <th scope="col">Название</th>
                                            <th scope="col">Описание</th>
                                            <th scope="col">Количество вопросов</th>
                                            <th scope="col">Требуется регистрация</th>
                                            <th scope="col">Показывать детальные результаты</th>
                                            <th scope="col">Количество попыток</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tests.map(test => (
                                            <tr key={test.id}>
                                                <td>{test.id}</td>
                                                <td>{test.authorId}</td>
                                                <td>{test.title}</td>
                                                <td>{test.description || "Нет описания"}</td>
                                                <td>{test.questions ? test.questions.length : 0}</td>
                                                <td>{test.settings?.requireRegistration ? "Да" : "Нет"}</td>
                                                <td>{test.settings?.showDetailedResults ? "Да" : "Нет"}</td>
                                                <td>{test.totalAttempts}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}

export default TestManagement
