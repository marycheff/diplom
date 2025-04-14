import ApiError from "@/exceptions/api-error"
import userRepository from "@/repositories/user.repository"
import { mapUserToDto } from "@/services/mappers/user.mappers"
import { UpdateUserDTO, UserDTO, UsersListDTO } from "@/types/user.types"
import { redisClient } from "@/utils/redis-client"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"

class UserService {
    async getUserByEmail(email: string): Promise<UserDTO> {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw ApiError.BadRequest(`Пользователь c email ${email} не найден`)
        }
        return mapUserToDto(user)
    }

    async getUserById(id: string): Promise<UserDTO> {
        const cached = await redisClient.get(`user:${id}`)
        if (cached) return JSON.parse(cached)

        const user = await userRepository.findById(id)
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с id ${id} не найден`)
        }

        const userDto = mapUserToDto(user)
        await redisClient.setEx(`user:${id}`, 3600, JSON.stringify(userDto))
        return userDto
    }

    async getUsers(page = 1, limit = 10): Promise<UsersListDTO> {
        const skip = (page - 1) * limit
        const total = await userRepository.count()
        const users = await userRepository.findMany(skip, limit)

        return {
            users: users.map(user => mapUserToDto(user)),
            total,
        }
    }

    private async checkPassword(email: string, password: string): Promise<boolean> {
        const user = await userRepository.findByEmail(email)
        if (!user) {
            throw ApiError.BadRequest("Пользователь с таким email не найден")
        }

        return bcrypt.compare(password, user.password)
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
        return userRepository.updatePassword(email, hashedNewPassword)
    }

    async updateUser(id: string, updateData: UpdateUserDTO): Promise<void> {
        try {
            await userRepository.update(id, updateData)
            const cacheKey = `user:${id}`
            await redisClient.del(cacheKey)
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при обновлении данных пользователя")
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await userRepository.deleteWithTokens(id)
            const cacheKey = `user:${id}`
            await redisClient.del(cacheKey)
        } catch (error) {
            console.log(error)
            throw ApiError.BadRequest("Ошибка при удалении пользователя")
        }
    }

    async blockUser(id: string): Promise<void> {
        try {
            await userRepository.update(id, { isBlocked: true })
            await redisClient.del(`user:${id}`)
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при блокировке пользователя")
        }
    }

    async unblockUser(id: string): Promise<void> {
        try {
            await userRepository.update(id, { isBlocked: false })
            await redisClient.del(`user:${id}`)
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при разблокировке пользователя")
        }
    }

    async searchUsers(query: string, page = 1, limit = 10): Promise<UsersListDTO> {
        try {
            const skip = (page - 1) * limit
            const { data, total } = await userRepository.search(query, skip, limit)

            return {
                users: data.map(user => mapUserToDto(user)),
                total,
            }
        } catch (error) {
            throw ApiError.BadRequest("Ошибка при поиске пользователей")
        }
    }
}

export default new UserService()
