import { useUserStore } from "@/features/users/store/useUserStore"
import { Button } from "@/shared/ui/Button"
import { PasswordInput, ValidatedInput } from "@/shared/ui/Input"

import { ROUTES } from "@/router/paths"
import { useCache } from "@/shared/hooks/useCache"
import { CreateUserDTO, UsersListDTO } from "@/shared/types"
import { emailValidationRules } from "@/shared/types/utils/validationRules"
import Select from "@/shared/ui/Select/Select"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import styles from "./CreateUserPage.module.scss"

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
	} = useForm<CreateUserDTO>({
		mode: "onBlur",
		reValidateMode: "onChange",
		shouldFocusError: false,
	})

	const onSubmit: SubmitHandler<CreateUserDTO> = async (data) => {
		await createUser(data)
		toast.success("Пользователь успешно создан")
		clearCache()
		navigate(ROUTES.ADMIN_USERS)
	}

	const roleOptions = [
		{ value: "ADMIN", label: "Администратор" },
		{ value: "USER", label: "Пользователь" },
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
							label="Роль пользователя"
							options={roleOptions}
							register={register}
							error={!!errors.role}
							required
							value="ADMIN"
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
