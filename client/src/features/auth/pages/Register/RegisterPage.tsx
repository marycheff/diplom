import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { emailValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import styles from "./RegisterPage.module.scss"
type Register = {
    email: string
    password: string
    confirmPassword: string
}
const RegisterPage = () => {
    const { registration, isLoading } = useAuthStore()
    const navigate = useNavigate()

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        trigger,
    } = useForm<Register>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
    })
    const onSubmit: SubmitHandler<Register> = async data => {
        if (data.password !== data.confirmPassword) {
            toast.error("Пароли не совпадают")
            return
        }
        await registration(data.email, data.password)
        toast.success("Успешная регистрация")
        navigate(ROUTES.HOME)
    }
    return (
        <div className={styles.registerContainer}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ValidatedInput
                        name="email"
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                        errors={errors.email}
                        placeholder="Email"
                        validationRules={emailValidationRules}
                    />
                    <PasswordInput
                        name="password"
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                        errors={errors.password}
                        placeholder="Пароль"
                    />
                    <PasswordInput
                        name="confirmPassword"
                        register={register}
                        setValue={setValue}
                        trigger={trigger}
                        errors={errors.confirmPassword}
                        placeholder="Подтверждение пароля"
                    />
                    <Button type="submit" disabled={isLoading}>
                        Регистрация
                    </Button>
                </form>
                <div className={styles.loginLink}>
                    <p>
                        Уже зарегистрированы? <Link to={ROUTES.LOGIN}>Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
