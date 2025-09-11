import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./src/config/db.js"
import goalRoutes from "./src/routes/goalRoutes.js"
import userRoute from "./src/routes/userRoutes.js"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/goal',goalRoutes)
app.use('/api/auth',userRoute)

connectDB()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))