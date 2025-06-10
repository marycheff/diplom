export const ROUTES = {
	// Публичные маршруты
	START_ATTEMPT: "test/:testId/start",
	PASS_ATTEMPT: "/attempts/:attemptId/pass",
	ATTEMPT_RESULTS: "/attempts/:attemptId/results",
	ACTIVATION_ERROR: "/activation-error",
	ACTIVATION_SUCCESS: "/activation-success",

	// Маршруты для неавторизованных пользователей
	LOGIN: "/login",
	REGISTER: "/register",
	WELCOME: "/",

	// Защищенные маршруты (для авторизованных пользователей)
	HOME: "/home",
	CREATE_TEST: "/create-test",
	PROFILE: "/profile",
	MY_TESTS: "/my-tests",
	MY_TEST_INFO: "/my-tests/:testId",
	MY_TEST_ADD_QUESTIONS: "/my-tests/:testId/add-questions",
	MY_TEST_EDIT_SETTINGS: "/my-tests/:testId/edit-settings",
	MY_ATTEMPTS: "/my-attempts",
	MY_TEST_ATTEMPT_INFO: "/my-tests/:testId/attempts/:attemptId",

	MY_TEST_ATTEMPTS: "/my-tests/:testId/attempts",

	// Админские маршруты
	ADMIN: "/admin",
	ADMIN_USERS: "/admin/users",
	ADMIN_USER_INFO: "/admin/users/:userId",
	ADMIN_CREATE_USER: "/admin/create-user",

	ADMIN_TESTS: "/admin/tests",
	ADMIN_UNMODERATED_TESTS: "/admin/tests/unmoderated",
	ADMIN_TEST_INFO: "/admin/tests/:testId",
	ADMIN_UNMODERATED_TEST_INFO: "/admin/tests/unmoderated/:testId",
	ADMIN_TEST_ATTEMPTS: "/admin/tests/:testId/attempts",
	ADMIN_UNMODERATED_TEST_ATTEMPTS: "/admin/tests/unmoderated/:testId/attempts",
	ADMIN_ATTEMPT_INFO: "/admin/attempts/:attemptId",
	ADMIN_ALL_ATTEMPTS: "/admin/attempts",
	ADMIN_ADD_QUESTIONS: "/admin/tests/:testId/add-questions",
	ADMIN_EDIT_SETTINGS: "/admin/tests/:testId/edit-settings",
	ADMIN_CREATE_TEST: "/admin/create-test",
	ADMIN_PROFILE: "/admin/profile",
	ADMIN_MY_TESTS: "/admin/my-tests",
	ADMIN_MY_TEST_INFO: "/admin/my-tests/:testId",
	ADMIN_MY_ATTEMPTS: "/admin/my-attempts",
	ADMIN_MY_ATTEMPT_INFO: "admin/my-attempts/:attemptId",
}
