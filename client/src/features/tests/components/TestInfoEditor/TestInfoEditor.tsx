import { ShortTestInfo } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import { formatSpaces } from "@/shared/utils/formatter"
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

interface TestInfoEditorProps {
    data: ShortTestInfo
    onChangingComplete: (data: ShortTestInfo) => void
    onCancel: () => void
}

const TestInfoEditor: FC<TestInfoEditorProps> = ({ data, onChangingComplete: onChangingComplete, onCancel }) => {
    const onSubmit: SubmitHandler<ShortTestInfo> = data => {
        onChangingComplete({
            title: data.title,
            description: data.description,
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
        formatSpaces(currentValues.title) !== data.title || formatSpaces(currentValues.description) !== data.description
    const isFormValid = !hasErrors || !hasChanged

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Название (обязательно) */}
                <ValidatedInput
                    // floatingLabel={false}
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
                <br/>
                {/* Описание */}
                <ValidatedInput
                    // floatingLabel={false}
                    multiline
                    clearable
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
