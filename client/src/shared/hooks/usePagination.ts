import { useMemo } from "react"

const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, idx) => idx + start)
}

export const usePagination = (totalPages: number, currentPage: number) => {
    const pagesArray = useMemo(() => {
        if (totalPages <= 5) {
            return range(1, totalPages)
        }

        if (currentPage <= 3) {
            return [...range(1, 4), "...", totalPages]
        }

        if (currentPage >= totalPages - 2) {
            return [1, "...", ...range(totalPages - 3, totalPages)]
        }

        return [1, "...", ...range(currentPage - 1, currentPage + 1), "...", totalPages]
    }, [totalPages, currentPage])

    return pagesArray
}
