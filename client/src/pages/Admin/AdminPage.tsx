import { useNavigate } from "react-router-dom"

import TestManagement from "@/components/shared/TestManagement"
import UserManagement from "@/components/shared/UsersList"

const AdminPage = () => {
    // const navigate = useNavigate()
    // const { isLoading } = useUserStore()

    // return (
    //     <div>
    //         {isLoading ? (
    //             <Loader delay={300} />
    //         ) : (
    //             <>
    //                 <button onClick={() => navigate(-1)}>Назад</button>
    //                 <UserManagement />
    //                 <TestManagement />
    //             </>
    //         )}
    //     </div>
    // )
    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(-1)}>Назад</button>
            <UserManagement />
            <TestManagement />
        </div>
    )
}
export default AdminPage
