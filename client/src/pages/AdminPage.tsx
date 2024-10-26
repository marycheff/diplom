import { observer } from "mobx-react-lite"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserManagement from "../components/common/UserManagement"
import Loader from "../components/UI/loader/Loader"
import { Context } from "../main"

const AdminPage = () => {
    const { store } = useContext(Context)
    const navigate = useNavigate()

    return (
        <div>
            {store.isLoading ? (
                <Loader />
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>Назад</button>
                    <UserManagement /> {/* Используем новый компонент */}
                </>
            )}
        </div>
    )
}
export default observer(AdminPage)
