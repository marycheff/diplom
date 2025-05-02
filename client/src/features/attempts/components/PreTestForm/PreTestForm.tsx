import { PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import DateSelect from "@/shared/ui/DateSelect/DateSelect"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./PreTestForm.module.scss"

export type UserDataFormValues = {
    [key in PreTestUserData]?: string | number
} & {
    [key: `${string}_iso`]: string
}

interface PreTestFormProps {
    inputFields: string[]
    onSubmit: (data: Record<string, string | number>) => Promise<void>
    onCancel?: () => void
    isLoading?: boolean
}

export const PreTestForm = ({ inputFields, onSubmit, onCancel, isLoading = false }: PreTestFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control,
        trigger,
    } = useForm<UserDataFormValues>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
    })

    const handleFormSubmit: SubmitHandler<UserDataFormValues> = async data => {
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

        const mask =
            field === PreTestUserData.Phone
                ? "+7 (###) ###-##-##" 
                : undefined

        return (
            <ValidatedInput
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
                type={field === PreTestUserData.Age ? "number" : "text"}
                trigger={trigger}
            />
        )
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <h3 className={styles.formTitle}>Пожалуйста, заполните следующие поля:</h3>
            {inputFields.map(field => renderInput(field))}
            <div className={styles.formButtons}>
                <Button type="submit" disabled={isLoading}>
                    Начать тест
                </Button>
            </div>
        </form>
    )
}
