import InternetConnectionStatus from "@/components/ui/InternetConnection/InternetConnectionStatus"
import Loader from "@/components/ui/Loader/Loader"
import { authenticatedRoutes, blockedUserRoutes, publicRoutes } from "@/router/routes"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

const AppRouter = () => {
    const { user, isAuth, isAdmin, checkAuth, isAuthChecking } = useAuthStore()
    const [authChecked, setAuthChecked] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token && !isAuth) {
            checkAuth().finally(() => {
                setAuthChecked(true)
            })
        } else {
            setAuthChecked(true)
        }
    }, [checkAuth, isAuth])

    if (isAuthChecking || !authChecked) {
        return <Loader fullScreen />
    }

    return (
        <>
            <InternetConnectionStatus />
            <Routes>
                {!user && publicRoutes}
                
                {user?.isBlocked && blockedUserRoutes}

                {!user?.isBlocked && isAuth && (
                    <>
                        {authenticatedRoutes(isAdmin)}
                        <Route path="*" element={<Navigate to="/home" />} />
                    </>
                )}

                {!user && !isAuth && <Route path="*" element={<Navigate to="/login" />} />}
            </Routes>
        </>
    )
}

export default AppRouter
