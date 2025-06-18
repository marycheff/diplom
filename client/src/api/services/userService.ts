import axiosInstance from "@/api"
import { AuthResponse, CreateUserDTO, Role, UpdateUser, UserDTO, UserFilterParams, UsersListDTO } from "@/shared/types"
import { AxiosResponse } from "axios"

class UserService {
	getUsers(page = 1, limit = 10): Promise<AxiosResponse<UsersListDTO>> {
		return axiosInstance.get<UsersListDTO>("/users", {
			params: {
				page,
				limit,
			},
		})
	}

	updatePassword(email: string, oldPassword: string, newPassword: string): Promise<AxiosResponse<AuthResponse>> {
		return axiosInstance.post<AuthResponse>("/auth/update-password", { email, oldPassword, newPassword })
	}

	getUserById(userId: string): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.get<UserDTO>(`/users/${userId}`)
	}

	updateUser(userId: string, updateData: UpdateUser): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.put<UserDTO>(`/users/update-profile/${userId}`, updateData)
	}

	deleteUser(userId: string): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.delete<UserDTO>(`/users/${userId}`)
	}

	blockUser(userId: string): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.post<UserDTO>(`/users/block/${userId}`)
	}

	unblockUser(userId: string): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.post<UserDTO>(`/users/unblock/${userId}`)
	}
	searchUser(query: string, page = 1, limit = 10): Promise<AxiosResponse<UsersListDTO>> {
		return axiosInstance.get<UsersListDTO>("/users/search", {
			params: {
				query,
				page,
				limit,
			},
		})
	}
	createUser(userData: CreateUserDTO): Promise<AxiosResponse<UserDTO>> {
		return axiosInstance.post<UserDTO>("/users/create", userData)
	}

	filterUsers(params: UserFilterParams = {}): Promise<AxiosResponse<UsersListDTO>> {
		return axiosInstance.get<UsersListDTO>("/users/filter", {
			params: {
				page: params.page || 1,
				limit: params.limit || 10,
				role: params.role as Role | undefined,
				isActivated: params.isActivated,
				isBlocked: params.isBlocked,
			},
		})
	}
}

export const userService = new UserService()
