import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const PROBLEM_SERVICE_URL = process.env.PROBLEM_SERVICE_URL || "http://localhost:8081"; // replace with actual URL

export async function getAllQuestions(filters) {
  const query = filters ? `?${new URLSearchParams(filters).toString()}` : "";
  return axios.get(`${PROBLEM_SERVICE_URL}/api/v1/questions${query}`);
}

export async function getQuestionById(id) { 
  return axios.get(`${PROBLEM_SERVICE_URL}/api/v1/questions/${id}`);
}

export async function getQuestionBySlug(slug) {
  return axios.get(`${PROBLEM_SERVICE_URL}/api/v1/questions/slug/${slug}`);
}