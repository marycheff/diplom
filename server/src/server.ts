import { PrismaClient } from "@prisma/client"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import "module-alias/register"
import { errorMiddleware } from "./middleware/error-middleware"
import router from "./router/index"

dotenv.config()

const PORT = process.env.PORT || 3000
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))
app.use("/api", router)
app.use("/api/chat", router)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res, next)
})


const start = async () => {
    try {
        await prisma.$connect()
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
    } catch (e) {
        await prisma.$disconnect()
        process.exit(1)
    }
}

start()
