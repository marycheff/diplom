import { observer } from "mobx-react-lite"
import { FC, useContext, useState } from "react"
import { Context } from "../main"

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { store } = useContext(Context)

    return (
        <div>
            {(import.meta as any).env.VITE_RESET_PASSWORD_TIMEOUT_MINUTES || 5}
            <input onChange={e => setEmail(e.target.value)} value={email} type='text' placeholder='Email' />
            <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Пароль' />

            <button onClick={() => store.registration(email, password)}>Регистрация</button>
        </div>
    )
}

export default observer(RegistrationForm)
