import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { AttemptDTO, AttemptStatusLabels, GenderLabels, PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { formatDate } from "@/shared/utils/formatter"
import { FC } from "react"
import { generatePath, Link } from "react-router-dom"
import styles from "./AttemptsTable.module.scss"
interface AttemptsTableProps {
	attempts: AttemptDTO[] | undefined
	total: number
}
const AttemptsTable: FC<AttemptsTableProps> = ({ attempts, total }) => {
	const { isAdmin } = useAuthStore()
	return (
		<>
			{attempts && attempts.length > 0 && (
				<div className={styles.attemptsData}>
					<div className={styles.attemptsCount}>
						<h3>Всего: {total}</h3>
						<h3>На странице: {attempts.length}</h3>
					</div>

					<div className={styles.tableResponsive}>
						<table>
							<thead>
								<tr>
									<th scope="col"></th>
									<th scope="col">Пользователь</th>
									<th scope="col">Тест</th>
									<th scope="col">Статус</th>
									<th scope="col">Начата</th>
									<th scope="col">Завершена</th>
									<th scope="col">Результат</th>
								</tr>
							</thead>
							<tbody>
								{attempts.map((attempt) => (
									<tr key={attempt.id}>
										<td>
											<Link
												to={
													isAdmin
														? generatePath(ROUTES.ADMIN_ATTEMPT_INFO, {
																attemptId: attempt.id,
														  })
														: generatePath(ROUTES.MY_TEST_ATTEMPT_INFO, {
																testId: attempt.test.id,
																attemptId: attempt.id,
														  })
												}
												className="actionLink"
											>
												Перейти
											</Link>
										</td>

										<td>
											{attempt.user ? (
												// UserDTO
												isAdmin ? (
													<Link
														to={generatePath(ROUTES.ADMIN_USER_INFO, {
															userId: attempt.user.id,
														})}
														className="actionLink"
													>
														{attempt.user.email || <span>перейти</span>}
													</Link>
												) : (
													<span>{attempt.user.email || <span>перейти</span>}</span>
												)
											) : attempt.preTestUserData ? (
												// Record<PreTestUserData, string>
												<span>
													{Object.entries(attempt.preTestUserData)
														.map(([key, value]) => {
															const label = PreTestUserDataLabels[key as PreTestUserData] || key
															const displayValue =
																key === PreTestUserData.Gender && value
																	? GenderLabels[value.toString()] || value
																	: value
															return `${label}: ${displayValue}`
														})
														.join(", ")}
												</span>
											) : (
												<span className={styles.emptyField}>аноним</span>
											)}
										</td>

										<td>
											<Link
												to={generatePath(
													isAdmin ? ROUTES.ADMIN_TEST_INFO : ROUTES.MY_TEST_INFO,
													{
														testId: attempt.test.id,
													}
												)}
												className="actionLink"
											>
												{attempt.test.title}
											</Link>
										</td>
										<td>{AttemptStatusLabels[attempt.status]}</td>
										<td>{formatDate(attempt.startedAt)}</td>
										<td>{attempt.completedAt ? formatDate(attempt.completedAt) : "—"}</td>
										<td>
											{typeof attempt.score === "number" ? (
												`${attempt.score}%`
											) : (
												<span className={styles.emptyField}>—</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}

export default AttemptsTable
