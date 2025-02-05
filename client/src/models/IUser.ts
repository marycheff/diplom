export interface IUser {
    email: string
    activated: boolean
    id: string
    role: string
    name?: string
    surname?: string
    patronymic?: string
    isBlocked?: boolean
}
