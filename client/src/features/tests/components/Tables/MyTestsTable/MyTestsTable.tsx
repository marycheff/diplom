import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { TestDTO, VisibilityStatusLabels } from "@/shared/types"
import { FC } from "react"
import { Link } from "react-router-dom"
import styles from "./MyTestsTable.module.scss"

interface MyTestsTableProps {
    tests: TestDTO[]
    total: number
}

const MyTestsTable: FC<MyTestsTableProps> = ({ tests, total }) => {
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
                                    <th scope="col">Показывать детальные результаты</th>
                                    <th scope="col">Кол-во попыток</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tests.map(test => (
                                    <tr key={test.id}>
                                        <td>
                                            <Link
                                                to={isAdmin ? `/admin/my-tests/${test.id}` : `/my-tests/${test.id}`}
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

export default MyTestsTable
