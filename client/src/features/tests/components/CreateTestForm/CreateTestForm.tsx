import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { useTestStore } from "@/features/tests/store/useTestStore"
import { ROUTES } from "@/router/paths"
import { ShortTestInfo } from "@/shared/types"
import { testDescriptionValidationRules, testTitleValidationRules } from "@/shared/types/utils/validationRules"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { generatePath, useNavigate } from "react-router-dom"
import styles from "./CreateTestForm.module.scss"

const CreateTestForm = () => {
    const navigate = useNavigate()
    const { isLoading, createTest } = useTestStore()
    const {isAdmin } = useAuthStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        watch,
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
    const title = watch("title")

    return (
        <>
            <h1 className={styles.title}>Создание теста</h1>
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
                        validationRules={testTitleValidationRules}
                    />

                    <ValidatedInput
                        name="description"
                        multiline
                        trigger={trigger}
                        errors={errors.description}
                        placeholder="Описание"
                        register={register}
                        setValue={setValue}
                        validationRules={testDescriptionValidationRules}
                    />

                    <Button type="submit" disabled={isLoading || !title}>
                        Создать тест
                    </Button>
                </form>
            </div>
        </>
    )
}

export default CreateTestForm
