import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true
    },

    category: {
      type: String,
      required: true
    },

    department: {
      type: String
    },

    location: {
      type: String,
      required: true
    },

    purchaseDate: {
      type: Date
    },

    warrantyExpiry: {
      type: Date
    },

    maintenanceTeamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true
    },

    defaultTechnicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isScrapped: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Equipment", equipmentSchema);
