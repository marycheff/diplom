import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
import { useState } from "react"

const UpdatePasswordForm = () => {
    const [oldPassword, setOldPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const { user } = useAuthStore()
    const { updatePassword, isLoading } = useUserStore()
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

            <button onClick={() => updatePassword(user?.email!, oldPassword, newPassword)} disabled={isLoading}>
                Обновить пароль
            </button>
        </div>
    )
}

export default UpdatePasswordForm
