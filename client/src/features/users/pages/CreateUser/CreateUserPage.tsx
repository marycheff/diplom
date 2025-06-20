import { useUserStore } from "@/features/users/store/useUserStore"
import { ROUTES } from "@/router/paths"
import { useCache } from "@/shared/hooks/useCache"
import { CreateUserDTO, Role, UsersListDTO } from "@/shared/types"
import { emailValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import styles from "./CreateUserPage.module.scss"

interface CreateUserFormData {
	email: string
	password: string
	name: string
	surname: string
	patronymic: string
	role: Role
	isActivated: string
}

const CreateUserPage = () => {
	const navigate = useNavigate()
	const { createUser, isLoading } = useUserStore()
	const { clearCache } = useCache<UsersListDTO>(useUserStore, "users")

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
	} = useForm<CreateUserFormData>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
	})

	const onSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
		const userData: CreateUserDTO = {
			...data,
			isActivated: data.isActivated === "true",
		}
		await createUser(userData)
		toast.success("Пользователь успешно создан")
		clearCache()
		navigate(ROUTES.ADMIN_USERS)
	}

	const roleOptions = [
		{ value: "ADMIN", label: "Администратор" },
		{ value: "USER", label: "Пользователь" },
	]
	const activationOptions = [
		{ value: "true", label: "Активирован" },
		{ value: "false", label: "Не активирован" },
	]

	return (
		<div className={styles.pageWrapper}>
			<div className={styles.content}>
				<h1 className={styles.title}>Создание пользователя</h1>
				<div className={styles.container}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ValidatedInput
							trigger={trigger}
							clearable
							name="email"
							placeholder="Email"
							register={register}
							setValue={setValue}
							errors={errors.email}
							validationRules={emailValidationRules}
						/>

						<PasswordInput
							trigger={trigger}
							name="password"
							placeholder="Пароль"
							register={register}
							setValue={setValue}
							errors={errors.password}
						/>

						<ValidatedInput
							trigger={trigger}
							clearable
							name="name"
							placeholder="Имя"
							register={register}
							setValue={setValue}
							errors={errors.name}
						/>

						<ValidatedInput
							trigger={trigger}
							clearable
							name="surname"
							placeholder="Фамилия"
							register={register}
							setValue={setValue}
							errors={errors.surname}
						/>

						<ValidatedInput
							trigger={trigger}
							clearable
							name="patronymic"
							placeholder="Отчество"
							register={register}
							setValue={setValue}
							errors={errors.patronymic}
						/>

						<Select
							name="role"
							label="Роль"
							options={roleOptions}
							register={register}
							setValue={setValue}
							error={!!errors.role}
							required
							value="ADMIN"
						/>
						<Select
							name="isActivated"
							label="Активация аккаунта"
							options={activationOptions}
							register={register}
							setValue={setValue}
							error={!!errors.isActivated}
							value="true"
						/>

						<Button
							type="submit"
							disabled={isLoading}
						>
							Создать пользователя
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default CreateUserPage
