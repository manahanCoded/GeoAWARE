import { Router } from "express";

import { signupUser ,loginUser, logoutUser } from "./controllers/userController.js";
import signupValidationSchema from "../validation/signupValidation.js";
import loginValidationSchema from "../validation/loginValidation.js"

const router = Router()

router.post("/signup", signupValidationSchema, signupUser)

router.post("/login", loginValidationSchema, loginUser)

router.post("/logout", logoutUser)

export default router