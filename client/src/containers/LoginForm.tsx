import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"

const LoginForm = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { login } = useAuthStore()

    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
            <button onClick={() => login(email, password)}>Вход</button>
        </div>
    )
}

export default LoginForm
