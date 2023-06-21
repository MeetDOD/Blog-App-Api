import { Router } from "express";
import {getAllUser, getUserProfile, loginUser, signup} from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get('/',getAllUser);
userRoutes.get("/:id",getUserProfile)
userRoutes.post('/signup',signup)
userRoutes.post('/login',loginUser)

export default userRoutes;