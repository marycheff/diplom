import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../main"
import { IUser } from "../models/IUser"

const UserProfilePage = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState<IUser | undefined>(undefined)

    async function getUserInfo() {
        try {
            setUser(await store.getUserById(store.user.id))
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}

export default observer(UserProfilePage)
