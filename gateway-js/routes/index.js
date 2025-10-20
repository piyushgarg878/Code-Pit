import express from "express";
import userRoutes from "./userRoutes.js";
import problemRoutes from "./problemRoutes.js"
import submissionRoutes from "./submissionRoutes.js"

const router = express.Router();
router.use(userRoutes);
router.use(problemRoutes);
router.use(submissionRoutes);



export default router;