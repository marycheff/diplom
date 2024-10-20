import { FC, useContext, useState } from "react"
import { Context } from "../main"
import { observer } from "mobx-react-lite"

const UpdatePasswordForm: FC = () => {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const { store } = useContext(Context)
    return (
        <div>
            <h1>Обновить пароль</h1>
            <input
                onChange={e => setOldPassword(e.target.value)}
                value={oldPassword}
                type='password'
                placeholder='Старый пароль'
            />
            <input
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                type='password'
                placeholder='Новый пароль'
            />

            <button onClick={() => store.updatePassword(store.user.email, oldPassword, newPassword)}>
                Обновить пароль
            </button>
        </div>
    )
}

export default observer(UpdatePasswordForm)
