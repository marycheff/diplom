import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useResetPasswordStore } from "@/features/auth/store/useResetPasswordStore"
import { emailValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import styles from "./ResetPasswordForm.module.scss"
interface ResetPasswordFormProps {
	initialEmail?: string
}

interface FormData {
	email: string
	reset_code: string
	newPassword: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ initialEmail }) => {
	const [step, setStep] = useState<"email" | "code" | "password">("email")
	const [secondsLeft, setSecondsLeft] = useState(0)

	const { isLoading, requestResetCode, verifyResetCode, resetPassword } = useResetPasswordStore()
	const { login } = useAuthStore()

	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		formState: { errors },
		getValues,
		reset,
	} = useForm<FormData>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
		defaultValues: {
			email: initialEmail || "",
			reset_code: "",
			newPassword: "",
		},
	})

	// Вставка initialEmail в поле
	useEffect(() => {
		if (initialEmail) {
			setValue("email", initialEmail)
		}
	}, [initialEmail, setValue])

	// Таймер запроса кода
	useEffect(() => {
		let timer: NodeJS.Timeout
		if (secondsLeft > 0) {
			timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000)
		}
		return () => clearTimeout(timer)
	}, [secondsLeft])

	const onEmailSubmit: SubmitHandler<FormData> = async ({ email }) => {
		await requestResetCode(email)
		setSecondsLeft(60)
		setStep("code")
		toast.success("Код отправлен на ваш email")
	}

	const onCodeSubmit: SubmitHandler<FormData> = async ({ email, reset_code }) => {
		await verifyResetCode(email, reset_code)
		setStep("password")
		toast.success("Код подтвержден")
	}

	const onPasswordSubmit: SubmitHandler<FormData> = async ({ email, reset_code, newPassword }) => {
		await resetPassword(email, reset_code, newPassword)
		toast.success("Пароль успешно изменен")
		await login(email, newPassword)
		reset()
	}

	const handleResendCode = async () => {
		const email = getValues("email")
		await requestResetCode(email)
		setSecondsLeft(60)
		toast.success("Код повторно отправлен")
	}

	return (
		<div>
			<h2 className={styles.title}>Сброс пароля</h2>
			{step === "email" && (
				<form onSubmit={handleSubmit(onEmailSubmit)}>
					<ValidatedInput
						name="email"
						type="email"
						placeholder="Email"
						register={register}
						setValue={setValue}
						trigger={trigger}
						errors={errors.email}
						validationRules={emailValidationRules}
					/>
					<Button
						type="submit"
						disabled={isLoading || secondsLeft > 0}
					>
						Отправить код
					</Button>
				</form>
			)}

			{step === "code" && (
				<form onSubmit={handleSubmit(onCodeSubmit)}>
					<ValidatedInput
						name="reset_code"
						placeholder="Код с email"
						register={register}
						setValue={setValue}
						trigger={trigger}
						errors={errors.reset_code}
						validationRules={{
							required: "Код подтверждения обязателен",
							pattern: {
								value: /^[0-9]+$/,
								message: "Код должен содержать только цифры",
							},
						}}
					/>
					<Button
						type="button"
						onClick={handleResendCode}
						disabled={secondsLeft > 0 || isLoading}
					>
						{secondsLeft > 0 ? `Запросить новый (${secondsLeft})` : "Запросить новый"}
					</Button>
					<Button
						type="submit"
						disabled={isLoading}
					>
						Подтвердить код
					</Button>
				</form>
			)}

			{step === "password" && (
				<form onSubmit={handleSubmit(onPasswordSubmit)}>
					<PasswordInput
						name="newPassword"
						register={register}
						setValue={setValue}
						trigger={trigger}
						errors={errors.newPassword}
						placeholder="Новый пароль"
					/>
					<Button
						type="submit"
						disabled={isLoading}
					>
						Сбросить пароль
					</Button>
				</form>
			)}
		</div>
	)
}

export default ResetPasswordForm
