import React, { useEffect, useState } from "react";
import { getAllEquipment } from "../../services/equipmentService";
import { useNavigate } from "react-router-dom";
import AddEquipment from "./AddEquipment";

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const equipments = await getAllEquipment();
        setEquipment(equipments);
      } catch (err) {
        setError("Failed to load equipment");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, []);

  if (loading)
    return (
      <div style={styles.loadingWrapper}>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    );
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Equipment</h2>
            <p style={styles.subtitle}>
              Overview of all registered assets and their departments.
            </p>
          </div>
          <button
            onClick={() => navigate("/equipment/add")}
            style={styles.addBtn}
          >
            + Add Equipment
          </button>
        </div>

        {/* Table-like list */}
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <span style={styles.th}>Name</span>
            <span style={styles.th}>Category</span>
            <span style={styles.th}>Department</span>
            <span style={styles.th}>Actions</span>
          </div>

          <div style={styles.tableBody}>
            {equipment.length > 0 ? (
              equipment.map((eq) => (
                <div key={eq._id} style={styles.tr}>
                  <span style={styles.td}>{eq.name}</span>
                  <span style={styles.td}>{eq.category}</span>
                  <span style={styles.td}>{eq.department}</span>
                  <span style={styles.td}>
                    <button
                      style={styles.viewBtn}
                      onClick={() => navigate(`/equipment/${eq._id}`)}
                    >
                      View
                    </button>
                  </span>
                </div>
              ))
            ) : (
              <div style={styles.emptyRow}>
                <span style={styles.emptyText}>No equipment found</span>
              </div>
            )}
          </div>
        </div>
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
  shell: {
    width: "100%",
    maxWidth: "1100px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "22px 26px 26px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    flexWrap: "wrap",
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
  addBtn: {
    padding: "8px 16px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(22,163,74,0.35)",
    whiteSpace: "nowrap",
  },
  table: {
    marginTop: "8px",
    borderRadius: "18px",
    background: "rgba(248,250,252,0.95)",
    border: "1px solid rgba(226,232,240,0.9)",
    overflow: "hidden",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr 2fr 1.5fr",
    gap: "8px",
    padding: "10px 14px",
    background: "rgba(241,245,249,0.95)",
    borderBottom: "1px solid #e5e7eb",
  },
  th: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
  },
  tableBody: {
    display: "flex",
    flexDirection: "column",
  },
  tr: {
    display: "grid",
    gridTemplateColumns: "3fr 2fr 2fr 1.5fr",
    gap: "8px",
    padding: "10px 14px",
    borderBottom: "1px solid #e5e7eb",
    alignItems: "center",
  },
  td: {
    fontSize: "14px",
    color: "#0f172a",
  },
  viewBtn: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "none",
    background: "rgba(37,99,235,0.1)",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  emptyRow: {
    padding: "14px",
    textAlign: "center",
  },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
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

export default EquipmentList;