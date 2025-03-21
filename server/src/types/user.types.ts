import { Role, User } from "@prisma/client"


export interface UsersListDTO{
    users: UserDTO[]
    total: number
}

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
