import UserDto from "@dtos/user-dto"
import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"
import ApiError from "../../../exceptions/api-error"

const prisma = new PrismaClient()

class UserService {
    private async checkPassword(email: string, password: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: { email },
        })
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        return isPassEquals
    }

    async getUsers(): Promise<UserDto[]> {
        const users = await prisma.user.findMany()
        return users.map(user => new UserDto(user))
    }

    async updatePassword(email: string, oldPassword: string, newPassword: string): Promise<User> {
        const isOldPasswordValid = await this.checkPassword(email, oldPassword)
        if (!isOldPasswordValid) {
            throw ApiError.BadRequest("Неверный старый пароль")
        }

        if (oldPassword === newPassword) {
            throw ApiError.BadRequest("Новый пароль не может совпадать со старым")
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { password: hashedNewPassword },
        })

        return updatedUser
    }
    async getUserByEmail(email: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
        }
        const userDto = new UserDto(user)
        return userDto
    }
    async getUserById(id: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с id ${id} не найден`)
        }
        const userDto = new UserDto(user)
        return userDto
    }
}

export default new UserService()
