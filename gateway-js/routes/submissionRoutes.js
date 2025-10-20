import express from "express";
import * as submissionController from "../controllers/submissionController.js";

const router = express.Router();

// Submit code
router.post("/submissions", submissionController.submitCode);

// Get submission result
router.get("/submissions/:token", submissionController.getSubmissionResult);

export default router;