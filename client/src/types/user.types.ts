import { IUpdateUser } from "@/models/IUpdateUser"

export interface UserState {
    isLoading: boolean
    updatePassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>
    getUsers: () => Promise<any>
    getUserById: (id: string) => Promise<any>
    updateUser: (id: string, updateData: IUpdateUser) => Promise<UserDto |undefined>
    deleteUser: (id: string) => Promise<void>
    blockUser: (id: string) => Promise<void>
    unblockUser: (id: string) => Promise<void>
}

export interface UserDto {
    email: string
    activated: boolean
    id: string
    role: string
    name?: string
    surname?: string
    patronymic?: string
}
