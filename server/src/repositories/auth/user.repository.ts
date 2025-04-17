import { CreateUserDTO } from "@/types/user.types"
import { getActivationLinkExpDate, getResetCodeExpDate } from "@/utils/math"
import { Prisma, PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

class UserRepository {
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

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        })
    }

    async create(userData: CreateUserDTO, hashedPassword: string, activationLink: string, role: "USER"): Promise<User> {
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

    async updateActivationLink(email: string, activationLink: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: { activationLink, activationLinkExp: getActivationLinkExpDate() },
        })
    }

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

    async saveToken(userId: string, refreshToken: string) {
        return prisma.token.upsert({
            where: { userId },
            update: { refreshToken },
            create: { userId, refreshToken },
        })
    }

    async findToken(refreshToken: string) {
        return prisma.token.findFirst({
            where: { refreshToken },
        })
    }

    async removeToken(refreshToken: string) {
        return prisma.token.delete({
            where: { refreshToken },
        })
    }

    async update(id: string, data: Partial<User>): Promise<User> {
        return prisma.user.update({
            where: { id },
            data,
        })
    }

    async deleteWithTokens(userId: string): Promise<void> {
        await prisma.$transaction([
            prisma.token.deleteMany({ where: { userId } }),
            prisma.user.delete({ where: { id: userId } }),
        ])
    }

    async updatePassword(email: string, newPasswordHash: string): Promise<User> {
        return prisma.user.update({
            where: { email },
            data: { password: newPasswordHash },
        })
    }

    async findMany(skip: number, take: number): Promise<User[]> {
        return prisma.user.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
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

    async count(where?: Prisma.UserWhereInput): Promise<number> {
        return prisma.user.count({ where })
    }
}

export default new UserRepository()
