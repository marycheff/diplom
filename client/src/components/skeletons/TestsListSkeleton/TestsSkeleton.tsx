import stylesPagination from "@/components/ui/Pagination/Pagination.module.scss"
import { TestDTO } from "@/types/testTypes"
import { FC } from "react"
import "./TestsListSkeleton.scss"
interface TestsListSkeletonProps {
    rows?: number
}
const TestsListSkeleton: FC<TestsListSkeletonProps> = ({ rows = 10 }) => {
    const skeletonTests: Partial<TestDTO>[] = Array(rows).fill({})
    const pagesArray = [1, 2, 3]

    return (
        <div className="tests-skeleton">
            <div className="tests-data">
                <div className="tests-count">
                    <h3 className="skeleton skeleton-text">
                        Всего: <span className="skeleton skeleton-box"></span>
                    </h3>
                    <h3 className="skeleton skeleton-text">
                        На странице: <span className="skeleton skeleton-box"></span>
                    </h3>
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
                            {skeletonTests.map((_, index) => (
                                <tr key={index}>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box skeleton-box--wide"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                    <td>
                                        <span className="skeleton skeleton-box"></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={stylesPagination.pageWrapper}>
                {pagesArray.map(p => (
                    <span
                        key={p}
                        className={`${stylesPagination.page} ${p === 1 ? stylesPagination.pageCurrent : ""} skeleton`}>
                        {p}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TestsListSkeleton
