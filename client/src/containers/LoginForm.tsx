import { observer } from "mobx-react-lite"
import { FC, useContext, useState } from "react"
import { Context } from "../main"
import { useAuthStore } from "@/store/useAuthStore"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { store } = useContext(Context)
    const {login} = useAuthStore()
    

    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} value={email} type='text' placeholder='Email' />
            <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Пароль' />
            {/* <button onClick={() => store.login(email, password)}>Вход</button> */}
            <button onClick={() => login(email, password)}>Вход</button>
        </div>
    )
}

export default observer(LoginForm)
