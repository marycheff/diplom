import { observer } from "mobx-react-lite"
import React, { useContext, useState } from "react"
import { Context } from ".."

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isCodeVerified, setIsCodeVerified] = useState(false)
    const { store } = useContext(Context)
    const handleSendCode = async () => {
        try {
          //  await store.sendResetCode(email)
            setIsCodeSent(true)
            alert("Код отправлен на ваш email")
        } catch (error) {
            alert("Ошибка при отправке кода")
        }
    }

    const handleVerifyCode = async () => {
        try {
          await store.verifyResetCode(email, code)
            setIsCodeVerified(true)
            alert("Код подтвержден, введите новый пароль")
        } catch (error) {
            alert("Ошибка при подтверждении кода")
        }
    }

    const handleResetPassword = async () => {
        try {
           // await store.resetPassword(email, newPassword)
            alert("Пароль успешно изменен")
        } catch (error) {
            alert("Ошибка при сбросе пароля")
        }
    }

    return (
        <div>
            <h2>Сброс пароля</h2>
            {!isCodeSent ? (
                <div>
                    <input
                        type='email'
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendCode}>Отправить код</button>
                </div>
            ) : !isCodeVerified ? (
                <div>
                    <input type='text' placeholder='Введите код' value={code} onChange={e => setCode(e.target.value)} />
                    <button onClick={handleVerifyCode}>Подтвердить код</button>
                </div>
            ) : (
                <div>
                    <input
                        type='password'
                        placeholder='Введите новый пароль'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword}>Сбросить пароль</button>
                </div>
            )}
        </div>
    )
}

export default observer(ResetPasswordForm)
