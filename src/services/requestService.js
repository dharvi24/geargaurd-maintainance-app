// src/services/requestService.js
import axios from "./api";

// Get all requests
export const getRequests = async () => {
  try {
    const response = await axios.get("/requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

// Create a new request
export const createRequest = async (requestData) => {
  try {
    const response = await axios.post("/requests", requestData);
    return response.data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

// Get equipment list (optional, for dropdowns)
export const getEquipmentList = async () => {
  try {
    const response = await axios.get("/equipment");
    return response.data;
  } catch (error) {
    console.error("Error fetching equipment:", error);
    throw error;
  }
};

// Get teams (optional, for dropdowns)
export const getTeams = async () => {
  try {
    const response = await axios.get("/teams");
    return response.data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
};

// Get technicians (optional, for dropdowns)
export const getTechnicians = async (teamId) => {
  try {
    const response = await axios.get(`/teams/${teamId}/technicians`);
    return response.data;
  } catch (error) {
    console.error("Error fetching technicians:", error);
    throw error;
  }
};
