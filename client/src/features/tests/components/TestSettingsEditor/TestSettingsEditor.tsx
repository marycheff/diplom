import { PreTestUserData, PreTestUserDataLabels } from "@/shared/types/inputFields"
import { TestSettingsDTO } from "@/shared/types/testTypes"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { ChangeEvent, FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./TestSettingsEditor.module.scss"

interface TestSettingsEditorProps {
    settings: TestSettingsDTO
    onSettingsComplete: (settings: TestSettingsDTO) => void
    onCancel: () => void
}

const TestSettingsEditor: FC<TestSettingsEditorProps> = ({ onSettingsComplete, onCancel, settings }) => {
    console.log(
        `Часы: ${Math.floor((settings.timeLimit ?? 0) / 3600)}, Минуты: ${Math.floor(
            ((settings.timeLimit ?? 0) % 3600) / 60
        )}, Секунды: ${(settings.timeLimit ?? 0) % 60}`
    )
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            requireRegistration: settings.requireRegistration ? "Да" : "Нет",
            showDetailedResults: settings.showDetailedResults ? "Да" : "Нет",
            inputFields: settings.inputFields || [],
            hours: Math.floor((settings.timeLimit ?? 0) / 3600),
            minutes: Math.floor(((settings.timeLimit ?? 0) % 3600) / 60),
            seconds: (settings.timeLimit ?? 0) % 60,
            timeLimit: settings.timeLimit ?? 0,
        },
    })

    // const watchedHours = watch("hours")
    // const watchedMinutes = watch("minutes")
    const inputFields = watch("inputFields")

    const onSubmit: SubmitHandler<any> = data => {
        onSettingsComplete({
            requiredFields: data.inputFields,
            inputFields: data.inputFields,
            requireRegistration: data.requireRegistration === "Да",
            showDetailedResults: data.showDetailedResults === "Да",
            timeLimit:
                Number(data.hours.trim()) * 3600 + Number(data.minutes.trim()) * 60 + Number(data.seconds.trim()),
        })
    }

    const handleCheckboxChange = (field: PreTestUserData) => (event: ChangeEvent<HTMLInputElement>) => {
        const newInputFields = event.target.checked ? [...inputFields, field] : inputFields.filter(f => f !== field)
        setValue("inputFields", newInputFields)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Select
                    register={register}
                    label="Требуется регистрация: "
                    name="requireRegistration"
                    options={[
                        { value: "Да", label: "Да" },
                        { value: "Нет", label: "Нет" },
                    ]}
                    value={settings.requireRegistration ? "Да" : "Нет"}
                />
            </div>
            <div>
                <Select
                    register={register}
                    label="Показывать детальные результаты: "
                    name="showDetailedResults"
                    options={[
                        { value: "Да", label: "Да" },
                        { value: "Нет", label: "Нет" },
                    ]}
                    value={settings.showDetailedResults ? "Да" : "Нет"}
                />
            </div>
            <div>
                <span className={styles.label}>Поля ввода ({inputFields.length}):</span>
                <div className={styles.checkboxGroup}>
                    {Object.entries(PreTestUserDataLabels).map(([key, label]) => (
                        <Checkbox
                            key={key}
                            id={`inputField-${key}`}
                            label={label}
                            checked={inputFields.includes(key as PreTestUserData)}
                            onChange={handleCheckboxChange(key as PreTestUserData)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <span className={styles.label}>Лимит времени:</span>
                <div className={styles.timeInputs}>
                    Часы
                    <ValidatedInput
                        className={styles.timeInput}
                        floatingLabel={false}
                        name="hours"
                        placeholder="Часы"
                        register={register}
                        setValue={setValue}
                        errors={errors.hours}
                        validationRules={{
                            required: "Обязательное поле",
                            min: { value: 0, message: "Минимум 0 часов" },
                            max: { value: 4, message: "Максимум 4 часа" },
                            validate: value => !isNaN(Number(value)) || "Некорректное значение",
                        }}
                    />
                    Минуты
                    <ValidatedInput
                        className={styles.timeInput}
                        floatingLabel={false}
                        name="minutes"
                        placeholder="Минуты"
                        register={register}
                        setValue={setValue}
                        errors={errors.minutes}
                        validationRules={{
                            required: "Обязательное поле",
                            min: { value: 0, message: "Минимум 0 минут" },
                            max: { value: 59, message: "Максимум 59 минут" },
                            validate: value => !isNaN(Number(value)) || "Некорректное значение",
                        }}
                    />
                    Секунды
                    <ValidatedInput
                        className={styles.timeInput}
                        floatingLabel={false}
                        name="seconds"
                        placeholder="Секунды"
                        register={register}
                        setValue={setValue}
                        errors={errors.seconds}
                        validationRules={{
                            required: "Обязательное поле",
                            min: { value: 0, message: "Минимум 0 секунд" },
                            max: { value: 59, message: "Максимум 59 секунд" },
                            validate: value => !isNaN(Number(value)) || "Некорректное значение",
                        }}
                    />
                </div>
            </div>
            <br />
            <br />
            <Button type="submit">Сохранить</Button>
        </form>
    )
}

export default TestSettingsEditor
