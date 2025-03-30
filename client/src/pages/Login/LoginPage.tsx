import { Button } from "@/components/ui/Button"
import { PasswordInput, ValidatedInput } from "@/components/ui/Input"
import ResetPasswordForm from "@/containers/ResetPasswordForm"
import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export type LoginFormData = {
    email: string
    password: string
}

const LoginPage = () => {
    const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
    const { login, isLoading } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<LoginFormData>({
        mode: "onChange",
    })

    const handleResetPasswordClick = () => {
        setIsResetPasswordVisible(true)
    }

    const onSubmit: SubmitHandler<LoginFormData> = async data => {
        await login(data.email, data.password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ValidatedInput
                    clearable
                    name="email"
                    placeholder="Email"
                    register={register}
                    setValue={setValue}
                    errors={errors.email}
                    validationRules={{
                        required: "Email обязателен",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Введите корректный email",
                        },
                    }}
                />
                <PasswordInput
                    name="password"
                    register={register}
                    setValue={setValue}
                    errors={errors.password}
                    noValidation
                />
                <Button type="submit" disabled={isLoading}>
                    Вход
                </Button>
            </form>
            <div>
                <p>
                    Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
                </p>
            </div>
            {!isResetPasswordVisible && (
                <p
                    style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                    onClick={handleResetPasswordClick}>
                    Забыли пароль?
                </p>
            )}
            {isResetPasswordVisible && <ResetPasswordForm />}
        </div>
    )
}

export default LoginPage
