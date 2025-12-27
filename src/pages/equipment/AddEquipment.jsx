import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEquipment } from "../../services/equipmentService";

const AddEquipment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    serialNumber: "",
    category: "",
    department: "",
    location: "",
    maintenanceTeamId: "",
    defaultTechnicianId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addEquipment(formData);
      navigate("/equipment"); // ✅ go back to list
    } catch (err) {
      setError(err.message || "Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Add Equipment</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Equipment Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="serialNumber"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="maintenanceTeamId"
          placeholder="Maintenance Team ID"
          value={formData.maintenanceTeamId}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="defaultTechnicianId"
          placeholder="Default Technician ID"
          value={formData.defaultTechnicianId}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Equipment"}
        </button>

        <button
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/equipment")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddEquipment;
