import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import Breadcrumbs from "@/shared/ui/Breadcrumbs/Breadcrumbs"
import { Navigate } from "react-router-dom"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Layout.module.scss"

interface LayoutProps {
    children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    const { isAuth } = useAuthStore()

    if (!isAuth) {
        return <Navigate to={ROUTES.WELCOME} />
    }

    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Breadcrumbs />
                <main className={styles.content}>{children}</main>
            </div>
        </div>
    )
}
