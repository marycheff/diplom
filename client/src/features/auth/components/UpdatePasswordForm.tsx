import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { Button } from "@/shared/ui/Button"
import { PasswordInput } from "@/shared/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import styles from "./UpdatePasswordForm.module.scss"

export type ChangePasswordFormData = {
    oldPassword: string
    newPassword: string
}

const UpdatePasswordForm = () => {
    const { user } = useAuthStore()
    const { updatePassword, isLoading } = useUserStore()

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
        trigger
    } = useForm<ChangePasswordFormData>({
        mode: "onBlur",
    })

    const onSubmit: SubmitHandler<ChangePasswordFormData> = async data => {
        await updatePassword(user?.email!, data.oldPassword, data.newPassword)
        toast.success("Пароль успешно изменен")
    }

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    name="oldPassword"
                    register={register}
                    setValue={setValue}
                    errors={errors.oldPassword}
                    label="Старый пароль"
                    noValidation
                    trigger={trigger}
                />

                <PasswordInput
                    name="newPassword"
                    register={register}
                    setValue={setValue}
                    errors={errors.newPassword}
                    label="Новый пароль"
                    trigger={trigger}
                />
                <Button type="submit" disabled={isLoading} className={styles.updateBtn}>
                    Обновить пароль
                </Button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm
