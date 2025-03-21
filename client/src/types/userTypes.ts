export interface UserState {
    isLoading: boolean
    isUsersFetching: boolean
    isAuthChecking: boolean
    updatePassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>
    getUsers: () => Promise<UsersListDTO | undefined>
    getUserById: (id: string) => Promise<UserDTO | undefined>
    updateUser: (id: string, updateData: UpdateUser) => Promise<UserDTO | undefined>
    deleteUser: (id: string) => Promise<void>
    blockUser: (id: string) => Promise<void>
    unblockUser: (id: string) => Promise<void>
}
export interface UsersListDTO {
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

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}
export interface UpdateUser {
    name?: string
    surname?: string
    patronymic?: string
}
