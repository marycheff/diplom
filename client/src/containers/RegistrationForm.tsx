import { Context } from "@/main"
import { useAuthStore } from "@/store/useAuthStore"
import { observer } from "mobx-react-lite"
import { FC, useContext, useState } from "react"

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { store } = useContext(Context)
    const { registration, isLoading } = useAuthStore()

    return (
        <div style={{ position: "relative" }}>
            <input onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Email" />
            <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder="Пароль" />
            {/* <button onClick={() => store.registration(email, password)} disabled={store.isLoading}>
                Регистрация
            </button> */}
            <button onClick={() => registration(email, password)} disabled={isLoading}>
                Регистрация
            </button>
        </div>
    )
}
export default observer(RegistrationForm)
