import { User } from "@prisma/client"

export interface UserDto {
    email: string
    id: string
    activated: boolean
    role: string
    firstName?: string | null
    secondName?: string | null
    patronymic?: string | null
}

export const mapUserToDto = (user: User): UserDto => {
    return {
        email: user.email,
        id: user.id,
        activated: user.activated,
        role: user.role,
        firstName: user.firstName,
        secondName: user.secondName,
        patronymic: user.patronymic,
    }
}
