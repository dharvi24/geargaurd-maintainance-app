// src/pages/requests/CreateRequest.jsx
import React, { useEffect, useState } from "react";
import { createRequest, getEquipmentList, getTeams, getTechnicians } from "../../services/requestService";

const CreateRequest = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    type: "Corrective",
    equipmentId: "",
    maintenanceTeamId: "",
    assignedTechnicianId: "",
    scheduledDate: "",
    durationHours: "",
  });

  const [equipment, setEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData = await getEquipmentList();
        const teamData = await getTeams();
        setEquipment(equipmentData);
        setTeams(teamData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.maintenanceTeamId) {
      const fetchTechnicians = async () => {
        try {
          const techData = await getTechnicians(formData.maintenanceTeamId);
          setTechnicians(techData);
        } catch (err) {
          console.error(err);
        }
      };
      fetchTechnicians();
    }
  }, [formData.maintenanceTeamId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createRequest(formData);
      setSuccessMessage("Request created successfully!");
      setFormData({
        subject: "",
        description: "",
        type: "Corrective",
        equipmentId: "",
        maintenanceTeamId: "",
        assignedTechnicianId: "",
        scheduledDate: "",
        durationHours: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Create Maintenance Request</h2>
            <p style={styles.subtitle}>Fill in the details to log a new maintenance request.</p>
          </div>
        </div>

        {successMessage && <p style={styles.success}>{successMessage}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              style={{ ...styles.input, height: "80px" }}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Type</label>
            <select name="type" value={formData.type} onChange={handleChange} style={styles.input}>
              <option value="Corrective">Corrective</option>
              <option value="Preventive">Preventive</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Equipment</label>
            <select name="equipmentId" value={formData.equipmentId} onChange={handleChange} required style={styles.input}>
              <option value="">Select Equipment</option>
              {equipment.map((eq) => (
                <option key={eq._id} value={eq._id}>{eq.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Maintenance Team</label>
            <select
              name="maintenanceTeamId"
              value={formData.maintenanceTeamId}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>{team.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Assigned Technician</label>
            <select
              name="assignedTechnicianId"
              value={formData.assignedTechnicianId}
              onChange={handleChange}
              required
              style={styles.input}
            >
              <option value="">Select Technician</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>{tech.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Scheduled Date & Time</label>
            <input
              type="datetime-local"
              name="scheduledDate"
              value={formData.scheduledDate}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Duration (hours)</label>
            <input
              type="number"
              name="durationHours"
              value={formData.durationHours}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? "Creating..." : "Create Request"}
          </button>
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
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  shell: {
    width: "100%",
    maxWidth: "700px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "26px",
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
    marginTop: "6px",
    fontSize: "13px",
    color: "#64748b",
  },
  success: {
    color: "#16a34a",
    fontSize: "14px",
    marginBottom: "12px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "4px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#0f172a",
  },
  input: {
    padding: "8px 12px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  submitBtn: {
    padding: "10px 16px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(22,163,74,0.35)",
    marginTop: "10px",
  },
};

export default CreateRequest;
