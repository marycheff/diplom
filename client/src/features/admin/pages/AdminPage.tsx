import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import styles from "./AdminPage.module.scss"

const AdminPage = () => {
    const navigate = useNavigate()
    const { logout } = useAuthStore()

    interface StartTest {
        testId: string
    }

    const { register, handleSubmit, setValue, trigger } = useForm<StartTest>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
    })

    const onSubmit: SubmitHandler<StartTest> = data => {
        navigate(`/${formatSpaces(data.testId)}/start`)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Админ-панель</h1>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Управление</h2>
                <div className={styles.buttonGroup}>
                    <Button onClick={() => navigate(ROUTES.ADMIN_USERS)}>Пользователи</Button>
                    <Button onClick={() => navigate(ROUTES.ADMIN_TESTS)}>Тесты</Button>
                    <Button onClick={() => navigate(ROUTES.ADMIN_ALL_ATTEMPTS)}>Попытки прохождения</Button>
                </div>
            </section>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Тестирование</h2>
                <div className={styles.buttonGroup}>
                    <Button onClick={() => navigate(ROUTES.ADMIN_PROFILE)}>Профиль</Button>
                    <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_TEST)}>Создать Тест</Button>
                    <Button onClick={() => navigate(ROUTES.ADMIN_MY_TESTS)}>Мои тесты</Button>
                </div>
            </section>
            <div className={styles.logoutWrapper}>
                <Button onClick={logout} className={styles.logoutButton}>
                    Выйти
                </Button>
            </div>
        </div>
    )
}

export default AdminPage
