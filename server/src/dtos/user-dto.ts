import { User } from "@prisma/client"

class UserDto {
    email: string
    id: string
    activated: boolean
    constructor(user: User) {
        this.email = user.email
        this.id = user.id
        this.activated = user.activated
    }
}
export default UserDto