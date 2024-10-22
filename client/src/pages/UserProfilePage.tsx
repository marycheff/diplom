import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditableField from "../components/UI/input/EditableField"
import UpdatePasswordForm from "../containers/UpdatePasswordForm"
import { Context } from "../main"
import { IUser } from "../models/IUser"

const UserProfilePage = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [showModal, setShowModal] = useState(false) // состояние для модального окна
    const [isSending, setIsSending] = useState(false)

    async function getUserInfo() {
        try {
            const userData = await store.getUserById(store.user.id)
            setUser(userData)
            setEmail(userData.email)
            setFirstName(userData.firstName || "")
            setLastName(userData.secondName || "")
            setMiddleName(userData.patronymic || "")
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }
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
    const handleSaveClick = () => {
        setShowModal(true) // Показать модальное окно
        console.log("Данные будут обновлены")
    }
    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            {store.isLoading || isSending ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>Назад</button>

                    {user ? (
                        <div>
                            <EditableField label='Email' value={email} onChange={setEmail} />
                            <span>Активирован: {user.activated ? "Да" : "Нет"}</span>
                            {!user.activated && (
                                <button onClick={handleSendActivationLink}>
                                    {isSending ? "Отправка..." : "Отправить ссылку еще раз"}
                                </button>
                            )}
                            <EditableField label='Имя' value={firstName} onChange={setFirstName} />
                            <EditableField label='Фамилия' value={lastName} onChange={setLastName} />
                            <EditableField label='Отчество' value={middleName} onChange={setMiddleName} />

                            <button onClick={handleSaveClick}>Сохранить изменения</button>

                            <UpdatePasswordForm />
                        </div>
                    ) : (
                        <p>Загрузка...</p>
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
                            <div
                                style={{
                                    backgroundColor: "#fff",
                                }}>
                                <h2>Письмо отправлено!</h2>
                                <p>
                                    Мы отправили письмо для активации на ваш email. Пожалуйста, проверьте почту. Эту
                                    вкладку можно закрыть.
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default observer(UserProfilePage)
