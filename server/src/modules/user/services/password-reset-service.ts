import ApiError from "@exceptions/api-error"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

class PasswordResetService {
    async saveResetCode(email: string, code: string) {
        const hashedCode = await bcrypt.hash(code, 10)
        await prisma.user.update({
            where: { email },
            data: { resetCode: hashedCode },
        })
    }

    async verifyResetCode(email: string, code: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { email: email },
        })
        if (!user) throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)

        if (!user.resetCode) {
            return false
        }

        return bcrypt.compare(code, user.resetCode)
    }

    async resetPassword(email: string, newPassword: string) {
        console.log(newPassword)

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword, resetCode: null }, // Обнуляем код после сброса
        })
    }
}

export default new PasswordResetService()
