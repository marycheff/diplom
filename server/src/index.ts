import { errorMiddleware } from "@/middleware/error.middleware"
import authRoutes from "@/routes/auth.routes"
import chatRoutes from "@/routes/chat.routes"
import testRoutes from "@/routes/test.routes"
import userRoutes from "@/routes/user.routes"
import { PrismaClient } from "@prisma/client"
import { parse } from "cookie"
import cors from "cors"
import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import "module-alias/register"
import envConfig from "./config/envConfig"

dotenv.config()

const PORT = envConfig.PORT
const app = express()
const prisma = new PrismaClient()

app.use(express.json({ limit: "1mb" }))
app.use((req: Request, res: Response, next: NextFunction) => {
    req.cookies = req.headers.cookie ? parse(req.headers.cookie) : {}
    next()
})

app.use(cors({ credentials: true, origin: envConfig.CLIENT_URL }))
// const allowedOrigins = [
//     "http://192.168.0.110:3000",
//     "http://localhost:3000"
// ]

// app.use(
//     cors({
//         credentials: true,
//         origin: (origin, callback) => {
//             if (!origin || allowedOrigins.includes(origin)) {
//                 callback(null, true)
//             } else {
//                 callback(new Error("Not allowed by CORS"))
//             }
//         },
//     })
// )

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/test", testRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorMiddleware(err, req, res, next)
})
app.get("/", (req: Request, res: Response) => {
    res.send("Сервер работает")
})

const start = async () => {
    try {
        await prisma.$connect()
        // app.listen(PORT, () => console.log(`✓ Сервер запущен. Порт ${PORT}`))
        app.listen(PORT, "0.0.0.0", () => console.log(`✓ Сервер запущен. Порт ${PORT}`))
    } catch {
        await prisma.$disconnect()
        process.exit(1)
    }
}

start()

export default app
