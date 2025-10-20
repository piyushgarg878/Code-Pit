import * as userService from "../services/userService.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export async function signup(req, res) {
  try {
    const response = await userService.signup(req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}

export async function getUserByName(req, res) {
  try {
    const response = await userService.getUserByName(req.params.name);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}

export async function getUserProfile(req, res) {
  try {
    const response = await userService.getUserProfile(req.params.id);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const response = await userService.updateUserProfile(req.params.id, req.body);
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}


export async function signin(req, res) {
  try {
    const { name, password } = req.body;

    // 1. Fetch user by name
    const response = await userService.getUserByNameForAuth(name);
    const user = response.data;

    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate JWT
    const token = jwt.sign({ id: user.id, name: user.name }, config.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, user_id: user.id });
  } catch (err) {
    res.status(err.response?.status || 500).json({ message: err.response?.data?.message || "Internal Server Error" });
  }
}