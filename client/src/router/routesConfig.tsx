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
import { ROUTES } from "@/router/paths"

// Конфигурация админских роутов
export const adminRoutes = [
    { path: ROUTES.ADMIN, element: <AdminPage /> },
    { path: ROUTES.ADMIN_USERS, element: <AllUsersPage /> },
    { path: ROUTES.ADMIN_USER_INFO, element: <UserInfoPage /> },
    { path: ROUTES.ADMIN_TESTS, element: <AllTestsPage /> },
    { path: ROUTES.ADMIN_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_TEST_ATTEMPTS, element: <TestAttemptsPage /> },
    { path: ROUTES.ADMIN_ATTEMPT_INFO, element: <AttemptInfoPage /> },
    { path: ROUTES.ADMIN_ALL_ATTEMPTS, element: <AllAttemptsPage /> },
    { path: ROUTES.ADMIN_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES.ADMIN_EDIT_SETTINGS, element: <TestInfoPage /> },
]

// Конфигурация пользовательских роутов (для авторизованных пользователей)
export const userRoutes = [
    { path: ROUTES.HOME, element: <HomePage /> },
    { path: ROUTES.CREATE_TEST, element: <CreateTestPage /> },
    { path: ROUTES.PROFILE, element: <UserProfilePage /> },
    { path: ROUTES.MY_TESTS, element: <MyTestsPage /> },
    { path: ROUTES.MY_TEST_INFO, element: <TestInfoPage /> },
    { path: ROUTES.MY_TEST_ADD_QUESTIONS, element: <TestInfoPage /> },
    { path: ROUTES.MY_TEST_EDIT_SETTINGS, element: <TestInfoPage /> },
]

// Конфигурация публичных роутов
export const publicRoutes = [
    { path: ROUTES.LOGIN, element: <LoginPage /> },
    { path: ROUTES.SIGNUP, element: <SignupPage /> },
    { path: ROUTES.ACTIVATION_ERROR, element: <ActivationErrorPage /> },
    { path: ROUTES.ACTIVATION_SUCCESS, element: <ActivationSuccessPage /> },
    { path: ROUTES.START_ATTEMPT, element: <StartAttemptPage /> },
    { path: ROUTES.PASS_ATTEMPT, element: <TestTaking /> },
]
