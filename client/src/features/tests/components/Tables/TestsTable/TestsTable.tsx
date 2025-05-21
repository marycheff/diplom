import { ROUTES } from "@/router/paths"
import { TestDTO, VisibilityStatusLabels } from "@/shared/types"
import { shortenText } from "@/shared/utils/formatter"
import { FC } from "react"
import { generatePath, Link } from "react-router-dom"
import styles from "./TestsTable.module.scss"

interface TestsTableProps {
    tests: TestDTO[]
    total: number
    type?: "all" | "unmoderated"
}

const TestsTable: FC<TestsTableProps> = ({ tests, total, type = "all" }) => {
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
                                    <th scope="col">Модерирован</th>
                                    <th scope="col">Автор</th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Статус публикации</th>
                                    <th scope="col">Кол-во вопросов</th>
                                    <th scope="col">Кол-во попыток</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map(test => {
                                    return (
                                        <tr key={test.id}>
                                            <td>
                                                <Link
                                                    to={
                                                        type === "unmoderated"
                                                            ? generatePath(ROUTES.ADMIN_UNMODERATED_TEST_INFO, {
                                                                  testId: test.id,
                                                              })
                                                            : generatePath(ROUTES.ADMIN_TEST_INFO, { testId: test.id })
                                                    }
                                                    className="actionLink"
                                                    title={test.id}>
                                                    {shortenText(test.id)}
                                                </Link>
                                            </td>
                                            <td>{test.moderatedAt ? "Да" : "Нет"}</td>
                                            <td>
                                                <Link
                                                    to={generatePath(ROUTES.ADMIN_USER_INFO, {
                                                        userId: test.author.id,
                                                    })}
                                                    className="actionLink"
                                                    title={test.author.email}>
                                                    {shortenText(test.author.email, 30)}
                                                </Link>
                                            </td>
                                            <td>{shortenText(test.title, 30)}</td>
                                            <td>{VisibilityStatusLabels[test.visibilityStatus]}</td>

                                            <td>{test.questions ? test.questions.length : 0}</td>
                                            <td>
                                                {test.totalAttempts === 0 ? (
                                                    "0"
                                                ) : (
                                                    <Link
                                                        to={
                                                            type === "unmoderated"
                                                                ? generatePath(ROUTES.ADMIN_UNMODERATED_TEST_ATTEMPTS, {
                                                                      testId: test.id,
                                                                  })
                                                                : generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, {
                                                                      testId: test.id,
                                                                  })
                                                        }
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
