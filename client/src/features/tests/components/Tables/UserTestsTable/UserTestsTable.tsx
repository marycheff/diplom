import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { TestDTO, VisibilityStatusLabels } from "@/shared/types"
import { FC } from "react"
import { generatePath, Link } from "react-router-dom"
import styles from "./UserTestsTable.module.scss"

interface MyTestsTableProps {
    tests: TestDTO[]
    total: number
}

const UserTestsTable: FC<MyTestsTableProps> = ({ tests, total }) => {
    const { isAdmin } = useAuthStore()
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
                                    <th scope="col"></th>
                                    <th scope="col">Название</th>
                                    <th scope="col">Статус публикации</th>
                                    <th scope="col">Кол-во вопросов</th>
                                    <th scope="col">Требуется регистрация</th>
                                    <th scope="col" title="Показывать детальные результаты">
                                        Показывать детальные результаты
                                    </th>
                                    <th scope="col">Кол-во попыток</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map(test => (
                                    <tr key={test.id}>
                                        <td>
                                            <Link
                                                to={
                                                    isAdmin
                                                        ? generatePath(ROUTES.ADMIN_MY_TEST_INFO, { testId: test.id })
                                                        : generatePath(ROUTES.MY_TEST_INFO, { testId: test.id })
                                                }
                                                className="actionLink">
                                                Перейти
                                            </Link>
                                        </td>
                                        <td>{test.title}</td>
                                        <td>{VisibilityStatusLabels[test.visibilityStatus]}</td>
                                        <td>{test.questions ? test.questions.length : 0}</td>
                                        <td>{test.settings?.requireRegistration ? "Да" : "Нет"}</td>
                                        <td>{test.settings?.showDetailedResults ? "Да" : "Нет"}</td>
                                        <td>
                                            {test.totalAttempts === 0 ? (
                                                "0"
                                            ) : (
                                                <Link
                                                    to={
                                                        isAdmin
                                                            ? generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, {
                                                                  testId: test.id,
                                                              })
                                                            : generatePath(ROUTES.MY_TEST_ATTEMPTS, { testId: test.id })
                                                    }
                                                    className="actionLink"> 
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

export default UserTestsTable
