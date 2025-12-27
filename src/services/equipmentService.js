import axios from "axios";

const api = axios.create({
  baseURL: "http://10.165.80.98:8000/api", // Your backend IP
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllEquipment = async () => {
  try {
    const res = await api.get("/equipment");
    return res.data.equipments || []; // ✅ RETURN ARRAY ONLY
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEquipmentById = async (id) => {
  try {
    const res = await api.get(`/equipment/${id}`);
    return res.data.equipment; // ✅ RETURN OBJECT ONLY
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


//ADD EQUIPMENT
export const addEquipment = async (equipmentData) => {
  try {
    const res = await api.post("/equipment", equipmentData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

