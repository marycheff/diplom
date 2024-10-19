import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useState } from "react"
import { Context } from "../main"

const ResetPasswordForm: React.FC = () => {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isCodeVerified, setIsCodeVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false) // Состояние ошибки
    const [secondsLeft, setSecondsLeft] = useState(0) // Таймер для блокировки кнопки повторной отправки
    const { store } = useContext(Context)

    // Таймер
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (secondsLeft > 0) {
            timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [secondsLeft])

    const handleSendCode = async () => {
        try {
            setIsLoading(true)
            await store.requestResetCode(email)
            setIsCodeSent(true)
            setHasError(false)
            setSecondsLeft(60) // Запуск таймера на 1 минуту
            console.log("Код отправлен на ваш email")
        } catch (error) {
            console.log("Ошибка при отправке кода")
            setHasError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const handleVerifyCode = async () => {
        try {
            setIsLoading(true)
            await store.verifyResetCode(email, code)
            setIsCodeVerified(true)
            setHasError(false)
            console.log("Код подтвержден, введите новый пароль")
        } catch (error: any) {
            console.log(error.response?.data?.message || "Ошибка при подтверждении кода сброса пароля")
            // setHasError(true) // Устанавливаем флаг ошибки
            //setIsCodeSent(false)
            setIsCodeVerified(false)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResetPassword = async () => {
        try {
            setIsLoading(true)
            await store.resetPassword(email, code, newPassword)
            setHasError(false)
            alert("Пароль успешно изменен")
            store.login(email, newPassword)
        } catch (error: any) {
            console.log(error.response?.data?.message || "Ошибка при сбросе пароля")
            setIsCodeSent(false)
            setIsCodeVerified(false)
            setHasError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <h2>Сброс пароля</h2>
            {!isCodeSent || hasError ? (
                <div>
                    <input
                        type='email'
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button onClick={handleSendCode} disabled={isLoading || secondsLeft > 0}>
                        {isLoading ? "Загрузка..." : "Отправить код"}
                    </button>
                </div>
            ) : !isCodeVerified ? (
                <div>
                    <input type='text' placeholder='Введите код' value={code} onChange={e => setCode(e.target.value)} />
                    <button onClick={handleSendCode} disabled={secondsLeft > 0}>
                        {secondsLeft > 0 ? `Запросить новый (${secondsLeft})` : "Запросить новый"}
                    </button>
                    <button onClick={handleVerifyCode} disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Подтвердить код"}
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        type='password'
                        placeholder='Введите новый пароль'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <button onClick={handleResetPassword} disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Сбросить пароль"}
                    </button>
                </div>
            )}
        </div>
    )
}

export default observer(ResetPasswordForm)
