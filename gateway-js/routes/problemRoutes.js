import express from "express";
import * as problemController from "../controllers/problemController.js";

const router = express.Router();

router.get("/problems", problemController.getAllQuestions);
router.get("/problems/:id", problemController.getQuestionById);
router.get("/problems/slug/:slug", problemController.getQuestionBySlug);

export default router;