import { Button } from "@/components/ui/Button"
import { PasswordInput } from "@/components/ui/Input"
import { useAuthStore } from "@/store/useAuthStore"
import { useUserStore } from "@/store/useUserStore"
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
                <Button type="submit" isLoading={isLoading}>
                    Обновить пароль
                </Button>
            </form>
        </div>
    )
}

export default UpdatePasswordForm
