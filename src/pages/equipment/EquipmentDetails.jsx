import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEquipmentById } from "../../services/equipmentService";

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipmentData = await getEquipmentById(id);
        setEquipment(equipmentData);
      } catch (err) {
        setError("Failed to load equipment details");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchEquipment();
  }, [id]);

  if (loading)
    return (
      <div style={styles.loadingWrapper}>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  if (error) return <p style={styles.error}>{error}</p>;
  if (!equipment) return null;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{equipment.name || "Equipment Details"}</h2>
            <p style={styles.subtitle}>
              Serial: {equipment.serialNumber || "N/A"} · Category:{" "}
              {equipment.category || "N/A"}
            </p>
          </div>
        </div>

        {/* Main detail grid (replaces table) */}
        <div style={styles.detailGrid}>
          <DetailRow label="Name" value={equipment.name} />
          <DetailRow label="Serial Number" value={equipment.serialNumber} />
          <DetailRow label="Category" value={equipment.category} />
          <DetailRow label="Department" value={equipment.department} />
          <DetailRow label="Location" value={equipment.location || "Not specified"} />
          <DetailRow
            label="Maintenance Team"
            value={equipment.maintenanceTeamId?.name || "Not Assigned"}
          />
          <DetailRow
            label="Default Technician"
            value={equipment.defaultTechnicianId?.name || "Not Assigned"}
          />
          <DetailRow label="Scrapped" value={equipment.isScrapped ? "Yes" : "No"} />
        </div>

        {/* Footer actions */}
        <div style={styles.footer}>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/equipment")}
          >
            ← Back to Equipment
          </button>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div style={styles.row}>
    <div style={styles.rowLabel}>{label}</div>
    <div style={styles.rowValue}>{value || "N/A"}</div>
  </div>
);

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
    padding: "24px 26px 22px",
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
  detailGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "6px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "160px 1fr",
    gap: "12px",
    padding: "10px 12px",
    borderRadius: "14px",
    background: "rgba(248,250,252,0.95)",
    border: "1px solid rgba(226,232,240,0.9)",
  },
  rowLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#64748b",
  },
  rowValue: {
    fontSize: "14px",
    color: "#0f172a",
  },
  footer: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "flex-end",
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
  loadingWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  loadingText: {
    fontSize: "14px",
    color: "#0f172a",
  },
  error: {
    textAlign: "center",
    marginTop: "40px",
    color: "red",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
};

export default EquipmentDetails;