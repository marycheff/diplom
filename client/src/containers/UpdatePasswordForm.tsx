import { useContext, useState } from "react"

const UpdatePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    return (
        <div>
            <h1>Обновить пароль</h1>
            <input
                onChange={e => setOldPassword(e.target.value)}
                value={oldPassword}
                type="password"
                placeholder="Старый пароль"
            />
            <input
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                type="password"
                placeholder="Новый пароль"
            />

            {/* <button onClick={() => store.updatePassword(store.user.email, oldPassword, newPassword)}>
                Обновить пароль
            </button> */}
        </div>
    )
}

export default UpdatePasswordForm
