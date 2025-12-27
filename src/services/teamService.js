import axios from "axios";

const api = axios.create({
  baseURL: "http://10.165.80.98:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// GET ALL TEAMS
export const getTeams = async () => {
  try {
    const res = await api.get("/teams");

    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.teams)) return res.data.teams;
    if (Array.isArray(res.data.data)) return res.data.data;

    return [];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// GET SINGLE TEAM
export const getTeamById = async (id) => {
  try {
    const res = await api.get(`/teams/${id}`);

    if (res.data.team) return res.data.team;
    if (res.data.data) return res.data.data;

    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// CREATE TEAM
export const createTeam = async (teamData) => {
  const res = await api.post("/teams", teamData);
  return res.data;
};

/// ✅ Add technician to team
export const addTechnicianToTeam = async (teamId, technicianId) => {
  try {
    const res = await api.patch(`/teams/${teamId}/add-member`, {
      technicianId, // backend expects this field
    });

    return res.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 403) {
        throw new Error(
          "You do not have permission to add a member to this team."
        );
      }
      throw new Error(
        `Request failed: ${error.response.status} ${error.response.statusText}`
      );
    } else if (error.request) {
      throw new Error("No response from server. Please check your network.");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

