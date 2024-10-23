import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditableField from "../components/UI/input/EditableField"
import Loader from "../components/UI/loader/Loader"
import UpdatePasswordForm from "../containers/UpdatePasswordForm"
import { Context } from "../main"

type UserFields = {
    [key: string]: string | boolean | undefined 
}
const fieldLabels: { [key: string]: string } = {
    firstName: "Имя",
    secondName: "Фамилия",
    patronymic: "Отчество",
    email: "Электронная почта",
}

const UserProfilePage = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [userFields, setUserFields] = useState<UserFields>({})
    const [initialUserFields, setInitialUserFields] = useState<UserFields>({})
    const [isEditingFields, setIsEditingFields] = useState<{ [key: string]: boolean }>({})
    const [isFormChanged, setIsFormChanged] = useState(false)
    const [isSending, setIsSending] = useState(false)
    const [showModal, setShowModal] = useState(false)

    // Получение данных пользователя
    async function getUserInfo() {
        try {
            const userData = await store.getUserById(store.user.id)
            const { id, role, ...fields } = userData // Исключаем поля id и role
            setUserFields(fields) // Сохраняем данные пользователя без id и role
            setInitialUserFields(fields) // Сохраняем начальные данные для проверки изменений

            // Инициализируем состояния редактирования для каждого поля
            const editingState = Object.keys(fields).reduce((acc, field) => {
                acc[field] = false // Все поля не редактируются по умолчанию
                return acc
            }, {} as { [key: string]: boolean })
            setIsEditingFields(editingState)
        } catch (e: any) {
            console.log(e.response?.data?.message)
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
        try {
            await store.updateUser(store.user.id, userFields)
            getUserInfo() // Обновление информации
        } catch (e) {
            console.error(e)
        }
    }

    // Отправка активационной ссылки
    const handleSendActivationLink = async () => {
        try {
            setIsSending(true)
            await store.updateActivationLink(store.user.email)
            setShowModal(true)
        } catch (e) {
            console.error("Ошибка отправки ссылки активации:", e)
        } finally {
            setIsSending(false)
        }
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
            {store.isLoading || (isSending && <Loader text='Отправляем письмо на почту' />)}
            <button onClick={() => navigate(-1)}>Назад</button>
            {userFields ? (
                <div>
                    <label>Электронная почта: {userFields.email}</label>
                    <p>Почта активирована: {userFields.activated ? "Да" : "Нет"}</p>
                    {!userFields.activated && (
                        <button onClick={handleSendActivationLink}>
                            {isSending ? "Отправка..." : "Отправить ссылку еще раз"}
                        </button>
                    )}

                    {/* Генерация полей для редактирования */}
                    {Object.keys(userFields).map(
                        field =>
                            field !== "email" &&
                            field !== "activated" && (
                                <EditableField
                                    key={field}
                                    label={fieldLabels[field] || field}
                                    value={userFields[field] as string} // Приведение типа к строке
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
                    <div style={{ backgroundColor: "#fff" }}>
                        <h2>Письмо отправлено!</h2>
                        <p>
                            Мы отправили письмо для активации на ваш email. Пожалуйста, проверьте почту. Эту вкладку
                            можно закрыть.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfilePage
