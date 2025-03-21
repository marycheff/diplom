import UsersList from "@/components/shared/UserList/UsersList"
import { BackButton } from "@/components/ui/Button"

const AdminPage = () => {
    return (
        <div>
            <BackButton />
            <UsersList />
            {/* <TestManagement /> */}
        </div>
    )
}
export default AdminPage
