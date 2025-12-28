import Equipment from "../models/Equipment.js";
import Team from "../models/Team.js";
import User from "../models/User.js";

// CREATE equipment
export const createEquipment = async (req, res) => {
  try {
   const { name, serialNumber, category, department, location, purchaseDate, warrantyExpiry, maintenanceTeamId, defaultTechnicianId } = req.body;

if (!name || !maintenanceTeamId || !serialNumber || !category || !location) {
  return res.status(400).json({ success: false, message: "Required fields are missing" });
}

    // Validate team
    const team = await Team.findById(maintenanceTeamId);
    if (!team) return res.status(404).json({ success: false, message: "Team not found" });

    // Validate technician if provided
    if (defaultTechnicianId) {
      const technician = await User.findById(defaultTechnicianId);
      if (!technician) return res.status(404).json({ success: false, message: "Technician not found" });
    }

    const equipment = await Equipment.create({
      name,
      serialNumber,
      category,
      department,
      location,
      purchaseDate,
      warrantyExpiry,
      maintenanceTeamId,
      defaultTechnicianId
    });

    res.status(201).json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET all equipment
export const getAllEquipment = async (req, res) => {
  try {
    const equipments = await Equipment.find()
      .populate("maintenanceTeamId", "name")
      .populate("defaultTechnicianId", "name email");
    res.json({ success: true, equipments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET equipment by ID
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id)
      .populate("maintenanceTeamId", "name")
      .populate("defaultTechnicianId", "name email");
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });
    res.json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE equipment
export const updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });

    const updates = req.body;
    Object.assign(equipment, updates);

    await equipment.save();
    res.json({ success: true, equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE equipment
export const deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ success: false, message: "Equipment not found" });

    await equipment.remove();
    res.json({ success: true, message: "Equipment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
