import axios from "axios";
import { config } from "../config/index.js";

export async function signup(data) {
  return axios.post(`${config.USER_SERVICE_URL}/signup`, data);
}

export async function getUserByName(name) {
  return axios.get(`${config.USER_SERVICE_URL}/users/user/${name}`);
}

export async function getUserProfile(id) {
  return axios.get(`${config.USER_SERVICE_URL}/users/profile/${id}`);
}

export async function updateUserProfile(id, data) {
  return axios.put(`${config.USER_SERVICE_URL}/users/updateprofile/${id}`, data);
}

export async function getUserByNameForAuth(name) {
  return axios.get(`${config.USER_SERVICE_URL}/users/user/${encodeURIComponent(name)}`);
}