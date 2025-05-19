import { ROUTES } from "@/router/paths"
import { FiArchive, FiEdit, FiFileText, FiUser } from "react-icons/fi"
import { Link } from "react-router-dom"
import styles from "./HomePage.module.scss"

const HomePage = () => {
    const items = [
        { to: ROUTES.PROFILE, icon: <FiUser />, label: "Профиль", color: "accent-secondary" },
        { to: ROUTES.CREATE_TEST, icon: <FiEdit />, label: "Создать тест", color: "accent-secondary" },
        { to: ROUTES.MY_TESTS, icon: <FiArchive />, label: "Мои тесты", color: "accent-secondary" },
        { to: ROUTES.MY_ATTEMPTS, icon: <FiFileText />, label: "Мои результаты", color: "accent-secondary" },
    ]

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                {/* <h1 className={styles.title}>Домашняя страница</h1> */}
                <div className={styles.grid}>
                    {items.map((item, index) => (
                        <Link to={item.to} key={index} className={styles.card}>
                            <div className={`${styles.icon} ${styles[item.color]}`}>{item.icon}</div>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
