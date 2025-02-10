export interface User {
    id: string
    email: string
    password: string
    isActivated: boolean
    role: string
    activationLink?: string
    isBlocked: boolean
    name?: string
    surname?: string
    patronymic?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateUser {
    email: string
    password: string
    isActivated: boolean
    activationLink?: string
}
export interface UpdateUser {
    email?: string
    password?: string
    isActivated?: boolean
}
