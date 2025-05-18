import { ModerationStatus, ModerationStatusLabels } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { FC } from "react"
import { useForm } from "react-hook-form"
import styles from "./ModerationStatusEditor.module.scss"

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
        <div className={styles.form}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContentWrapper}>
                <div className={styles.formContent}>
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
                        multiline
                        clearable
                        name="description"
                        placeholder="Сообщение автору теста"
                        register={register}
                        setValue={setValue}
                        disabled
                    />
                </div>

                <div className={styles.formActions}>
                    <Button type="button" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type="submit" disabled={!hasChanged}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ModerationStatusEditor
