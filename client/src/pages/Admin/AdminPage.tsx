import UserManagement from "@/components/shared/UserManagement"
import { BackButton } from "@/components/ui/Button"
import { Link } from "react-router-dom"

const AdminPage = () => {
    return (
        <div>
            <BackButton />
            {/* <UserManagement /> */}
            <Link to={"/admin/users"}>Пользователи</Link>
            {/* <TestManagement /> */}
        </div>
    )
}
export default AdminPage
