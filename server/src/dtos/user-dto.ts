import { User } from "@prisma/client"

class UserDto {
    email: string
    id: string
    activated: boolean
    role: string
    firstName?: string | null
    secondName?: string | null
    patronymic?: string | null
    constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.activated = user.activated
        this.role = user.role
        this.firstName = user.firstName
        this.secondName = user.secondName
        this.patronymic = user.patronymic
    }
}
export default UserDto
