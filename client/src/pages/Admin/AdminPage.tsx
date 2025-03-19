import { useNavigate } from "react-router-dom"

import TestManagement from "@/components/shared/TestManagement"
import UserManagement from "@/components/shared/UsersList"
import BackButton from "@/components/ui/Button/BackButton/BackButton"

const AdminPage = () => {
    return (
        <div>
            <BackButton />
            <UserManagement />
            <TestManagement />
        </div>
    )
}
export default AdminPage
