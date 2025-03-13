import { UserDTO } from "@/types/user.types"
import { User } from "@prisma/client"

export const mapUserToDto = (user: User): UserDTO => {
    return {
        id: user.id,
        email: user.email,
        isActivated: user.isActivated,
        isBlocked: user.isBlocked,
        role: user.role,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
    }
}
