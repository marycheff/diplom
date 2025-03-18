import { Button } from "@/components/ui/Button/Button"
import Input from "@/components/ui/Input/Input"
import ResetPasswordForm from "@/containers/ResetPasswordForm"
import { useAuthStore } from "@/store/useAuthStore"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

// Тип данных формы
type LoginFormData = {
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
        // mode: "onBlur", 
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
                <Input
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
                <Input
                    clearable
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    register={register} 
                    setValue={setValue} 
                    errors={errors.password}
                    validationRules={{
                        required: "Пароль обязателен",
                        minLength: {
                            value: 3,
                            message: "Пароль должен содержать минимум 3 символа",
                        },
                        maxLength: {
                            value: 32,
                            message: "Пароль не должен превышать 32 символа",
                        },
                    }}
                />
                <Button type="submit" isLoading={isLoading}>
                    Вход
                </Button>
            </form>
            <div className="">
                <p className="">
                    Нет аккаунта?{" "}
                    <Link to="/signup" className="">
                        Зарегистрироваться
                    </Link>
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
