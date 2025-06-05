import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { shortenText } from "@/shared/utils/formatter"
import { isValidUUID } from "@/shared/utils/validator"
import { IoHomeOutline } from "react-icons/io5"
import { Link, matchPath, useLocation } from "react-router-dom"
import styles from "./Breadcrumbs.module.scss"

const Breadcrumbs = () => {
	const location = useLocation()
	const path = location.pathname
	const { isAdmin } = useAuthStore()

	const excludedPaths = [
		ROUTES.LOGIN,
		ROUTES.REGISTER,
		ROUTES.ACTIVATION_ERROR,
		ROUTES.ACTIVATION_SUCCESS,
		ROUTES.START_ATTEMPT,
		ROUTES.PASS_ATTEMPT,
		ROUTES.WELCOME,
	]
	const shouldDisplayBreadcrumbs = !excludedPaths.some((excludedPath) => {
		// Для динамических путей
		if (excludedPath.includes(":")) {
			const match = matchPath({ path: excludedPath, end: true }, path)
			return match !== null
		}
		// Для статических путей
		return path === excludedPath || path.startsWith(`${excludedPath}/`)
	})

	if (!shouldDisplayBreadcrumbs) {
		return null
	}

	const pathnames = location.pathname.split("/").filter((x) => x)
	// Словарь для статических названий
	const labels: { [key: string]: string } = {
		admin: "Админ-панель",
		tests: "Тесты",
		users: "Пользователи",
		attempts: "Попытки прохождения",
		profile: "Профиль",
		home: "Главная",
		start: "Начать",
		unmoderated: "Не модерированные",
		"create-user": "Создание пользователя",
		"create-test": "Создание теста",
		"my-tests": "Мои тесты",
		"add-questions": "Добавление вопросов",
		"edit-settings": "Редактирование вопросов",
		"my-attempts": "Мои попытки",
	}
	const idLabelsMap: { [key: string]: string } = {
		tests: "Тест",
		"my-tests": "Мой тест",
		attempts: "Попытка",
		"my-attempts": "Моя попытка",
		users: "Пользователь",
	}

	return (
		<nav className={styles.breadcrumbs}>
			{/* <BackButton /> */}
			<span className={styles.item}>
				<Link
					to={isAdmin ? ROUTES.ADMIN : ROUTES.HOME}
					className={`${styles.link} ${styles.home}`}
				>
					<IoHomeOutline />
				</Link>
			</span>

			{pathnames.map((value, index) => {
				const to = `/${pathnames.slice(0, index + 1).join("/")}`
				const isLast = index === pathnames.length - 1
				const isId = isValidUUID(value)
				const prevSegment = pathnames[index - 1]
				const label = isId ? idLabelsMap[prevSegment] || shortenText(value) : labels[value] || value

				return (
					<span
						key={to}
						className={styles.item}
					>
						<span className={styles.separator}> / </span>
						{isLast ? (
							<span>{label}</span>
						) : (
							<Link
								to={to}
								className={styles.link}
							>
								{label}
							</Link>
						)}
					</span>
				)
			})}
		</nav>
	)
}

export default Breadcrumbs
