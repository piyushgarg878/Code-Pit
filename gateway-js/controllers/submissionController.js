import * as submissionService from "../services/submissionService.js";

// Submit code
export async function submitCode(req, res) {
  try {
    const { source_code, language_id, stdin } = req.body;

    // 1. Create submission
    const submission = await submissionService.createSubmission({ source_code, language_id, stdin });

    res.status(201).json({
      token: submission.token,
      message: "Submission created, use this token to check result"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating submission" });
  }
}

// Get result by token
export async function getSubmissionResult(req, res) {
  try {
    const { token } = req.params;
    const result = await submissionService.getSubmission(token);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching submission result" });
  }
}