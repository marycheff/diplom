import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import DateSelect from "@/shared/ui/DateSelect/DateSelect"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { formatSpaces } from "@/shared/utils/formatter"
import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./PreTestForm.module.scss"

export type UserDataFormValues = {
	[key in PreTestUserData]?: string | number
} & {
	[key: `${string}_iso`]: string
}

interface PreTestFormProps {
	inputFields: PreTestUserData[]
	onSubmit: (data: Record<string, string | number>) => Promise<void>
	onCancel?: () => void
	isLoading?: boolean
}

export const PreTestForm = ({ inputFields, onSubmit, isLoading = false }: PreTestFormProps) => {
	const { user } = useAuthStore()

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		control,
		trigger,
	} = useForm<UserDataFormValues>({
		mode: "onChange",
		// reValidateMode: "onChange",
		// shouldFocusError: false,
	})
	
	// Заполнение полей формы данными пользователя, если они есть 
	useEffect(() => {
		if (!user) return

		const safeString = (value: string | null | undefined): string | undefined =>
			typeof value === "string" ? value : undefined

		const userFieldMap: Partial<Record<PreTestUserData, string | undefined>> = {
			[PreTestUserData.LastName]: safeString(user.surname),
			[PreTestUserData.FirstName]: safeString(user.name),
			[PreTestUserData.Patronymic]: safeString(user.patronymic),
			[PreTestUserData.Email]: safeString(user.email),
		}

		inputFields.forEach((field) => {
			const value = userFieldMap[field as PreTestUserData]
			if (value) {
				setValue(field as keyof UserDataFormValues, value)
			}
		})
	}, [user, inputFields, setValue])

	const handleFormSubmit: SubmitHandler<UserDataFormValues> = async (data) => {
		const userData = Object.entries(data).reduce((acc, [key, value]) => {
			if (key.endsWith("_day") || key.endsWith("_month") || key.endsWith("_year")) {
				return acc
			}
			if (key === PreTestUserData.Age && typeof value === "string") {
				const ageValue = parseInt(value)
				if (!isNaN(ageValue)) {
					acc[key] = ageValue
				}
			} else if (key === PreTestUserData.Phone && typeof value === "string") {
				acc[key] = value
			} else if (key === PreTestUserData.BirthDate && typeof value === "string") {
				acc[key] = value
				if (data[`${key}_iso`]) {
					acc[`${key}_iso`] = data[`${key}_iso`]
				}
			} else {
				const formatted = typeof value === "string" ? formatSpaces(value) : value
				if (formatted && formatted !== "") {
					acc[key] = formatted
				}
			}
			return acc
		}, {} as Record<string, string | number>)
		await onSubmit(userData)
	}

	const getFieldValidationRules = (field: string) => {
		const baseRule = {
			required: `Поле "${PreTestUserDataLabels[field as PreTestUserData]}" обязательно для заполнения`,
		}

		switch (field) {
			case PreTestUserData.Age:
				return {
					...baseRule,
					pattern: {
						value: /^[0-9]+$/,
						message: "Возраст должен быть числом",
					},
					min: {
						value: 1,
						message: "Возраст должен быть положительным числом",
					},
					max: {
						value: 120,
						message: "Возраст не может быть больше 120",
					},
				}
			case PreTestUserData.Phone:
				return {
					...baseRule,
					pattern: {
						value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
						message: "Телефон должен быть в формате +7 (999) 999-99-99",
					},
				}
			case PreTestUserData.School: {
				return {
					...baseRule,
					pattern: {
						value: /^[0-9]+$/,
						message: "Номер школы должна содержать только цифры",
					},
					min: {
						value: 1,
						message: "Номер школы должен быть положительным числом",
					},
				}
			}
			case PreTestUserData.Email:
				return {
					...baseRule,
					pattern: {
						value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
						message: "Некорректный адрес электронной почты",
					},
				}
			default:
				return baseRule
		}
	}

	const renderInput = (field: string) => {
		if (field === PreTestUserData.BirthDate) {
			return (
				<DateSelect
					key={field}
					name={field}
					register={register}
					setValue={setValue}
					trigger={trigger}
					error={!!errors[field as PreTestUserData]}
					required={true}
					label={PreTestUserDataLabels[field as PreTestUserData]}
				/>
			)
		}
		if (field === PreTestUserData.Gender) {
			return (
				<Select
					key={field}
					name={field}
					register={register}
					error={!!errors[field as PreTestUserData]}
					required={true}
					label={PreTestUserDataLabels[field as PreTestUserData]}
					options={[
						{ value: "male", label: "Мужской" },
						{ value: "female", label: "Женский" },
					]}
				/>
			)
		}

		const mask = field === PreTestUserData.Phone ? "+7 (###) ###-##-##" : undefined

		return (
			<ValidatedInput
				clearable
				key={field}
				name={field}
				placeholder={PreTestUserDataLabels[field as PreTestUserData]}
				register={register}
				setValue={setValue}
				errors={errors[field as PreTestUserData]}
				validationRules={getFieldValidationRules(field)}
				mask={mask}
				maskChar="_"
				control={control}
				type={field === PreTestUserData.Age || field === PreTestUserData.School ? "number" : "text"}
				trigger={trigger}
			/>
		)
	}

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className={styles.form}
		>
			<h3 className={styles.formTitle}>Пожалуйста, заполните следующие поля:</h3>
			{inputFields.map((field) => renderInput(field))}
			<div className={styles.formButtons}>
				<Button
					type="submit"
					disabled={isLoading || !isValid}
				>
					Начать тест
				</Button>
			</div>
		</form>
	)
}
