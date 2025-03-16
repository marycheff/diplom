import ResetPasswordForm from "@/containers/ResetPasswordForm"
import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"
import { Link } from "react-router-dom"

const LoginPage = () => {
    const handleResetPasswordClick = () => {
        setIsResetPasswordVisible(true)
    }
    const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login } = useAuthStore()

    return (
        <div>
            <div>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                />
                <button onClick={() => login(email, password)}>Вход</button>
            </div>
            <div className="">
                <p className="">
                    Нет аккаунта?{" "}
                    <Link to="/signup" className="">
                        Зарегистрироваться
                    </Link>
                </p>
            </div>
            {!isResetPasswordVisible && (
                <p
                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                    onClick={handleResetPasswordClick}>
                    Забыли пароль?
                </p>
            )}
            {isResetPasswordVisible && <ResetPasswordForm />}
        </div>
    )
}

export default LoginPage
