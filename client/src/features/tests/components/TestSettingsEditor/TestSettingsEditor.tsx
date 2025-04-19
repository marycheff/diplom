import { PreTestUserData, PreTestUserDataLabels, TestSettingsDTO } from "@/shared/types"
import { Button } from "@/shared/ui/Button"
import Checkbox from "@/shared/ui/Checkbox/Checkbox"
import { ValidatedInput } from "@/shared/ui/Input"
import Select from "@/shared/ui/Select/Select"
import { formatSpaces } from "@/shared/utils/formatter"
import { ChangeEvent, FC, useMemo } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./TestSettingsEditor.module.scss"

interface TestSettingsEditorProps {
    settings: TestSettingsDTO
    onSettingsComplete: (settings: TestSettingsDTO) => void
    onCancel: () => void
}

const TestSettingsEditor: FC<TestSettingsEditorProps> = ({ onSettingsComplete, onCancel, settings }) => {
    const initialValues = {
        requireRegistration: settings.requireRegistration ? "Да" : "Нет",
        showDetailedResults: settings.showDetailedResults ? "Да" : "Нет",
        shuffleQuestions: settings.shuffleQuestions ? "Да" : "Нет",
        shuffleAnswers: settings.shuffleAnswers ? "Да" : "Нет",
        inputFields: settings.inputFields || [],
        hours: String(Math.floor((settings.timeLimit ?? 0) / 3600)),
        minutes: String(Math.floor(((settings.timeLimit ?? 0) % 3600) / 60)),
        seconds: String((settings.timeLimit ?? 0) % 60),
    }
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        defaultValues: initialValues,
    })

    const watchedValues = watch()
    const { inputFields } = watch()

    // Функция для сравнения массивов (например, для inputFields)
    const arraysEqual = (a: any[], b: any[]) => {
        if (a.length !== b.length) return false
        return a.every(item => b.includes(item))
    }

    const isChanged = useMemo(() => {
        // Проверка для строковых полей с форматированием пробелов
        if (
            formatSpaces(watchedValues.requireRegistration) !== formatSpaces(initialValues.requireRegistration) ||
            formatSpaces(watchedValues.showDetailedResults) !== formatSpaces(initialValues.showDetailedResults) ||
            formatSpaces(watchedValues.shuffleQuestions) !== formatSpaces(initialValues.shuffleQuestions) ||
            formatSpaces(watchedValues.shuffleAnswers) !== formatSpaces(initialValues.shuffleAnswers)
        ) {
            return true
        }

        // Проверка для массива inputFields
        if (!arraysEqual(watchedValues.inputFields, initialValues.inputFields)) {
            return true
        }

        // Проверка для временных полей (приводим к строке, чтобы сравнение было корректным)
        if (
            formatSpaces(String(watchedValues.hours)) !== formatSpaces(initialValues.hours) ||
            formatSpaces(String(watchedValues.minutes)) !== formatSpaces(initialValues.minutes) ||
            formatSpaces(String(watchedValues.seconds)) !== formatSpaces(initialValues.seconds)
        ) {
            return true
        }

        return false
    }, [watchedValues, initialValues])

    const onSubmit: SubmitHandler<any> = data => {
        onSettingsComplete({
            inputFields: data.inputFields,
            requireRegistration: data.requireRegistration === "Да",
            showDetailedResults: data.showDetailedResults === "Да",
            shuffleQuestions: data.shuffleQuestions === "Да",
            shuffleAnswers: data.shuffleAnswers === "Да",
            timeLimit: Number(data.hours) * 3600 + Number(data.minutes) * 60 + Number(data.seconds),
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
                <Select
                    register={register}
                    label="Перемешивать вопросы: "
                    name="shuffleQuestions"
                    options={[
                        { value: "Да", label: "Да" },
                        { value: "Нет", label: "Нет" },
                    ]}
                    value={settings.shuffleQuestions ? "Да" : "Нет"}
                />
            </div>
            <div>
                <Select
                    register={register}
                    label="Перемешивать варианты ответов: "
                    name="shuffleAnswers"
                    options={[
                        { value: "Да", label: "Да" },
                        { value: "Нет", label: "Нет" },
                    ]}
                    value={settings.shuffleAnswers ? "Да" : "Нет"}
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
                        // floatingLabel={false}
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
            <Button type="submit" disabled={!isChanged}>
                Сохранить
            </Button>
        </form>
    )
}

export default TestSettingsEditor
