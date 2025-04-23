import tokenService from "@/services/auth/token.service"
import { UserDTO } from "@/types"
import { NextFunction, Request, Response } from "express"
export default function conditionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const accessToken = authorizationHeader.split(" ")[1]

            if (accessToken) {
                const userData = tokenService.validateAccessToken(accessToken) as UserDTO

                if (userData) {
                    req.user = userData
                }
            }
        }
        next()
    } catch (e) {
        next()
    }
}
