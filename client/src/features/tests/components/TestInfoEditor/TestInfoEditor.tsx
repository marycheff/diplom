import { ShortTestInfo } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface TestInfoEditorProps {
    data: ShortTestInfo
    onSettingsComplete: (data: ShortTestInfo) => void
    onCancel: () => void
}

const TestInfoEditor: FC<TestInfoEditorProps> = ({ data, onSettingsComplete, onCancel }) => {
    const onSubmit: SubmitHandler<ShortTestInfo> = data => {
        onSettingsComplete({
            title: data.title.trim(),
            description: data.description?.trim(),
        })
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        formState,
        watch,
    } = useForm<ShortTestInfo>({
        mode: "onChange",
        defaultValues: {
            title: data.title,
            description: data.description,
        },
    })
    const currentValues = watch()

    const hasErrors = Object.keys(formState.errors).length > 0
    const hasChanged =
        currentValues.title.trim() !== data.title || currentValues.description?.trim() !== data.description
    const isFormValid = !hasErrors || !hasChanged

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                *Название
                <ValidatedInput
                    floatingLabel={false}
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
                Описание
                <ValidatedInput
                    floatingLabel={false}
                    name="description"
                    placeholder="Описание"
                    register={register}
                    setValue={setValue}
                />
                <Button type="submit" disabled={!isFormValid || !hasChanged}>
                    Сохранить
                </Button>
            </form>
        </div>
    )
}

export default TestInfoEditor
