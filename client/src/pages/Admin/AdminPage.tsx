import TestManagement from "@/components/shared/TestManagement"
import UserManagement from "@/components/shared/UserManagement"
import { BackButton } from "@/components/ui/Button"

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
