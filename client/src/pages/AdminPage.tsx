import { useUserStore } from "@/store/useUserStore"
import { useNavigate } from "react-router-dom"

import TestManagement from "@/components/common/TestManagement"
import UserManagement from "@/components/common/UserManagement"
import Loader from "../components/UI/loader/Loader"

const AdminPage = () => {
    const navigate = useNavigate()
    const { isLoading } = useUserStore()

    return (
        <div>
            {isLoading ? (
                <Loader delay={300} />
            ) : (
                <>
                    <button onClick={() => navigate(-1)}>Назад</button>
                    <UserManagement />
                    <TestManagement />
                </>
            )}
        </div>
    )
}
export default AdminPage
