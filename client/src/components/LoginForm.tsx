import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Context } from ".."

const LoginForm: React.FC = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const { store } = useContext(Context)
    return (
        <div>
            <input onChange={e => setEmail(e.target.value)} type='text' value={email} placeholder='Email' />
            <input
                onChange={e => setPassword(e.target.value)}
                type='password'
                value={password}
                placeholder='Password'
            />

            <button onClick={() => store.login(email, password)}> Логин </button>
            <button onClick={() => store.registration(email, password)}> Регистрация </button>
        </div>
    )
}

export default observer(LoginForm)
