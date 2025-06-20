import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import Header from "@/shared/components/Header/Header"
import { emailValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import styles from "./LoginPage.module.scss"

export type LoginFormData = {
	email: string
	password: string
}

const LoginPage = () => {
	const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
	const { login, isLoading } = useAuthStore()
	const navigate = useNavigate()
	const [searchParams] = useState(new URLSearchParams(window.location.search))

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
		watch,
	} = useForm<LoginFormData>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
	})

	const handleResetPasswordClick = () => {
		setIsResetPasswordVisible(true)
	}

	const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
		await login(data.email, data.password)
		const returnUrl = searchParams.get("returnUrl")
		navigate(returnUrl || ROUTES.HOME)
	}
	const email = watch("email")

	return (
		<div className={styles.pageWrapper}>
			<Header />
			<div className={styles.loginContainer}>
				<div className={styles.formWrapper}>
					<h2 className={styles.title}>Авторизация</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ValidatedInput
							clearable
							name="email"
							placeholder="Email"
							register={register}
							setValue={setValue}
							errors={errors.email}
							trigger={trigger}
							validationRules={emailValidationRules}
						/>
						<PasswordInput
							name="password"
							register={register}
							setValue={setValue}
							errors={errors.password}
							placeholder="Пароль"
							trigger={trigger}
							noValidation
						/>
						<Button
							type="submit"
							disabled={isLoading}
						>
							Вход
						</Button>
					</form>

					<div className={styles.registerLink}>
						<p>
							Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегистрироваться</Link>
						</p>
					</div>

					{!isResetPasswordVisible && (
						<div className={styles.resetPassword}>
							<button
								onClick={handleResetPasswordClick}
								className={styles.resetPasswordBtn}
							>
								Забыли пароль?
							</button>
						</div>
					)}

					{isResetPasswordVisible && (
						<div className={styles.resetPasswordForm}>
							<ResetPasswordForm initialEmail={email} />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default LoginPage
