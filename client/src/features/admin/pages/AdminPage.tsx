import { ROUTES } from "@/router/paths"
import classNames from "classnames"
import { FiArchive, FiCheckSquare, FiEdit, FiFileText, FiUser, FiUsers } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import styles from "./AdminPage.module.scss"

const AdminPage = () => {
    const navigate = useNavigate()
    const sections = [
        {
            title: "Управление",
            items: [
                { to: ROUTES.ADMIN_USERS, label: "Пользователи", icon: <FiUsers />, color: "accent-secondary" },
                { to: ROUTES.ADMIN_TESTS, label: "Тесты", icon: <FiFileText />, color: "accent-secondary" },
                { to: ROUTES.ADMIN_ALL_ATTEMPTS, label: "Попытки", icon: <FiCheckSquare />, color: "accent-secondary" },
            ],
        },
        {
            title: "Тестирование",
            items: [
                { to: ROUTES.ADMIN_PROFILE, label: "Профиль", icon: <FiUser />, color: "accent-secondary" },
                { to: ROUTES.ADMIN_CREATE_TEST, label: "Создать тест", icon: <FiEdit />, color: "accent-secondary" },
                { to: ROUTES.ADMIN_MY_TESTS, label: "Мои тесты", icon: <FiArchive />, color: "accent-secondary" },
            ],
        },
    ]

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.content}>
                <h1 className={styles.title}>Админ-панель</h1>
                {sections.map((section, index) => (
                    <section key={index} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{section.title}</h2>
                        <div className={styles.grid}>
                            {section.items.map((item, idx) => (
                                <div key={idx} className={styles.card} onClick={() => navigate(item.to)}>
                                    <div className={classNames(styles.icon, styles[item.color])}>{item.icon}</div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    )
}

export default AdminPage
