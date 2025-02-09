export interface IUser {
    email: string
    isActivated: boolean
    id: string
    role: "ADMIN" | "USER"
    name?: string
    surname?: string
    patronymic?: string
    isBlocked?: boolean
}
