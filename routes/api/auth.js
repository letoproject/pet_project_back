import express from "express";
import authController from "../../controllers/auth-controller.js"
import { validateBody } from "../../decorators/index.js";
import { userSignupSchema, usersSigninSchema } from "../../models/user.js";

const authRouter = express.Router()

authRouter.post("/signup")
authRouter.post("/signin")

authRouter.post("/signup", validateBody(userSignupSchema), authController.signup)
authRouter.post("/signin", validateBody(usersSigninSchema), authController.signin)

export default authRouter;