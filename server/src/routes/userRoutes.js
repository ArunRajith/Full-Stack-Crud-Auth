import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoute = express.Router()

userRoute.post('/register',registerUser)
userRoute.post('/login',loginUser)
userRoute.get('/profile',protect,getUser)

export default userRoute