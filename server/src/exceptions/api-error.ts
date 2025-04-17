class ApiError extends Error {
    status: number
    errors: string[]
    constructor(status: number, message: string, errors: string[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static Unauthorized() {
        return new ApiError(401, "Пользователь не авторизован")
    }
    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors)
    }
    static NotFound(message?: string) {
        return new ApiError(404, message || "Ресурс не найден")
    }
    static Forbidden() {
        return new ApiError(403, "Недостаточно прав")
    }
    static InternalError(message?: string) {
        if (message) {
            return new ApiError(500, `Ошибка сервера: ${message}`)
        }
        return new ApiError(500, "Ошибка сервера")
    }
}
export default ApiError
