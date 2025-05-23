import { CreateUserDTO } from "@/types/core/user.types"
import { getActivationLinkExpDate, getResetCodeExpDate } from "@/utils/math"
import { prisma } from "@/utils/prisma-client"
import { Prisma, Role, User } from "@prisma/client"

class UserRepository {
    // CREATE
    async create(
        userData: CreateUserDTO,
        hashedPassword: string,
        activationLink: string | null,
        role: Role
    ): Promise<User> {
        return prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
                activationLink,
                activationLinkExp: getActivationLinkExpDate(),
                role,
            },
        })
    }

    // FIND
    async findMany(skip: number, limit: number): Promise<User[]> {
        return prisma.user.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
        })
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        })
    }

    async findByActivationLink(activationLink: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: { activationLink },
        })
    }

    async findExpiredActivationLinks(batchSize: number): Promise<User[]> {
        return prisma.user.findMany({
            where: {
                activationLinkExp: { lt: new Date() },
            },
            take: batchSize,
        })
    }

    async findExpiredResetCodes(batchSize: number): Promise<User[]> {
        return prisma.user.findMany({
            where: {
                resetCodeExp: { lt: new Date() },
            },
            take: batchSize,
        })
    }

    // UPDATE
    async update(id: string, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        })
    }

    async updateActivationLink(email: string, activationLink: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: { activationLink, activationLinkExp: getActivationLinkExpDate() },
        })
    }

    async updatePassword(email: string, newPasswordHash: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: { password: newPasswordHash },
        })
    }

    // DELETE
    async delete(userId: string): Promise<void> {
        await prisma.user.delete({ where: { id: userId } })
    }

    async deleteActivationLinksByUsersIds(userIds: string[]): Promise<Prisma.BatchPayload> {
        return prisma.user.updateMany({
            where: { id: { in: userIds } },
            data: { activationLink: null, activationLinkExp: null },
        })
    }

    async deleteResetCodesByUsersIds(userIds: string[]): Promise<Prisma.BatchPayload> {
        return prisma.user.updateMany({
            where: { id: { in: userIds } },
            data: { resetCode: null, resetCodeExp: null },
        })
    }

    // COUNT
    async count(where?: Prisma.UserWhereInput): Promise<number> {
        return prisma.user.count({ where })
    }

    // OTHER
    async activate(id: string): Promise<User> {
        return prisma.user.update({
            where: { id },
            data: {
                isActivated: true,
                activationLink: null,
                activationLinkExp: null,
            },
        })
    }

    async search(query: string, skip: number, take: number): Promise<User[]> {
        const where = {
            OR: [
                { email: { contains: query } },
                { name: { contains: query } },
                { surname: { contains: query } },
                { patronymic: { contains: query } },
            ],
        }
        return prisma.user.findMany({
            skip,
            take,
            where,
            orderBy: { createdAt: "desc" },
        })
    }

    async saveResetCode(email: string, hashedCode: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: { resetCode: hashedCode, resetCodeExp: getResetCodeExpDate() },
        })
    }

    async resetPassword(email: string, hashedPassword: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: {
                password: hashedPassword,
                resetCode: null,
                resetCodeExp: null,
            },
        })
    }
}

export default new UserRepository()
