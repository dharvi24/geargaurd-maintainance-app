import MaintenanceRequest from "../models/MaintenanceRequest.js";
import Equipment from "../models/Equipment.js";
import User from "../models/User.js";
import Team from "../models/Team.js";

// CREATE maintenance request
export const createRequest = async (req, res) => {
  try {
    const { subject, description, type, equipmentId, assignedTechnicianId, scheduledDate, durationHours } = req.body;
    const { createdBy } = req.body;
 // assuming auth middleware sets req.user

    if (!subject || !type || !equipmentId || !createdBy) {
      return res.status(400).json({ success: false, message: "Required fields are missing" });
    }

    // Get equipment
    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });

    const maintenanceTeamId = equipment.maintenanceTeamId;
    const technicianId = assignedTechnicianId || equipment.defaultTechnicianId || null;

    const request = await MaintenanceRequest.create({
      subject,
      description,
      type,
      equipmentId,
      maintenanceTeamId,
      assignedTechnicianId: technicianId,
      scheduledDate,
      durationHours,
      createdBy
    });

    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all maintenance requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate("equipmentId", "name serialNumber")
      .populate("maintenanceTeamId", "name")
      .populate("assignedTechnicianId", "name email")
      .populate("createdBy", "name email");

    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET request by ID
export const getRequestById = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate("equipmentId", "name serialNumber")
      .populate("maintenanceTeamId", "name")
      .populate("assignedTechnicianId", "name email")
      .populate("createdBy", "name email");

    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE maintenance request
export const updateRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    const updates = req.body;
    if (updates.equipmentId) {
      const equipment = await Equipment.findById(updates.equipmentId);
      if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });
      updates.maintenanceTeamId = equipment.maintenanceTeamId;
      updates.assignedTechnicianId = updates.assignedTechnicianId || equipment.defaultTechnicianId;
    }

    Object.assign(request, updates);
    await request.save();

    res.json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE maintenance request
export const deleteRequest = async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: "Request not found" });

    await request.remove();
    res.json({ success: true, message: "Maintenance request deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
