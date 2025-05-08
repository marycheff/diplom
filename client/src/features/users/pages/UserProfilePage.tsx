import UpdatePasswordForm from "@/features/auth/components/UpdatePasswordForm"
import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { Button } from "@/shared/ui/Button"
import { EditableInput } from "@/shared/ui/Input"
import Loader from "@/shared/ui/Loader/Loader"
import { formatSpaces } from "@/shared/utils/formatter"
import { useEffect, useState } from "react"
import { useUserStore } from "../store/useUserStore"
import styles from "./UserProfilePage.module.scss"

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
        const cleanedFields = Object.fromEntries(
            Object.entries(userFields).map(([key, value]) => [
                key,
                typeof value === "string" ? formatSpaces(value) : value,
            ])
        )

        await updateUser(user?.id!, cleanedFields)
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
        <div className={styles.profilePage}>
            {(isFetching || isLoadingFields) && (
                <div className={styles.loader}>
                    <Loader delay={300} />
                </div>
            )}

            {Object.keys(userFields).length === 0 && !isLoadingFields ? null : (
                <>
                    <section className={styles.section}>
                        <h2>Информация об аккаунте</h2>
                        <div className={styles.accountInfo}>
                            {userFields.email && (
                                <div className={styles.emailStatus}>
                                    <label>Электронная почта:</label>
                                    <span>{userFields.email}</span>
                                </div>
                            )}
                            {userFields.isActivated !== undefined && (
                                <div className={styles.emailStatus}>
                                    <label>Статус почты:</label>
                                    <span className={userFields.isActivated ? styles.activated : styles.notActivated}>
                                        {userFields.isActivated ? "Активирована" : "Не активирована"}
                                    </span>
                                    {!userFields.isActivated && <span>(Проверьте почтовый ящик)</span>}
                                </div>
                            )}

                            {!userFields.isActivated && userFields.email && (
                                <Button
                                    onClick={handleSendActivationLink}
                                    disabled={isEmailSending}
                                    className={styles.activationButton}>
                                    {isEmailSending ? "Отправка..." : "Отправить для активации ссылку еще раз"}
                                </Button>
                            )}
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2>Личная информация</h2>
                        <div className={styles.personalInfo}>
                            <div className={styles.fields}>
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
                            </div>
                            <Button
                                onClick={handleSaveClick}
                                disabled={!isFormChanged || Object.values(isEditingFields).includes(true) || isLoading}
                                className={styles.saveButton}>
                                Сохранить изменения
                            </Button>
                        </div>
                    </section>

                    <section className={`${styles.section}`}>
                        <h2>Обновление пароля</h2>
                        <UpdatePasswordForm />
                    </section>
                </>
            )}
        </div>
    )
}

export default UserProfilePage
