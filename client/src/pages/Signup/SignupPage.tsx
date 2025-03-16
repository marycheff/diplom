import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"
import { Link } from "react-router-dom"

const SignupPage = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { registration, isLoading } = useAuthStore()
    return (
        <>
            <div style={{ position: "relative" }}>
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                />
                <button onClick={() => registration(email, password)} disabled={isLoading}>
                    Регистрация
                </button>
                <div className="text-center">
                    <p className="text-base-content/60">
                        Уже зарегистрированы?{" "}
                        <Link to="/login" className="link link-primary">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default SignupPage
