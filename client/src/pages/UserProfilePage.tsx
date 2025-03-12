import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditableField from "../components/UI/input/EditableField"
import Loader from "../components/UI/loader/Loader"
import UpdatePasswordForm from "../containers/UpdatePasswordForm"
import { useAuthStore } from "../store/useAuthStore"
import { useUserStore } from "../store/useUserStore"

type UserFields = {
    [key: string]: string | boolean | undefined
}
const fieldLabels: { [key: string]: string } = {
    name: "Имя",
    surname: "Фамилия",
    patronymic: "Отчество",
    email: "Электронная почта",
}

const UserProfilePage = () => {
    const { user, isLoading, updateActivationLink, isEmailSending } = useAuthStore()
    const { getUserById, updateUser, isLoading: isUserLoading } = useUserStore()
    const navigate = useNavigate()
    const [userFields, setUserFields] = useState<UserFields>({})
    const [initialUserFields, setInitialUserFields] = useState<UserFields>({})
    const [isEditingFields, setIsEditingFields] = useState<{ [key: string]: boolean }>({})
    const [isFormChanged, setIsFormChanged] = useState(false)
    const [showModal, setShowModal] = useState(false)

    // Получение данных пользователя
    async function getUserInfo() {
        const userData = await getUserById(user?.id!)
        if (userData) {
            const { id, role, isBlocked, ...fields } = userData
            setUserFields(fields)
            setInitialUserFields(fields)
            const editingState = Object.keys(fields).reduce((acc, field) => {
                acc[field] = false
                return acc
            }, {} as { [key: string]: boolean })
            setIsEditingFields(editingState)
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
        <div style={{ position: "relative" }}>
            {(isLoading || isUserLoading) && <Loader text="Загрузка..." />}
            <button onClick={() => navigate(-1)}>Назад</button>
            {userFields ? (
                <div>
                    <label>Электронная почта: {userFields.email}</label>
                    <p>Почта активирована: {userFields.isActivated ? "Да" : "Нет"}</p>
                    {!userFields.isActivated && (
                        <button onClick={handleSendActivationLink} disabled={isEmailSending}>
                            {isEmailSending ? "Отправка..." : "Отправить ссылку еще раз"}
                        </button>
                    )}

                    {/* Генерация полей для редактирования */}
                    {Object.keys(userFields).map(
                        field =>
                            field !== "email" &&
                            field !== "isActivated" && (
                                <EditableField
                                    key={field}
                                    label={fieldLabels[field] || field}
                                    value={userFields[field] as string}
                                    onChange={value => handleFieldChange(field, value)}
                                    onEditingChange={isEditing => handleEditingChange(field, isEditing)}
                                />
                            )
                    )}

                    <button
                        onClick={handleSaveClick}
                        disabled={!isFormChanged || Object.values(isEditingFields).includes(true)}>
                        Сохранить изменения
                    </button>

                    <UpdatePasswordForm />
                </div>
            ) : (
                <Loader />
            )}

            {/* Модальное окно */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "5px" }}>
                        <h2>Письмо отправлено!</h2>
                        <p>
                            Мы отправили письмо для активации на ваш email. Пожалуйста, проверьте почту. Эту вкладку
                            можно закрыть.
                        </p>
                        <button onClick={() => setShowModal(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfilePage
