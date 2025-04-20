import { FC } from "react"
import { Button } from "@/shared/ui/Button"
import styles from "./TestPagination.module.scss"

interface TestPaginationProps {
    totalPages: number
    page: number
    changePage: (page: number) => void
}

const TestPagination: FC<TestPaginationProps> = ({ totalPages, page, changePage }) => {
    const pagesArray = Array.from({ length: totalPages }, (_, idx) => idx + 1)

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.navigationButtons}>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1 || totalPages === 0}>
                    <span className={styles.buttonSymbol}>{"<"}</span>
                    <span className={styles.buttonText}>{"Назад"}</span>
                </Button>
            </div>

            <div className={styles.pagesGrid}>
                {pagesArray.map(p => (
                    <span
                        key={p}
                        className={page === p ? `${styles.page} ${styles.pageCurrent}` : styles.page}
                        onClick={() => changePage(p)}>
                        {p}
                    </span>
                ))}
            </div>

            <div className={styles.navigationButtons}>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages || totalPages === 0}>
                    <span className={styles.buttonText}>{"Вперед"}</span>
                    <span className={styles.buttonSymbol}>{">"}</span>
                </Button>
            </div>
        </div>
    )
}

export default TestPagination
