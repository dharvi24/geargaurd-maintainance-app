import axios from "axios";

const api = axios.create({
  baseURL: "http://10.20.53.148:8000/api",
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

// ✅ ADD TECHNICIAN (PATCH)
export const addTechnicianToTeam = async (teamId, technicianId) => {
  const res = await api.patch(`/teams/${teamId}/add-member`, {
    technicianId,
  });
  return res.data;
};
