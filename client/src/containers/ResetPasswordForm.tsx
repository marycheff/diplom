import { Button } from "@/components/ui/Button/Button"
import { useAuthStore } from "@/store/useAuthStore"
import { useResetPasswordStore } from "@/store/useResetPasswordStore"
import { FC, useEffect, useState } from "react"
import toast from "react-hot-toast"

const ResetPasswordForm: FC = () => {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isCodeVerified, setIsCodeVerified] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(0)

    const { isLoading, requestResetCode, verifyResetCode, resetPassword } = useResetPasswordStore()
    const { login } = useAuthStore()

    // Таймер для блокировки кнопки повторной отправки
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (secondsLeft > 0) {
            timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [secondsLeft])

    const handleSendCode = async () => {
        await requestResetCode(email)
        setIsCodeSent(true)
        setSecondsLeft(60) // Запуск таймера на 1 минуту
        toast.success("Код отправлен на ваш email")
    }

    const handleVerifyCode = async () => {
        await verifyResetCode(email, code)
        setIsCodeVerified(true)
        toast.success("Код подтвержден, введите новый пароль")
    }

    const handleResetPassword = async () => {
        await resetPassword(email, code, newPassword)
        toast.success("Пароль успешно изменен")
        await login(email, newPassword)
    }

    return (
        <div>
            <h2>Сброс пароля</h2>
            {!isCodeSent ? (
                <div>
                    <input
                        type="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSendCode} disabled={isLoading || secondsLeft > 0}>
                        {isLoading ? "Загрузка..." : "Отправить код"}
                    </Button>
                </div>
            ) : !isCodeVerified ? (
                <div>
                    <input type="text" placeholder="Введите код" value={code} onChange={e => setCode(e.target.value)} />
                    <Button onClick={handleSendCode} disabled={secondsLeft > 0}>
                        {secondsLeft > 0 ? `Запросить новый (${secondsLeft})` : "Запросить новый"}
                    </Button>
                    <Button onClick={handleVerifyCode} disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Подтвердить код"}
                    </Button>
                </div>
            ) : (
                <div>
                    <input
                        type="password"
                        placeholder="Введите новый пароль"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <Button onClick={handleResetPassword} disabled={isLoading}>
                        {isLoading ? "Загрузка..." : "Сбросить пароль"}
                    </Button>
                </div>
            )}
        </div>
    )
}

export default ResetPasswordForm
