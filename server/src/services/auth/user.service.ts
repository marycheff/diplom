import ApiError from "@/exceptions/api-error"
import { mapUserToDto, UpdateUserDTO, UserDTO } from "@/types/user.types"
import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

class UserService {
    async getUserByEmail(email: string): Promise<UserDTO> {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
        }
        return mapUserToDto(user)
    }
    async getUserById(id: string): Promise<UserDTO> {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с id ${id} не найден`)
        }
        return mapUserToDto(user)
    }
    async getUsers(): Promise<UserDTO[]> {
        const users = await prisma.user.findMany()
        return users.map(mapUserToDto)
    }

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

    async updateUser(id: string, updateData: UpdateUserDTO): Promise<void> {
        try {
            // Проверяем, что хотя бы одно поле передано для обновления
            if (!updateData.name && !updateData.surname && !updateData.patronymic) {
                throw ApiError.BadRequest("Нет данных для обновления")
            }

            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    ...updateData,
                },
            })
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при обновлении данных пользователя")
        }
    }

    async deleteUser(id: string) {
        try {
            await prisma.user.delete({
                where: {
                    id: id,
                },
            })
        } catch (error: any) {
            throw ApiError.BadRequest("Ошибка при удалении пользователя")
        }
    }

    async blockUser(id: string) {
        try {
            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    isBlocked: true,
                },
            })
        } catch (error: any) {
            throw ApiError.BadRequest("Ошибка при блокировке пользователя")
        }
    }
    async unblockUser(id: string) {
        try {
            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    isBlocked: false,
                },
            })
        } catch (error: any) {
            throw ApiError.BadRequest("Ошибка при разблокировке пользователя")
        }
    }
}

export default new UserService()
