import AdminPage from "@/features/admin/pages/AdminPage"
import AllAttemptsPage from "@/features/attempts/pages/AllAttempts/AllAttemptsPage"
import AttemptInfoPage from "@/features/attempts/pages/AttemptInfo/AttemptInfoPage"
import StartAttemptPage from "@/features/attempts/pages/StartAttempt/StartAttemptPage"
import TestAttemptsPage from "@/features/attempts/pages/TestAttempts/TestAttemptsPage"
import TestTaking from "@/features/attempts/pages/TestTaking/TestTaking"
import ActivationErrorPage from "@/features/auth/pages/ActivationError"
import ActivationSuccessPage from "@/features/auth/pages/ActivationSuccess"
import LoginPage from "@/features/auth/pages/Login/LoginPage"
import SignupPage from "@/features/auth/pages/Signup/SignupPage"
import AllTestsPage from "@/features/tests/pages/AllTests/AllTestsPage"
import CreateTestPage from "@/features/tests/pages/CreateTest/CreateTestPage"
import MyTestsPage from "@/features/tests/pages/MyTests/MyTestsPage"
import TestInfoPage from "@/features/tests/pages/TestInfo/TestInfoPage"
import AllUsersPage from "@/features/users/pages/AllUsers/AllUsersPage"
import UserInfoPage from "@/features/users/pages/UserInfo/UserInfoPage"
import UserProfilePage from "@/features/users/pages/UserProfilePage"
import HomePage from "@/pages/HomePage"
import { ROUTES_PATHS } from "@/router/paths"

// Конфигурация админских роутов
export const adminRoutes = [
    { path: ROUTES_PATHS.ADMIN, element: <AdminPage /> },
    { path: ROUTES_PATHS.ADMIN_USERS, element: <AllUsersPage /> },
    { path: ROUTES_PATHS.ADMIN_USER_INFO, element: <UserInfoPage /> },
    { path: ROUTES_PATHS.ADMIN_TESTS, element: <AllTestsPage /> },
    { path: ROUTES_PATHS.ADMIN_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES_PATHS.ADMIN_TEST_ATTEMPTS, element: <TestAttemptsPage /> },
    { path: ROUTES_PATHS.ADMIN_ATTEMPT_INFO, element: <AttemptInfoPage /> },
    { path: ROUTES_PATHS.ADMIN_ALL_ATTEMPTS, element: <AllAttemptsPage /> },
    { path: ROUTES_PATHS.ADMIN_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES_PATHS.ADMIN_EDIT_SETTINGS, element: <TestInfoPage /> },
]

// Конфигурация пользовательских роутов (для авторизованных пользователей)
export const userRoutes = [
    { path: ROUTES_PATHS.HOME, element: <HomePage /> },
    { path: ROUTES_PATHS.CREATE_TEST, element: <CreateTestPage /> },
    { path: ROUTES_PATHS.PROFILE, element: <UserProfilePage /> },
    { path: ROUTES_PATHS.MY_TESTS, element: <MyTestsPage /> },
    { path: ROUTES_PATHS.MY_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES_PATHS.MY_TEST_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES_PATHS.MY_TEST_EDIT_SETTINGS, element: <TestInfoPage /> },
]

// Конфигурация публичных роутов
export const publicRoutes = [
    { path: ROUTES_PATHS.LOGIN, element: <LoginPage /> },
    { path: ROUTES_PATHS.SIGNUP, element: <SignupPage /> },
    { path: ROUTES_PATHS.ACTIVATION_ERROR, element: <ActivationErrorPage /> },
    { path: ROUTES_PATHS.ACTIVATION_SUCCESS, element: <ActivationSuccessPage /> },
    { path: ROUTES_PATHS.START_ATTEMPT, element: <StartAttemptPage /> },
    { path: ROUTES_PATHS.PASS_ATTEMPT, element: <TestTaking /> },
]
