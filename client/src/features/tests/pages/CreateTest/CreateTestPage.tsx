import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import { ShortTestInfo } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { generatePath, Link, useNavigate } from "react-router-dom"
import styles from "./CreateTestPage.module.scss"

const CreateTestPage = () => {
    const navigate = useNavigate()
    const { user, isAdmin } = useAuthStore()

    const { isLoading, createTest } = useTestStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
    } = useForm<ShortTestInfo>({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: false,
    })

    const onSubmit: SubmitHandler<ShortTestInfo> = async data => {
        const response = await createTest(formatSpaces(data.title), formatSpaces(data.description))
        toast.success(`Тест создан`)
        isAdmin
            ? navigate(generatePath(ROUTES.ADMIN_MY_TEST_INFO, { testId: response?.id }))
            : navigate(generatePath(ROUTES.MY_TEST_INFO, { testId: response?.id }))
    }

    if (!user?.isActivated) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                            />
                        </svg>
                    </div>
                    <h2 className={styles.heading}>Активируйте аккаунт</h2>
                    <p className={styles.text}>
                        Перед созданием теста необходимо подтвердить вашу электронную почту. Проверьте почтовый ящик,
                        указанный при регистрации, или{" "}
                        <Link to={ROUTES.PROFILE} className="actionLink">
                            перейдите в профиль,
                        </Link>{" "}
                        чтобы отправить письмо с подтверждением повторно.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ValidatedInput
                        trigger={trigger}
                        clearable
                        name="title"
                        placeholder="Название (обязательно)"
                        register={register}
                        setValue={setValue}
                        errors={errors.title}
                        validationRules={{
                            required: "Название теста обязательно",
                        }}
                    />
                    <ValidatedInput
                        name="description"
                        multiline
                        clearable
                        trigger={trigger}
                        errors={errors.description}
                        placeholder="Описание"
                        register={register}
                        setValue={setValue}
                    />
                    <Button type="submit" disabled={isLoading}>
                        Создать тест
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateTestPage
