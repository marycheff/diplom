import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useResetPasswordStore } from "@/features/auth/store/useResetPasswordStore"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

interface EmailFormData {
    email: string
}

interface CodeFormData {
    reset_code: string
}

interface ResetPasswordFormData {
    newPassword: string
}

const ResetPasswordForm: FC = () => {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [isCodeVerified, setIsCodeVerified] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(0)

    const { isLoading, requestResetCode, verifyResetCode, resetPassword } = useResetPasswordStore()
    const { login } = useAuthStore()

    const {
        register: registerPassword,
        formState: { errors: passwordErrors },
        setValue: setPasswordValue,
        handleSubmit: handlePasswordSubmit,
    } = useForm<ResetPasswordFormData>({
        mode: "onChange",
    })

    const {
        register: registerEmail,
        formState: { errors: emailErrors },
        setValue: setEmailValue,
        handleSubmit: handleEmailSubmit,
        reset: emailReset,
    } = useForm<EmailFormData>({
        mode: "onChange",
    })

    const {
        register: registerCode,
        formState: { errors: codeErrors },
        setValue: setCodeValue,
        handleSubmit: handleCodeSubmit,
    } = useForm<CodeFormData>({
        mode: "onChange",
    })

    // Таймер для блокировки кнопки повторной отправки
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (secondsLeft > 0) {
            timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000)
        }
        return () => clearTimeout(timer)
    }, [secondsLeft])

    const onEmailSubmit: SubmitHandler<EmailFormData> = async data => {
        setEmail(data.email)
        await requestResetCode(data.email)
        setIsCodeSent(true)
        setSecondsLeft(60) // Запуск таймера на 1 минуту
        toast.success("Код отправлен на ваш email")
        emailReset()
    }

    const onCodeSubmit: SubmitHandler<CodeFormData> = async data => {
        setCode(data.reset_code)
        await verifyResetCode(email, data.reset_code)
        setIsCodeVerified(true)
        toast.success("Код подтвержден, введите новый пароль")
    }

    const handleSendCode = async () => {
        await requestResetCode(email)
        setSecondsLeft(60) // Запуск таймера на 1 минуту
        toast.success("Код отправлен на ваш email")
    }

    const onPasswordSubmit: SubmitHandler<ResetPasswordFormData> = async data => {
        await resetPassword(email, code, data.newPassword)
        toast.success("Пароль успешно изменен")
        await login(email, data.newPassword)
    }

    return (
        <div>
            <h2>Сброс пароля</h2>
            {!isCodeSent ? (
                <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
                    <ValidatedInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        register={registerEmail}
                        setValue={setEmailValue}
                        errors={emailErrors.email}
                        validationRules={{
                            required: "Email обязателен",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Введите корректный email",
                            },
                        }}
                    />
                    <Button type="submit" disabled={isLoading || secondsLeft > 0}>
                        Отправить код
                    </Button>
                </form>
            ) : !isCodeVerified ? (
                <form onSubmit={handleCodeSubmit(onCodeSubmit)}>
                    <ValidatedInput
                        name="reset_code"
                        placeholder="Код с email"
                        register={registerCode}
                        setValue={setCodeValue}
                        errors={codeErrors.reset_code}
                        validationRules={{
                            required: "Код подтверждения обязателен",
                            pattern: {
                                value: /^[0-9]+$/,
                                message: "Код должен содержать только цифры",
                            },
                        }}
                    />
                    <Button type="button" onClick={handleSendCode} disabled={secondsLeft > 0 || isLoading}>
                        {secondsLeft > 0 ? `Запросить новый (${secondsLeft})` : "Запросить новый"}
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        Подтвердить код
                    </Button>
                </form>
            ) : (
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)}>
                    <PasswordInput
                        name="newPassword"
                        register={registerPassword}
                        setValue={setPasswordValue}
                        errors={passwordErrors.newPassword}
                        placeholder="Новый пароль"
                    />
                    <Button type="submit" disabled={isLoading}>
                        Сбросить пароль
                    </Button>
                </form>
            )}
        </div>
    )
}

export default ResetPasswordForm
