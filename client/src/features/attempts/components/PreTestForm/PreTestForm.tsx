import { PreTestUserData, PreTestUserDataLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./PreTestForm.module.scss"

export type UserDataFormValues = {
    [key in PreTestUserData]?: string
}

interface PreTestFormProps {
    inputFields: string[]
    onSubmit: (data: Record<string, string>) => Promise<void>
    onCancel?: () => void
    isLoading?: boolean
}

export const PreTestForm = ({ inputFields, onSubmit, onCancel, isLoading = false }: PreTestFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UserDataFormValues>({
        mode: "onChange",
    })

    const handleFormSubmit: SubmitHandler<UserDataFormValues> = async data => {
        const userData = Object.entries(data).reduce((acc, [key, value]) => {
            const formatted = typeof value === "string" ? formatSpaces(value) : value

            if (formatted && formatted !== "") {
                acc[key] = formatted
            }

            return acc
        }, {} as Record<string, string>)

        await onSubmit(userData)
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
            <h3 className={styles.formTitle}>Пожалуйста, заполните следующие поля:</h3>
            {inputFields.map(field => (
                <ValidatedInput
                    key={field}
                    name={field}
                    placeholder={PreTestUserDataLabels[field as PreTestUserData]}
                    register={register}
                    setValue={setValue}
                    errors={errors[field as PreTestUserData]}
                    validationRules={{
                        required: `Поле "${
                            PreTestUserDataLabels[field as PreTestUserData]
                        }" обязательно для заполнения`,
                    }}
                />
            ))}

            <div className={styles.formButtons}>
                <Button type="submit" disabled={isLoading}>
                    Начать тест
                </Button>
            </div>
        </form>
    )
}
