import { useLocation, useNavigate } from "react-router-dom"

export const useSearch = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleSearch = (query: string, page: number) => {
        const params = new URLSearchParams(location.search)
        params.set("query", query)
        params.set("page", page.toString())
        navigate({ search: params.toString() })
    }

    const handleReset = () => {
        const params = new URLSearchParams()
        params.set("page", "1")
        navigate({ search: params.toString() })
    }

    return { handleSearch, handleReset }
}
