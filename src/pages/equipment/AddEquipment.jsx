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
      navigate("/equipment"); // go back to list
    } catch (err) {
      setError(err.message || "Failed to add equipment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Add Equipment</h2>
            <p style={styles.subtitle}>
              Register a new asset and link it to the correct team and technician.
            </p>
          </div>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Equipment Name</label>
            <input
              name="name"
              placeholder="e.g. MRI Scanner"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Serial Number</label>
            <input
              name="serialNumber"
              placeholder="e.g. SN-12345-AB"
              value={formData.serialNumber}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Category</label>
              <input
                name="category"
                placeholder="e.g. Imaging"
                value={formData.category}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Department</label>
              <input
                name="department"
                placeholder="e.g. Radiology"
                value={formData.department}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Location</label>
            <input
              name="location"
              placeholder="e.g. Room B-12"
              value={formData.location}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Maintenance Team ID</label>
              <input
                name="maintenanceTeamId"
                placeholder="Team ID"
                value={formData.maintenanceTeamId}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Default Technician ID</label>
              <input
                name="defaultTechnicianId"
                placeholder="Technician ID"
                value={formData.defaultTechnicianId}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.actions}>
            <button
              type="button"
              style={styles.secondaryBtn}
              onClick={() => navigate("/equipment")}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.primaryBtn,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "Add Equipment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "720px",
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "24px 26px 26px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  header: {
    marginBottom: "18px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #22c55e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "12px",
    color: "#6b7280",
    fontWeight: 500,
  },
  input: {
    padding: "10px 12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#f9fafb",
    outline: "none",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px",
  },
  actions: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },
  primaryBtn: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1 0%, #22c55e 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  },
  secondaryBtn: {
    padding: "10px 18px",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#4b5563",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
  },
};

export default AddEquipment;