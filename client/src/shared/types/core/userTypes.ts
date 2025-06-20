export interface UserState {
	isLoading: boolean
	isFetching: boolean
	isAuthChecking: boolean

	updatePassword: (email: string, oldPassword: string, newPassword: string) => Promise<void>
	getUsers: (page: number, limit: number) => Promise<UsersListDTO | undefined>
	getUserById: (id: string) => Promise<UserDTO | undefined>
	updateUser: (id: string, updateData: UpdateUser) => Promise<UserDTO | undefined>
	deleteUser: (id: string) => Promise<void>
	blockUser: (id: string) => Promise<void>
	unblockUser: (id: string) => Promise<void>
	searchUser: (query: string, page: number, limit: number) => Promise<UsersListDTO | undefined>
	createUser: (userData: CreateUserDTO) => Promise<UserDTO | undefined>
	filterUsers: (params: UserFilterParams) => Promise<UsersListDTO | undefined>
	// CACHE
	CACHE_EXPIRATION_TIME: number
	cache: Record<string, { data: UsersListDTO; timestamp: Date }>
	setCache: (key: string, data: UsersListDTO) => void
	clearCache: () => void
	lastCacheUpdateDate: Date | null
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
export const Role = {
	USER: "USER",
	ADMIN: "ADMIN",
} as const
export type Role = (typeof Role)[keyof typeof Role]

export const RoleLabels: Record<Role, string> = {
	[Role.USER]: "Пользователь",
	[Role.ADMIN]: "Администратор",
}
export interface UpdateUser {
	name?: string
	surname?: string
	patronymic?: string
}
export interface UserFilterParams {
	page?: number
	limit?: number
	role?: string
	isActivated?: boolean
	isBlocked?: boolean
}
