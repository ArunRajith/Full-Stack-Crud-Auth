import express from "express"
import { createGoal } from "../controllers/goalcontrollers.js"
import { getGoal } from "../controllers/goalcontrollers.js"
import { updateGoal } from "../controllers/goalcontrollers.js"
import { deleteGoal } from "../controllers/goalcontrollers.js"
import { protect } from "../middleware/authMiddleware.js"

const goalRoutes = express.Router()

goalRoutes.post('/create',protect, createGoal)
goalRoutes.get('/get',protect, getGoal)
goalRoutes.put('/update/:id',protect, updateGoal)
goalRoutes.delete('/delete/:id',protect, deleteGoal)

export default goalRoutes
