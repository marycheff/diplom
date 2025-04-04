import { TestDTO } from "@/shared/types/testTypes"
import Tooltip from "@/shared/ui/Tooltip/Tooltip"
import { shortenUuid } from "@/shared/utils/formatter"
import { FC, useRef } from "react"
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
                                {tests.map(test => {
                                    const testIdRef = useRef<HTMLElement | null>(null)
                                    const authorIdRef = useRef<HTMLElement | null>(null)

                                    return (
                                        <tr key={test.id}>
                                            <td>
                                                <Link
                                                    to={`/admin/tests/${test.id}`}
                                                    className="actionLink"
                                                    ref={testIdRef as React.RefObject<HTMLAnchorElement>}>
                                                    {shortenUuid(test.id)}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    to={`/admin/users/${test.author.id}`}
                                                    className="actionLink"
                                                    ref={authorIdRef as React.RefObject<HTMLAnchorElement>}>
                                                    {shortenUuid(test.author.id)}
                                                </Link>
                                                <Tooltip content={test.id} targetRef={testIdRef} />
                                                <Tooltip
                                                    content={test.author.id}
                                                    
                                                    targetRef={authorIdRef}
                                                />
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
                                                    <Link
                                                        to={`/admin/tests/${test.id}/attempts`}
                                                        className="actionLink">
                                                        {test.totalAttempts}
                                                    </Link>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default TestsTable
