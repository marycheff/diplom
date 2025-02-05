import { User } from "@prisma/client"

export interface UserDto {
    email: string
    id: string
    activated: boolean
    role: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
    isBlocked?: boolean
}

export const mapUserToDto = (user: User): UserDto => {
    return {
        email: user.email,
        id: user.id,
        activated: user.activated,
        role: user.role,
        name: user.name,
        surname: user.surname,
        patronymic: user.patronymic,
        isBlocked: user.isBlocked,
    }
}
