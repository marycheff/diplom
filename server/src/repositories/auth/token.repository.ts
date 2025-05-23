import { prisma } from "@/utils/prisma-client"
import { Token } from "@prisma/client"

class TokenRepository {
    // FIND
    async findById(refreshToken: string) {
        return prisma.token.findFirst({
            where: { refreshToken },
        })
    }

    async findByToken(refreshToken: string): Promise<Token | null> {
        return prisma.token.findUnique({
            where: { refreshToken },
        })
    }

    // UPSERT
    async upsert(userId: string, refreshToken: string) {
        return prisma.token.upsert({
            where: { userId },
            update: { refreshToken },
            create: { userId, refreshToken },
        })
    }

    // DELETE
    async delete(refreshToken: string) {
        return prisma.token.delete({
            where: { refreshToken },
        })
    }
}

export default new TokenRepository()
