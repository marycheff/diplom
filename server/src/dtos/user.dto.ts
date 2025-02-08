import { User } from "@prisma/client"

export interface UserDto {
    id: string
    email: string
    activated: boolean
    isBlocked: boolean
    role: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
}
export interface UpdateUserDto {
    name?: string
    surname?: string
    patronymic?: string
    // email: string
    // activated: boolean
    // id: string
    // role: string
    // name?: string
    // surname?: string
    // patronymic?: string
}

export const mapUserToDto = (user: User): UserDto => {
    return {
        id: user.id,
        email: user.email,
        activated: user.activated,
        isBlocked: user.isBlocked,
        role: user.role,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
    }
}
