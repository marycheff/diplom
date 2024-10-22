import { observer } from "mobx-react-lite"
import { FC, useContext, useState } from "react"
import Loader from "../components/UI/loader/Loader"
import { Context } from "../main"

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { store } = useContext(Context)

    return (
        <div style={{ position: "relative" }}>
            <input onChange={e => setEmail(e.target.value)} value={email} type='text' placeholder='Email' />
            <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Пароль' />
            <button onClick={() => store.registration(email, password)} disabled={store.isLoading}>
                Регистрация
            </button>
             {/* Отображаем Loader, если isLoading true */}
        </div>
    )
}
export default observer(RegistrationForm)
