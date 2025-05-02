import { PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./PreTestForm.module.scss"

export type UserDataFormValues = {
    [key in PreTestUserData]?: string | number
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
            if (key === PreTestUserData.Age && typeof value === "string") {
                const ageValue = parseInt(value)
                if (!isNaN(ageValue)) {
                    acc[key] = ageValue
                }
            } else if (key === PreTestUserData.Phone && typeof value === "string") {
                acc[key] = value
            } else if (key === PreTestUserData.BirthDate && typeof value === "string") {
                acc[key] = value
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
            case PreTestUserData.BirthDate:
                return {
                    ...baseRule,
                    pattern: {
                        value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/,
                        message: "Дата должна быть в формате дд.мм.гггг",
                    },
                }
            default:
                return baseRule
        }
    }

    const renderInput = (field: string) => {
        const mask =
            field === PreTestUserData.Phone
                ? "+7 (###) ###-##-##" // Используем # вместо 9
                : field === PreTestUserData.BirthDate
                ? "##.##.####" // Используем # вместо 9
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
