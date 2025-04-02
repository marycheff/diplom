import { usePagination } from "@/shared/hooks/usePagination"
import { Button } from "@/shared/ui/Button"
import { FC } from "react"
import styles from "./Pagination.module.scss"

interface PaginationProps {
    totalPages: number
    page: number
    changePage: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({ totalPages, page, changePage }) => {
    let pagesArray = usePagination(totalPages)
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.navigationButtons}>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(1)}
                    disabled={page === 1 || totalPages === 0}>
                    {"<<"}
                </Button>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1 || totalPages === 0}>
                    {"<"}
                </Button>
            </div>

            {pagesArray.map(p => (
                <span
                    key={p}
                    className={page === p ? `${styles.page} ${styles.pageCurrent}` : `${styles.page}`}
                    onClick={() => changePage(p)}>
                    {p}
                </span>
            ))}
            <div className={styles.navigationButtons}>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages || totalPages === 0}>
                    {">"}
                </Button>
                <Button
                    className={styles.navigationButton}
                    onClick={() => changePage(totalPages)}
                    disabled={page === totalPages || totalPages === 0}>
                    {">>"}
                </Button>
            </div>
        </div>
    )
}

export default Pagination
