import UserTestsTable from "@/features/tests/components/Tables/UserTestsTable/UserTestsTable"
import { useTestStore } from "@/features/tests/store/useTestStore"
import NothingFound from "@/shared/components/NotFound/NothingFound"
import TableSkeleton from "@/shared/skeletons/Table/TableSkeleton"
import { TestDTO } from "@/shared/types"
import Pagination from "@/shared/ui/Pagination/Pagination"
import { USER_TABLE_LIMIT } from "@/shared/utils/constants"
import { isValidUUID } from "@/shared/utils/validator"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from "./UserTests.module.scss"

const UserTests = () => {
	const { userId } = useParams<{ userId: string }>()

	if (!userId) {
		return <NothingFound title="ID пользователя не указан" />
	}
	if (!isValidUUID(userId)) {
		return <NothingFound title="Невалидный ID пользователя" />
	}

	const [tests, setTests] = useState<TestDTO[]>([])
	const [total, setTotal] = useState<number | null>(null)
	const [limit] = useState<number>(USER_TABLE_LIMIT)
	const [page, setPage] = useState<number>(1)

	const { getUserTests, isFetching } = useTestStore()

	const fetchData = useCallback(
		async (currentPage: number) => {
			if (isFetching) return

			const data = await getUserTests(userId, currentPage, limit)
			if (data) {
				setTests(data.tests)
				setTotal(data.total)
			}
		},
		[getUserTests, limit, userId]
	)

	useEffect(() => {
		fetchData(page)
	}, [fetchData, page])

	const handlePageChange = (newPage: number) => {
		setPage(newPage)
	}

	// const handleUpdateButton = () => {
	//     fetchData(page)
	// }

	const isDataLoaded = total !== null
	const totalPages = total !== null ? Math.ceil(total / limit) : 0
	const shouldShowContent = totalPages > 0 && page <= totalPages
	const emptyTestsPage = total === 0 && page === 1 && isDataLoaded

	return (
		<div className={styles.userTestsContainer}>
			{isFetching || !isDataLoaded ? (
				<TableSkeleton />
			) : emptyTestsPage ? (
				<div className={styles.emptyState}>
					<p className={styles.description}>Пользователь еще не создавал тесты</p>
				</div>
			) : (
				<>
					{shouldShowContent ? (
						<div className={styles.contentContainer}>
							<UserTestsTable
								tests={tests}
								total={total || 0}
							/>
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
	)
}

export default UserTests
