import * as problemService from "../services/problemService.js";

export async function getAllQuestions(req, res) {
  try {
    const response = await problemService.getAllQuestions(req.query);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}

export async function getQuestionById(req, res) {
  try {
    const response = await problemService.getQuestionById(req.params.id);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}

export async function getQuestionBySlug(req, res) {
  try {
    const response = await problemService.getQuestionBySlug(req.params.slug);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}