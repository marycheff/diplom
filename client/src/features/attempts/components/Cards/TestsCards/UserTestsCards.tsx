import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { TestDTO, TestVisibilityStatus, VisibilityStatusLabels } from "@/shared/types"
import { FC } from "react"
import { generatePath, Link } from "react-router-dom"
import styles from "./TestsCards.module.scss"

interface UserTestsCardsProps {
	tests: TestDTO[]
	total: number
}

const UserTestsCards: FC<UserTestsCardsProps> = ({ tests, total }) => {
	const { isAdmin } = useAuthStore()
	const getVisibilityStatusClassName = (status: TestVisibilityStatus) => {
		switch (status) {
			case TestVisibilityStatus.PUBLISHED:
				return styles.published
			case TestVisibilityStatus.HIDDEN:
				return styles.hidden
			default:
				return styles.hidden
		}
	}

	return (
		<>
			{tests && tests.length > 0 && (
				<div className={styles.testsData}>
					<div className={styles.testsCount}>
						<h3>Всего: {total}</h3>
						<h3>На странице: {tests.length}</h3>
					</div>

					<div className={styles.cardsContainer}>
						{tests.map((test) => (
							<div
								key={test.id}
								className={styles.card}
							>
								<div className={styles.cardHeader}>
									<h3>{test.title}</h3>
									<span className={`${styles.statusBadge} ${getVisibilityStatusClassName(test.visibilityStatus)}`}>
										{VisibilityStatusLabels[test.visibilityStatus]}
									</span>
								</div>

								<div className={styles.cardContent}>
									<div className={styles.cardInfo}>
										<div className={styles.infoRow}>
											<span className={styles.label}>Кол-во вопросов:</span>
											<span className={styles.value}>{test.questions ? test.questions.length : 0}</span>
										</div>
										<div className={styles.infoRow}>
											<span className={styles.label}>Требуется регистрация:</span>
											<span className={styles.value}>{test.settings?.requireRegistration ? "Да" : "Нет"}</span>
										</div>
										<div className={styles.infoRow}>
											<span className={styles.label}>Детальные результаты:</span>
											<span className={styles.value}>{test.settings?.showDetailedResults ? "Да" : "Нет"}</span>
										</div>
										<div className={styles.infoRow}>
											<span className={styles.label}>Кол-во попыток:</span>
											<span className={styles.value}>
												{test.totalAttempts === 0 ? (
													"0"
												) : (
													<Link
														to={
															isAdmin
																? generatePath(ROUTES.ADMIN_TEST_ATTEMPTS, {
																		testId: test.id
																  })
																: generatePath(ROUTES.MY_TEST_ATTEMPTS, {
																		testId: test.id
																  })
														}
														className="actionLink"
													>
														{test.totalAttempts}
													</Link>
												)}
											</span>
										</div>
									</div>

									<div className={styles.cardActions}>
										<Link
											to={
												isAdmin
													? generatePath(ROUTES.ADMIN_MY_TEST_INFO, { testId: test.id })
													: generatePath(ROUTES.MY_TEST_INFO, { testId: test.id })
											}
											className={styles.actionLink}
										>
											Перейти к тесту
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	)
}

export default UserTestsCards
