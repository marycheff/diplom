import { useAuthStore } from "@/features/auth/store/useAuthStore"
import { ROUTES } from "@/router/paths"
import Breadcrumbs from "@/shared/ui/Breadcrumbs/Breadcrumbs"
import { ReactNode, useState } from "react"
import { Navigate } from "react-router-dom"
import { Sidebar } from "../Sidebar/Sidebar"
import styles from "./Layout.module.scss"

interface LayoutProps {
	children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
	const { isAuth } = useAuthStore()
	const [isAnimating, setIsAnimating] = useState(false)

	if (!isAuth) {
		return <Navigate to={ROUTES.WELCOME} />
	}

	return (
		<div className={styles.layout}>
			<Sidebar
				onAnimationStart={() => setIsAnimating(true)}
				onAnimationEnd={() => setIsAnimating(false)}
			/>
			<div className={styles.mainContent}>
				<Breadcrumbs />
				<div className={styles.scrollContainer}>
					<div className={styles.content}>{children}</div>
				</div>
			</div>
		</div>
	)
}
