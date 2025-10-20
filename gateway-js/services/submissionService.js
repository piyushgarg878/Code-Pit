import axios from "axios";

const JUDGE0_URL = process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com";
const JUDGE0_KEY = process.env.JUDGE0_KEY || ""; // If using RapidAPI

const axiosInstance = axios.create({
  baseURL: JUDGE0_URL,
  headers: {
    "Content-Type": "application/json",
    ...(JUDGE0_KEY && { "X-RapidAPI-Key": JUDGE0_KEY })
  }
});

// Create a submission
export async function createSubmission({ source_code, language_id, stdin }) {
  const response = await axiosInstance.post("/submissions?base64_encoded=false&wait=false", {
    source_code,
    language_id,
    stdin
  });
  return response.data; // Contains submission token
}

// Get submission result by token
export async function getSubmission(token) {
  const response = await axiosInstance.get(`/submissions/${token}?base64_encoded=false`);
  return response.data;
}