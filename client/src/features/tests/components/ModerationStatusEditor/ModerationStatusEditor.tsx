import { ModerationStatus, ModerationStatusLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { FC } from "react"
import { useForm } from "react-hook-form"

interface ModerationStatusEditorProps {
    currentStatus: ModerationStatus
    onChangingComplete: (status: ModerationStatus) => void
    onCancel: () => void
}

const ModerationStatusEditor: FC<ModerationStatusEditorProps> = ({ currentStatus, onChangingComplete, onCancel }) => {
    const { register, handleSubmit, watch, setValue, trigger } = useForm<{ status: ModerationStatus }>({
        defaultValues: {
            status: currentStatus,
        },
    })

    const currentValue = watch("status")
    const hasChanged = currentValue !== currentStatus

    const onSubmit = (data: { status: ModerationStatus }) => {
        onChangingComplete(data.status)
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                    label="Статус"
                    name="status"
                    register={register}
                    value={currentStatus}
                    options={[
                        {
                            value: ModerationStatus.PENDING,
                            label: ModerationStatusLabels[ModerationStatus.PENDING],
                        },
                        {
                            value: ModerationStatus.APPROVED,
                            label: ModerationStatusLabels[ModerationStatus.APPROVED],
                        },
                        {
                            value: ModerationStatus.REJECTED,
                            label: ModerationStatusLabels[ModerationStatus.REJECTED],
                        },
                    ]}
                />
                <br />

                <ValidatedInput
                    trigger={trigger}
                    // floatingLabel={false}
                    multiline
                    clearable
                    name="description"
                    placeholder="Сообщение автору теста"
                    register={register}
                    setValue={setValue}
                />
                <br />
                <br />
                <br />

                <Button type="submit" disabled={!hasChanged}>
                    Сохранить
                </Button>
                {/* <Button type="button" onClick={onCancel}>
                    Отмена
                </Button> */}
            </form>
        </div>
    )
}

export default ModerationStatusEditor
