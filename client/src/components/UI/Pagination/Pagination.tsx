import { usePagination } from "@/hooks/usePagination"
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
            {pagesArray.map(p => (
                <span
                    key={p}
                    className={page === p ? `${styles.page} ${styles.pageCurrent}` : `${styles.page}`}
                    onClick={() => changePage(p)}>
                    {p}
                </span>
            ))}
        </div>
    )
}

export default Pagination
