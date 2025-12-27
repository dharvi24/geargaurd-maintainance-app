import axios from "axios";

const api = axios.create({
  baseURL: "http://10.20.53.148:8000/api/auth", // Your backend IP
  headers: {
    "Content-Type": "application/json",
  },
});

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// LOGIN
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
