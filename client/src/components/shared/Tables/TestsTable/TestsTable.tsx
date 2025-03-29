import { TestDTO } from "@/types/testTypes"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./TestsTable.module.scss"

interface TestsTableProps {
    tests: TestDTO[]
    total: number
}

const TestsTable: FC<TestsTableProps> = ({ tests, total }) => {
    return (
        <>
            {tests && tests.length > 0 && (
                <div className={styles.testsData}>
                    <div className={styles.testsCount}>
                        <h3>Всего: {total}</h3>
                        <h3>На странице: {tests.length}</h3>
                    </div>

                    <div className={styles.tableResponsive}>
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
                                        <td>
                                            <Link to={`/admin/tests/${test.id}`} className="actionLink">
                                                {test.id}
                                            </Link>
                                        </td>
                                        <td>
                                            {/* {test.author.id} */}
                                            <Link to={`/admin/users/${test.author.id}`} className="actionLink">
                                                {test.author.id}
                                            </Link>

                                            <br />
                                            {test.author.email}
                                        </td>
                                        <td>{test.title}</td>
                                        <td>{test.description || "–"}</td>
                                        <td>{test.questions ? test.questions.length : 0}</td>
                                        <td>{test.settings?.requireRegistration ? "Да" : "Нет"}</td>
                                        <td>{test.settings?.showDetailedResults ? "Да" : "Нет"}</td>
                                        <td>
                                            {test.totalAttempts === 0 ? (
                                                "0"
                                            ) : (
                                                <Link to={`/admin/tests/${test.id}/attempts`} className="actionLink">
                                                    {test.totalAttempts}
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default TestsTable
