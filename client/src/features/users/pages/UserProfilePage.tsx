import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { EditableInput } from "@/shared/ui/Input"
import Loader from "@/shared/ui/Loader/Loader"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/useUserStore"

type UserFields = {
    [key: string]: string | boolean | undefined | null
}
const fieldLabels: { [key: string]: string } = {
    name: "Имя",
    surname: "Фамилия",
    patronymic: "Отчество",
    email: "Электронная почта",
}

const UserProfilePage = () => {
    const { user, updateActivationLink, isEmailSending } = useAuthStore()
    const { getUserById, updateUser, isFetching, isLoading } = useUserStore()
    const [userFields, setUserFields] = useState<UserFields>({})
    const [initialUserFields, setInitialUserFields] = useState<UserFields>({})
    const [isEditingFields, setIsEditingFields] = useState<{ [key: string]: boolean }>({})
    const [isFormChanged, setIsFormChanged] = useState(false)

    const [isLoadingFields, setIsLoadingFields] = useState(false)

    // Получение данных пользователя
    async function getUserInfo() {
        const userData = await getUserById(user?.id!)
        if (userData) {
            setIsLoadingFields(true)
            const { id, role, isBlocked, ...fields } = userData
            setUserFields(fields)
            setInitialUserFields(fields)
            const editingState = Object.keys(fields).reduce((acc, field) => {
                acc[field] = false
                return acc
            }, {} as { [key: string]: boolean })
            setIsEditingFields(editingState)
            setIsLoadingFields(false)
        }
    }

    // Обработчик изменений поля
    const handleFieldChange = (field: string, value: string) => {
        setUserFields(prevFields => ({
            ...prevFields,
            [field]: value,
        }))
    }

    // Обработчик изменения состояния редактирования поля
    const handleEditingChange = (field: string, isEditing: boolean) => {
        setIsEditingFields(prevFields => ({
            ...prevFields,
            [field]: isEditing,
        }))
    }

    // Сохранение изменений
    const handleSaveClick = async () => {
        await updateUser(user?.id!, userFields)
        getUserInfo()
    }

    // Отправка активационной ссылки
    const handleSendActivationLink = async () => {
        await updateActivationLink(user?.email!)
        // setShowModal(true)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    useEffect(() => {
        const hasChanges = Object.keys(userFields).some(key => userFields[key] !== initialUserFields[key])
        setIsFormChanged(hasChanges)
    }, [userFields, initialUserFields])

    return (
        <div>
            {/* <BackButton /> */}
            {(isFetching || isLoadingFields) && <Loader delay={300} />}

            {Object.keys(userFields).length === 0 && !isLoadingFields ? null : ( // Проверяем, загрузились ли данные
                <div>
                    {userFields.email && <label>Электронная почта: {userFields.email}</label>}
                    {userFields.isActivated !== undefined && (
                        <p>Почта активирована: {userFields.isActivated ? "Да" : "Нет"}</p>
                    )}

                    {!userFields.isActivated && userFields.email && (
                        <Button onClick={handleSendActivationLink} disabled={isEmailSending}>
                            {isEmailSending ? "Отправка..." : "Отправить ссылку еще раз"}
                        </Button>
                    )}

                    {/* Генерация полей для редактирования */}
                    {Object.keys(userFields).map(
                        field =>
                            field !== "email" &&
                            field !== "isActivated" &&
                            userFields[field] !== undefined && (
                                <EditableInput
                                    name={field}
                                    key={field}
                                    label={fieldLabels[field] || field}
                                    value={userFields[field] as string}
                                    onChange={value => handleFieldChange(field, value)}
                                    onEditingChange={isEditing => handleEditingChange(field, isEditing)}
                                />
                            )
                    )}

                    <Button
                        onClick={handleSaveClick}
                        disabled={!isFormChanged || Object.values(isEditingFields).includes(true) || isLoading}>
                        Сохранить изменения
                    </Button>

                    <UpdatePasswordForm />
                </div>
            )}
        </div>
    )
}

export default UserProfilePage
