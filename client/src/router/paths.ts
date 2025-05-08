export const ROUTES = {
    // Публичные маршруты
    START_ATTEMPT: "/:testId/start",
    PASS_ATTEMPT: "/my-attempts/:attemptId",
    ATTEMPT_RESULTS: "/my-attempts/:attemptId/results",

    // Маршруты для неавторизованных пользователей
    LOGIN: "/login",
    REGISTER: "/register",
    ACTIVATION_ERROR: "/activation-error",
    ACTIVATION_SUCCESS: "/activation-success",
    WELCOME: "/",

    // Защищенные маршруты (для авторизованных пользователей)
    HOME: "/home",
    CREATE_TEST: "/create-test",
    PROFILE: "/profile",
    MY_TESTS: "/my-tests",
    MY_TEST_INFO: "/my-tests/:testId",
    MY_TEST_ADD_QUESTIONS: "/my-tests/:testId/add-questions",
    MY_TEST_EDIT_SETTINGS: "/my-tests/:testId/edit-settings",

    // Админские маршруты
    ADMIN: "/admin",
    ADMIN_USERS: "/admin/users",
    ADMIN_USER_INFO: "/admin/users/:userId",
    ADMIN_TESTS: "/admin/tests",
    ADMIN_TEST_INFO: "/admin/tests/:testId",
    ADMIN_TEST_ATTEMPTS: "/admin/tests/:testId/attempts",
    ADMIN_ATTEMPT_INFO: "/admin/attempts/:attemptId",
    ADMIN_ALL_ATTEMPTS: "/admin/attempts",
    ADMIN_ADD_QUESTIONS: "/admin/tests/:testId/add-questions",
    ADMIN_EDIT_SETTINGS: "/admin/tests/:testId/edit-settings",
    ADMIN_CREATE_TEST: "/admin/create-test",
    ADMIN_PROFILE: "/admin/profile",
    ADMIN_MY_TESTS: "/admin/my-tests",
    ADMIN_MY_TEST_INFO: "/admin/my-tests/:testId",
}
