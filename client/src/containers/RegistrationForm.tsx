import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { registration, isLoading } = useAuthStore()

    return (
        <div style={{ position: "relative" }}>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
            <button onClick={() => registration(email, password)} disabled={isLoading}>
                Регистрация
            </button>
        </div>
    )
}

export default RegistrationForm
