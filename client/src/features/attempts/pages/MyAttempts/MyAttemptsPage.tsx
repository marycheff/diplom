import MyAttemptsCards from "@/features/attempts/components/Cards/AttemptsCards/MyAttemptsCards"
import UserAttemptsTable from "@/features/attempts/components/Tables/AttemptsTable/UserAttemptsTable"
import { useAttemptStore } from "@/features/attempts/store/useAttemptStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import { useIsMobile } from "@/shared/hooks/useIsMobile"
import { useSearch } from "@/shared/hooks/useSearch"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { AttemptWithSnapshotDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Pagination from "@/shared/ui/Pagination/Pagination"
import Select from "@/shared/ui/Select/Select"
import { TABLE_LIMIT } from "@/shared/utils/constants"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styles from "./MyAttemptsPage.module.scss"
import { PiSmileySadLight } from "react-icons/pi"

type ViewMode = "table" | "cards"

const MyAttemptsPage = () => {
	const [attempts, setAttempts] = useState<AttemptWithSnapshotDTO[]>([])
	const [total, setTotal] = useState<number | null>(null)
	const [limit] = useState<number>(TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)
	const [viewMode, setViewMode] = useState<ViewMode>(() => {
		const savedViewMode = localStorage.getItem("myAttemptsViewMode")
		return (savedViewMode as ViewMode) || "cards"
	})
	const navigate = useNavigate()
	const params = new URLSearchParams(location.search)

	const { handleResetSearch: resetSearch } = useSearch()

	const { getMyAttempts, isFetching } = useAttemptStore()

	const handleViewModeChange = (value: string) => {
		const newViewMode = value as ViewMode
		setViewMode(newViewMode)
		localStorage.setItem("myAttemptsViewMode", newViewMode)
	}

	const fetchData = useCallback(
		async (currentPage: number) => {
			if (isFetching) return
			const data = await getMyAttempts(currentPage, limit)
			if (data) {
				setAttempts(data.attempts)
				setTotal(data.total)
			}
		},
		[getMyAttempts, limit]
	)
	useEffect(() => {
		const params = new URLSearchParams(location.search)
		let pageParam = parseInt(params.get("page") || "1", 10)
		// if (!params.has("page")) {
		// 	params.set("page", "1")
		// 	navigate({ search: params.toString() })
		// 	pageParam = 1
		// }

		setPage(pageParam)
		fetchData(pageParam)
	}, [location.search, fetchData, navigate])

	const isMobile = useIsMobile()

	// Авто-установка table-режима при малом экране
	useEffect(() => {
		if (isMobile && viewMode !== "cards") {
			setViewMode("cards")
		}
	}, [isMobile, viewMode])
	const handlePageChange = (newPage: number) => {
		params.set("page", newPage.toString())
		navigate({ search: params.toString() })
	}
	const handleUpdateButton = () => {
		fetchData(page)
	}
	const handleResetSearch = () => {
		resetSearch()
	}
	const isDataLoaded = total !== null

	const totalPages = total !== null ? Math.ceil(total / limit) : 0
	const shouldShowPagination = totalPages > 0 && page <= totalPages
	const emptyAttemptsPage = total === 0 && page === 1 && isDataLoaded && !isFetching
	const { register } = useForm()
	return (
		<>
			{emptyAttemptsPage ? (
				<div className={styles.emptyStateContainer}>
					<div className={styles.emptyState}>
						<div className={styles.emoji}>
							<PiSmileySadLight />
						</div>
						<h2 className={styles.title}>Вы еще не проходили тесты</h2>
						<p className={styles.description}>Проходите тесты, чтобы увидеть результаты и оценку вашего выполнения</p>
					</div>
				</div>
			) : (
				<div className={styles.wrapper}>
					{isFetching || !isDataLoaded ? (
						<TableSkeleton />
					) : (
						<>
							{page > totalPages && (
								<Button
									onClick={handleResetSearch}
									disabled={isFetching}
								>
									Сбросить
								</Button>
							)}

							{shouldShowPagination ? (
								<div className={styles.contentContainer}>
									<div className={styles.controls}>
										<div className={styles.buttonsContainer}>
											<Button
												onClick={handleUpdateButton}
												disabled={isFetching}
											>
												Обновить
											</Button>
										</div>
										{!isMobile && (
											<div className={styles.header}>
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
											</div>
										)}
									</div>
									{viewMode === "table" ? (
										<UserAttemptsTable
											attempts={attempts}
											total={total}
										/>
									) : (
										<MyAttemptsCards
											attempts={attempts}
											total={total}
										/>
									)}
									<Pagination
										page={page}
										totalPages={totalPages}
										changePage={handlePageChange}
									/>
								</div>
							) : (
								<NothingFound />
							)}
						</>
					)}
				</div>
			)}
		</>
	)

}

export default MyAttemptsPage
