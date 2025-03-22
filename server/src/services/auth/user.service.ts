import ApiError from "@/exceptions/api-error"
import { mapUserToDto } from "@/services/mappers/user.mappers"
import { UpdateUserDTO, UserDTO, UsersListDTO } from "@/types/user.types"
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
    async getUsers(page = 1, limit = 10): Promise<UsersListDTO> {
        const skip = (page - 1) * limit
        const total = await prisma.user.count()
        const users = await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        })
        return {
            users: users.map(user => mapUserToDto(user)),
            total,
        }
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
            // if (!updateData.name && !updateData.surname && !updateData.patronymic) {
            //     throw ApiError.BadRequest("Нет данных для обновления")
            // }

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
            await prisma.$transaction(async prisma => {
                await prisma.token.deleteMany({
                    where: {
                        userId: id,
                    },
                })

                await prisma.user.delete({
                    where: {
                        id: id,
                    },
                })
            })
        } catch (error) {
            console.log(error)
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
        } catch (error) {
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
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при разблокировке пользователя")
        }
    }

    async searchUser(query: string, page = 1, limit = 10): Promise<UsersListDTO> {
        try {
            const skip = (page - 1) * limit
            const result = await prisma.user.findMany({
                skip,
                take: limit,
                where: {
                    OR: [
                        { email: { contains: query } },
                        { name: { contains: query } },
                        { surname: { contains: query } },
                        { patronymic: { contains: query } },
                    ],
                },
                orderBy: { createdAt: "desc" },
            })

            const total = await prisma.user.count({
                where: {
                    OR: [
                        { email: { contains: query } },
                        { name: { contains: query } },
                        { surname: { contains: query } },
                        { patronymic: { contains: query } },
                    ],
                },
            })
            return {
                users: result.map(user => mapUserToDto(user)),
                total,
            }
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при поиске пользователей")
        }
    }
}

export default new UserService()
