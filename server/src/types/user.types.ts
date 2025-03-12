import { Role, User } from "@prisma/client"

export interface UserDTO {
    id: string
    email: string
    isActivated: boolean
    isBlocked: boolean
    role: Role
    name?: string | null
    surname?: string | null
    patronymic?: string | null
}
export interface CreateUserDTO {
    email: string
    password: string
    isActivated: boolean
    activationLink?: string
}
export interface UpdateUserDTO {
    // email?: string
    // password?: string
    // isActivated?: boolean
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
