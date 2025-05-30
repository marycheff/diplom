import { formatSpaces } from "@/shared/utils/formatter"
import { useLocation, useNavigate } from "react-router-dom"

export const useSearch = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const handleSearch = (query: string, page = 1) => {
		const trimmedQuery = formatSpaces(query)
		if (!trimmedQuery) return
		const params = new URLSearchParams(location.search)
		params.set("query", trimmedQuery)
		params.set("page", page.toString())
		navigate({ search: params.toString() })
	}

	const handleResetSearch = () => {
		const params = new URLSearchParams()
		params.set("page", "1")
		navigate({ search: params.toString() })
	}

	return { handleSearch, handleResetSearch }
}
