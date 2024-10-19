class ApiError extends Error {
    status: number
    errors: string[]
    constructor(status: number, message: string, errors: string[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, "Пользователь не авторизован")
    }
    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors)
    }
    static Forbidden() {
        return new ApiError(403, "Недостаточно прав")
    }
}
export default ApiError
