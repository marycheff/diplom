import UserTestsCards from "@/features/attempts/components/Cards/TestsCards/UserTestsCards"
import UserTestsTable from "@/features/tests/components/Tables/UserTestsTable/UserTestsTable"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useCache } from "@/shared/hooks/useCache"
import { useIsMobile } from "@/shared/hooks/useIsMobile"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestDTO, TestsListDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import SearchBar from "@/shared/ui/SearchBar/SearchBar"
import Select from "@/shared/ui/Select/Select"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { formatDate } from "@/shared/utils/formatter"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { PiSmileySadLight } from "react-icons/pi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import styles from "./MyTestsPage.module.scss"

type ViewMode = "table" | "cards"

const MyTestsPage = () => {
	const [tests, setTests] = useState<TestDTO[]>([])
	const { getMyTests, searchMyTests, isFetching } = useTestStore()
	const [total, setTotal] = useState<number | null>(null)
	const [limit] = useState<number>(TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [viewMode, setViewMode] = useState<ViewMode>(() => {
		const savedViewMode = localStorage.getItem("myTestsViewMode")
		return (savedViewMode as ViewMode) || "cards"
	})
	const navigate = useNavigate()
	const location = useLocation()
	const isMobile = useIsMobile()
	const { getCacheKey, getCachedData, saveToCache, clearCache, cacheVersion, lastUpdateDate } = useCache<TestsListDTO>(
		useTestStore,
		"my-tests"
	)
	const { handleSearch: search, handleResetSearch: resetSearch } = useSearch()
	const params = new URLSearchParams(location.search)
	const { register } = useForm()

	const handleViewModeChange = (value: string) => {
		const newViewMode = value as ViewMode
		setViewMode(newViewMode)
		localStorage.setItem("myTestsViewMode", newViewMode)
	}

	const fetchData = useCallback(
		async (currentPage: number, query?: string) => {
			if (isFetching) return
			const cacheKey = getCacheKey(currentPage, query)
			const cachedData = getCachedData(cacheKey)

			if (cachedData) {
				setTests(cachedData.tests)
				setTotal(cachedData.total)
				return
			}
			let data
			if (query) {
				data = await searchMyTests(query, currentPage, limit)
			} else {
				data = await getMyTests(currentPage, limit)
			}
			if (data) {
				setTests(data.tests)
				setTotal(data.total)
				saveToCache(cacheKey, data)
			}
		},
		[getCacheKey, getCachedData, saveToCache, searchMyTests, getMyTests, limit]
	)

	// Авто-установка cards-режима при малом экране
	useEffect(() => {
		if (isMobile && viewMode !== "cards") {
			setViewMode("cards")
		}
	}, [isMobile, viewMode])

	useEffect(() => {
		const query = params.get("query") || ""
		let pageParam = parseInt(params.get("page") || "1", 10)
		// if (!params.has("page")) {
		// 	params.set("page", "1")
		// 	navigate({ search: params.toString() })
		// 	pageParam = 1
		// }

		setSearchQuery(query)
		setPage(pageParam)
		fetchData(pageParam, query || undefined)
	}, [location.search, fetchData, cacheVersion, navigate])

	const handlePageChange = (newPage: number) => {
		params.set("page", newPage.toString())

		if (searchQuery) {
			params.set("query", searchQuery)
		}

		navigate({ search: params.toString() })
	}

	const handleSearch = () => {
		search(searchQuery)
	}

	const handleClearSearchBar = () => {
		setSearchQuery("")
	}

	const handleResetSearch = () => {
		resetSearch()
	}

	const handleUpdateButton = () => {
		clearCache()
		fetchData(page, searchQuery || undefined)
	}

	const totalPages = total !== null ? Math.ceil(total / limit) : 0
	const isDataLoaded = total !== null
	const hasTests = total !== null && total > 0
	const isSearchActive = !!params.get("query")
	const noTestsFoundInSearch = isSearchActive && hasTests === false && isDataLoaded
	const emptyTestsPage = !isSearchActive && total === 0 && page === 1 && isDataLoaded
	const shouldShowPagination = totalPages > 0 && page <= totalPages

	return (
		<>
			{isFetching || !isDataLoaded ? (
				<TableSkeleton />
			) : emptyTestsPage ? (
				<div className={styles.emptyStateContainer}>
					<div className={styles.emptyState}>
						<div className={styles.emoji}>
							<PiSmileySadLight />
						</div>
						<h2 className={styles.title}>У вас пока нет тестов</h2>
						<p className={styles.description}>
							Создайте свой первый тест, чтобы начать оценивать знания студентов и коллег. Это займет всего несколько
							минут!
						</p>
						<Link
							to={ROUTES.CREATE_TEST}
							className={styles.createLink}
						>
							Создать первый тест
						</Link>
					</div>
				</div>
			) : (
				<div className={styles.wrapper}>
					<SearchBar
						name="search"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						handleSearch={handleSearch}
						onClearSearch={handleClearSearchBar}
						placeholder="Поиск"
					/>

					<div className={styles.controls}>
						<div className={styles.buttons}>
							<Button
								onClick={handleResetSearch}
								disabled={isFetching || !isSearchActive}
							>
								Сбросить
							</Button>
							<Button
								onClick={handleUpdateButton}
								disabled={isFetching}
							>
								Обновить
							</Button>
						</div>

						<div className={styles.cacheInfo}>
							<span>Последнее обновление: {lastUpdateDate ? formatDate(lastUpdateDate) : "Нет данных"}</span>
						</div>

						{!isMobile && (
							<Select
								register={register}
								label="Вид отображения"
								name="viewMode"
								options={[
									{ value: "table", label: "Таблицей" },
									{ value: "cards", label: "Карточками" },
								]}
								value={viewMode}
								onChange={handleViewModeChange}
							/>
						)}
					</div>

					{shouldShowPagination ? (
						<div className={styles.contentContainer}>
							{viewMode === "table" ? (
								<UserTestsTable
									tests={tests}
									total={total}
								/>
							) : (
								<UserTestsCards
									tests={tests}
									total={total}
								/>
							)}
							<Pagination
								page={page}
								totalPages={totalPages}
								changePage={handlePageChange}
							/>
						</div>
					) : noTestsFoundInSearch ? (
						<NothingFound />
					) : (
						<NothingFound />
					)}
				</div>
			)}
		</>
	)
}

export default MyTestsPage
