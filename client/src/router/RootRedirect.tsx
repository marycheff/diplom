import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import { Navigate } from "react-router-dom"

const RootRedirect = () => {
    const { isAuth, isAdmin } = useAuthStore()

    if (isAdmin) {
        return <Navigate to={ROUTES.ADMIN} />
    }

    if (isAuth) {
        return <Navigate to={ROUTES.HOME} />
    }

    return <Navigate to={ROUTES.WELCOME} />
}

export default RootRedirect
