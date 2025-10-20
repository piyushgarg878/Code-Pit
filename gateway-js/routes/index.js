import express from "express";
import userRoutes from "./userRoutes.js";
import problemRoutes from "./problemRoutes.js"

const router = express.Router();
router.use(userRoutes);
router.use(problemRoutes);


export default router;