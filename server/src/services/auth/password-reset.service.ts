import ApiError from "@/exceptions/api-error"
import userRepository from "@/repositories/auth/user.repository"
import bcrypt from "bcryptjs"

class PasswordResetService {
    async saveResetCode(email: string, code: string) {
        const hashedCode = await bcrypt.hash(code, 10)
        await userRepository.saveResetCode(email, hashedCode)
    }

    async verifyResetCode(email: string, code: string): Promise<boolean> {
        const user = await userRepository.findByEmail(email)
        if (!user) throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)

        if (!user.resetCode) {
            return false
        }

        return bcrypt.compare(code, user.resetCode)
    }

    async resetPassword(email: string, newPassword: string) {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await userRepository.resetPassword(email, hashedPassword)
    }
}

export default new PasswordResetService()
