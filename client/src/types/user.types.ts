import { IUpdateUser } from "@/models/IUpdateUser"

export interface UserState {
    isLoading: boolean
    isUsersFetching: boolean
    isAuthChecking: boolean
    updatePassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>
    getUsers: () => Promise<any>
    getUserById: (id: string) => Promise<any>
    updateUser: (id: string, updateData: IUpdateUser) => Promise<UserDTO | undefined>
    deleteUser: (id: string) => Promise<void>
    blockUser: (id: string) => Promise<void>
    unblockUser: (id: string) => Promise<void>
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

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}
