import { ROUTES } from "@/router/paths"
import BackButton from "@/shared/ui/Button/BackButton/BackButton"
import { isValidUUID } from "@/shared/utils/validator"
import { Link, matchPath, useLocation } from "react-router-dom"
import styles from "./Breadcrumbs.module.scss"

const Breadcrumbs = () => {
    const location = useLocation()
    const path = location.pathname

    const excludedPaths = [
        ROUTES.LOGIN,
        ROUTES.SIGNUP,
        ROUTES.ACTIVATION_ERROR,
        ROUTES.ACTIVATION_SUCCESS,
        ROUTES.START_ATTEMPT,
        ROUTES.PASS_ATTEMPT,
        ROUTES.WELCOME,
    ]
    const shouldDisplayBreadcrumbs = !excludedPaths.some(excludedPath => {
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

    const pathnames = location.pathname.split("/").filter(x => x) // Разбиваем URL на части
    // Словарь для статических названий
    const labels: { [key: string]: string } = {
        admin: "Админ-панель",
        tests: "Тесты",
        users: "Пользователи",
        attempts: "Попытки прохождения",
        profile: "Профиль",
        home: "Главная",
        "create-test": "Создание теста",
        "my-tests": "Мои тесты",
        "add-questions": "Добавление вопросов",
        "edit-settings": "Редактирование вопросов",
        start: "Начать",
    }

    return (
        <nav className={styles.breadcrumbs}>
            <BackButton />
            <span className={styles.item}>
                <Link to="/" className={`${styles.link} ${styles.home}`}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M9 22V12H15V22"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Link>
            </span>

            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join("/")}`
                const isLast = index === pathnames.length - 1
                const isId = isValidUUID(value)
                const label = isId ? value : labels[value] || value

                return (
                    <span key={to} className={styles.item}>
                        <span className={styles.separator}> {"/"} </span>
                        {isLast ? (
                            <span>{label}</span>
                        ) : (
                            <Link to={to} className={styles.link}>
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
