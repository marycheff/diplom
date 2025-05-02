import { useTestStore } from "@/features/tests/store/useTestStore"
import { ShortTestInfo } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const CreateTestPage = () => {
    const navigate = useNavigate()

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
        const response = await createTest(data.title, data.description)
        toast.success(`Тест создан`)
        navigate(`/my-tests/${response?.id}`)
        // navigate(`my-tests/67e9953cf7dfc4b51139e478`)
    }

    return (
        <div>
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
    )
}

export default CreateTestPage
