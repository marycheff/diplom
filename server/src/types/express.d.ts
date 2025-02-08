import { UserDto } from "@/dtos/user.dto"
import "express"

declare module "express" {
    interface Request {
        user?: UserDto
    }
}
