import { Role } from "@prisma/client"

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
export interface JwtPayload extends UserDTO {
    iat: number 
    exp: number
}
export interface UsersListDTO {
    users: UserDTO[]
    total: number
}

export interface CreateUserDTO {
    email: string
    password: string
    role?: Role
    isActivated: boolean
    activationLink?: string
    name?: string | null
    surname?: string | null
    patronymic?: string | null
}

export interface UpdateUserDTO {
    name?: string
    surname?: string
    patronymic?: string
}
