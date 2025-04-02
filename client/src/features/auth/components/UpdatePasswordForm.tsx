import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useUserStore } from "@/features/users/store/useUserStore"
import { Button } from "@/shared/ui/Button"
import { PasswordInput } from "@/shared/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"

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
    } = useForm<ChangePasswordFormData>({
        mode: "onChange",
    })

    const onSubmit: SubmitHandler<ChangePasswordFormData> = async data => {
        await updatePassword(user?.email!, data.oldPassword, data.newPassword)
        toast.success("Пароль успешно изменен")
    }

    return (
        <div>
            <h1>Обновить пароль</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    name="oldPassword"
                    register={register}
                    setValue={setValue}
                    errors={errors.oldPassword}
                    placeholder="Старый пароль"
                    noValidation
                />
                <PasswordInput
                    name="newPassword"
                    register={register}
                    setValue={setValue}
                    errors={errors.newPassword}
                    placeholder="Новый пароль"
                />
                <Button type="submit" disabled={isLoading}>
                    Обновить пароль
                </Button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm
