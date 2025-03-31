import TestForm from "@/components/shared/TestForm"
import { Button } from "@/components/ui/Button"
import { ValidatedInput } from "@/components/ui/Input"
import { useTestStore } from "@/store/useTestStore"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const CreateTestPage = () => {
    const navigate = useNavigate()
    interface CreateTestData {
        title: string
        description?: string
    }
    const { isLoading, createTest } = useTestStore()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<CreateTestData>({
        mode: "onChange",
    })
    const onSubmit: SubmitHandler<CreateTestData> = async data => {
        const response = await createTest(data.title, data.description)
        toast.success(`Тест создан`)
        navigate(`/my-tests/${response?.id}`)
        // navigate(`my-tests/67e9953cf7dfc4b51139e478`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ValidatedInput
                    clearable
                    name="title"
                    placeholder="*Название"
                    register={register}
                    setValue={setValue}
                    errors={errors.title}
                    validationRules={{
                        required: "Название теста обязательно",
                    }}
                />
                <ValidatedInput name="description" placeholder="Описание" register={register} setValue={setValue} />
                <Button type="submit" disabled={isLoading}>
                    Создать тест
                </Button>
            </form>
        </div>
    )
}

export default CreateTestPage
