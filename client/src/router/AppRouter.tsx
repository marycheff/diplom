import { useAuthStore } from "@/features/auth/store/useAuthStore"
import BlockedUserPage from "@/features/users/pages/BlockedUserPage"
import WelcomePage from "@/pages/WelcomePage"
import { ROUTES } from "@/router/paths"
import { adminRoutes, publicRoutes, unauthorizedRoutes, userRoutes } from "@/router/routesConfig"
import { Layout } from "@/shared/components/Layout/Layout"
import Loader from "@/shared/ui/Loader/Loader"
import { JSX, useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

interface RouteProps {
	element: JSX.Element
	isAdmin?: boolean
}

const UnauthorizedRoute = ({ element }: RouteProps) => {
	const { isAuth, isAdmin } = useAuthStore()

	if (isAuth) {
		return isAdmin ? <Navigate to={ROUTES.ADMIN} /> : <Navigate to={ROUTES.HOME} />
	}

	return element
}

// Компонент для защиты пользовательских роутов
const ProtectedRoute = ({ element }: RouteProps) => {
	const { isAuth, isAdmin } = useAuthStore()

	if (!isAuth) {
		return <Navigate to={ROUTES.WELCOME} />
	}

	if (isAdmin) {
		return <Navigate to={ROUTES.ADMIN} />
	}

	return element
}

// Компонент для защиты админских роутов
const AdminRoute = ({ element, isAdmin }: RouteProps) => {
	return isAdmin ? element : <Navigate to={ROUTES.HOME} />
}

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

	// Перенаправление для корневого маршрута "/"
	const rootRedirect = () => {
		if (isAuth) {
			return isAdmin ? <Navigate to={ROUTES.ADMIN} /> : <Navigate to={ROUTES.HOME} />
		}
		return <WelcomePage />
	}

	return (
		<>
			<Routes>
				{user?.isBlocked ? (
					<Route
						path="*"
						element={<BlockedUserPage />}
					/>
				) : (
					<>
						{/* Обработка корневого маршрута */}
						<Route
							path="/"
							element={rootRedirect()}
						/>

						{/* Публичные маршруты (доступны всем) */}
						{publicRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={route.element}
							/>
						))}

						{/* Маршруты для неавторизованных пользователей */}
						{unauthorizedRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									// Для ROUTES.WELCOME используем особую логику
									route.path === ROUTES.WELCOME ? (
										isAuth ? (
											isAdmin ? (
												<Navigate to={ROUTES.ADMIN} />
											) : (
												<Navigate to={ROUTES.HOME} />
											)
										) : (
											route.element
										)
									) : (
										<UnauthorizedRoute element={route.element} />
									)
								}
							/>
						))}

						{/* Маршруты для авторизованных пользователей */}
						{userRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={<ProtectedRoute element={<Layout>{route.element}</Layout>} />}
							/>
						))}

						{/* Админские маршруты */}
						{adminRoutes.map((route) => (
							<Route
								key={route.path}
								path={route.path}
								element={
									<AdminRoute
										element={<Layout>{route.element}</Layout>}
										isAdmin={isAdmin}
									/>
								}
							/>
						))}

						<Route
							path="*"
							element={
								isAuth ? (
									isAdmin ? (
										<Navigate to={ROUTES.ADMIN} />
									) : (
										<Navigate to={ROUTES.HOME} />
									)
								) : (
									<Navigate to={ROUTES.WELCOME} />
								)
							}
						/>
					</>
				)}
			</Routes>
		</>
	)
}

export default AppRouter
