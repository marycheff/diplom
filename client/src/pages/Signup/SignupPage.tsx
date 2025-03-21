import { Button } from "@/components/ui/Button"
import { PasswordInput, ValidatedInput } from "@/components/ui/Input"
import { useAuthStore } from "@/store/useAuthStore"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

type SignupFormData = {
    email: string
    password: string
}
const SignupPage = () => {
    const { registration, isLoading } = useAuthStore()

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm<SignupFormData>({
        mode: "onChange",
    })
    const onSubmit: SubmitHandler<SignupFormData> = async data => {
        await registration(data.email, data.password)
        toast.success("Успешная регистрация")
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ position: "relative" }}>
                <ValidatedInput
                    name="email"
                    register={register}
                    setValue={setValue}
                    errors={errors.email}
                    placeholder="Email"
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
                    placeholder="Пароль"
                />

                <Button type="submit" disabled={isLoading}>
                    Регистрация
                </Button>
                <div className="text-center">
                    <p className="text-base-content/60">
                        Уже зарегистрированы?{" "}
                        <Link to="/login" className="link link-primary">
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default SignupPage
