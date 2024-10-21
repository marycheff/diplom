import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditableField from "../components/UI/input/EditableField"
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

    useEffect(() => {
        getUserInfo()
    }, [])

    const handleSaveClick = () => {
        // Логика для сохранения данных позже
        console.log("Данные будут обновлены")
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>

            {user ? (
                <div>
                    <EditableField label='Email' value={email} onChange={setEmail} />
                    <span>Активирован: {user.activated ? "Да" : "Нет"}</span>

                    <EditableField label='Имя' value={firstName} onChange={setFirstName} />
                    <EditableField label='Фамилия' value={lastName} onChange={setLastName} />
                    <EditableField label='Отчество' value={middleName} onChange={setMiddleName} />

                    <button onClick={handleSaveClick}>Сохранить изменения</button>
                </div>
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    )
}

export default observer(UserProfilePage)
