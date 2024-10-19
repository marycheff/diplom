import { User } from "@prisma/client"

class UserDto {
    email: string
    id: string
    activated: boolean
    role: string
    constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.activated = user.activated
        this.role = user.role
    }
}
export default UserDto