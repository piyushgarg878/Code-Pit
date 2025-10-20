import express from "express";
import * as userController from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", userController.signup);
router.get("/users/user/:name", userController.getUserByName);
router.get("/users/profile/:id", authenticateToken, userController.getUserProfile);
router.put("/users/updateprofile/:id", authenticateToken, userController.updateUserProfile);
router.post("/signin", userController.signin);


export default router;