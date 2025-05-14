import { ROUTES } from "@/router/paths"
import { Button } from "@/shared/ui/Button"
import { useNavigate } from "react-router-dom"
import styles from "./WelcomePage.module.scss"

const WelcomePage = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.logo}>НейроТест</div>
                <div className={styles.authButtons}>
                    <Button onClick={() => navigate(ROUTES.LOGIN)}>Авторизация</Button>
                    <Button onClick={() => navigate(ROUTES.REGISTER)}>Регистрация</Button>
                </div>
            </header>

            <main className={styles.main}>
                <section className={styles.hero}>
                    <h1>Создавайте тесты за минуты</h1>
                    <p>НейроТест — ваш универсальный конструктор тестов. Удобно. Быстро. Современно.</p>
                    <Button onClick={() => navigate(ROUTES.REGISTER)}>Начать бесплатно</Button>
                </section>

                <section className={styles.features}>
                    <div className={styles.featureCard}>
                        <h3>Гибкий редактор</h3>
                        <p>Добавляйте различные типы вопросов: с выбором, вводом и логикой.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Аналитика</h3>
                        <p>Следите за прогрессом пользователей и анализируйте попытки.</p>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Публикация в 1 клик</h3>
                        <p>Быстро делитесь тестами по ссылке.</p>
                    </div>
                </section>
            </main>

            <footer className={styles.footer}>
                <div>© 2025 НейроТест. Все права защищены.</div>
                <div className={styles.footerLinks}>
                    <a href="/terms">Условия использования</a>
                    <a href="/privacy">Политика конфиденциальности</a>
                    <a href="/contact">Контакты</a>
                </div>
            </footer>
        </div>
    )
}

export default WelcomePage
