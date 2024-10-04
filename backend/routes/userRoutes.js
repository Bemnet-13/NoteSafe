import express from "express";
import * as userController from "../controllers/userContoller.js";
const authRouter = express.Router();

// Register User
authRouter.post("/register", userController.registerUser);
// Login User
authRouter.post("/login", userController.loginUser);

authRouter.get("/profile/:userId", userController.fetchUserProfile);
// Logout User
authRouter.get("/logout", userController.logoutUser);

export default authRouter;
