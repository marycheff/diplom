import { User } from "@prisma/client"

export interface UserDTO {
    id: string
    email: string
    isActivated: boolean
    isBlocked: boolean
    role: "ADMIN" | "USER"
    name?: string | null
    surname?: string | null
    patronymic?: string | null
}
export interface UpdateUserDTO {
    name?: string
    surname?: string
    patronymic?: string
}

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
