import { UserDto, mapUserToDto } from "@dtos/user-dto"
import { UpdateUserDto } from "@dtos/user-update.dto"
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
        return users.map(mapUserToDto)
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
        return mapUserToDto(user)
    }
    async getUserById(id: string): Promise<UserDto> {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с id ${id} не найден`)
        }
        return mapUserToDto(user)
    }

    async updateUser(id: string, updateData: UpdateUserDto): Promise<void> {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            })

            if (!user) {
                throw ApiError.BadRequest("Пользователь не найден")
            }

            // Проверяем, что хотя бы одно поле передано для обновления
            if (!updateData.firstName && !updateData.secondName && !updateData.patronymic) {
                throw ApiError.BadRequest("Нет данных для обновления")
            }

            await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    ...updateData, // Передаем объект с полями, которые могут быть необязательными
                },
            })
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при обновлении данных пользователя")
        }
    }
}

export default new UserService()
