// user.types.ts
export interface ICreateUser {
    email: string
    password: string
    activated?: boolean // Если активация не обязательна, можно сделать необязательным
    activationLink?: string
}
// export interface ITokenPayload {
//     id: string
//     email: string
//     activated: boolean
// }

export interface IUpdateUser {
    email?: string // Поля могут быть необязательными для обновления
    password?: string
    activated?: boolean
}
