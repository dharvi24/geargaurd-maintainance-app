// src/pages/dashboard/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Tabs with routes
  const topTabs = [
    { label: "Maintenance", path: "/maintenance-requests" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Maintenance Calendar", path: "/maintenance-calendar" },
    { label: "Equipment", path: "/equipment" },
    { label: "Reporting", path: "/reporting" },
    { label: "Teams", path: "/teams" },
  ];

  const tableRows = [
    {
      subject: "Test activity",
      employee: "Mitchell Admin",
      technician: "Aka Foster",
      category: "Computer",
      stage: "New Request",
      company: "My Company",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* Top nav tabs */}
        <div style={styles.tabRow}>
          {topTabs.map((tab) => (
            <button
              key={tab.label}
              style={{
                ...styles.tab,
                ...(tab.label === "Dashboard" ? styles.tabActive : {}),
              }}
              onClick={() => navigate(tab.path)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Inner dashboard card */}
        <div style={styles.card}>
          {/* Top row */}
          <div style={styles.topRow}>
            <button style={styles.newBadge}>New</button>

            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                style={styles.searchInput}
                placeholder="Search..."
                type="text"
              />
            </div>

            <button style={styles.filterButton}>▾</button>
          </div>

          {/* Summary cards */}
          <div style={styles.summaryRow}>
            <div style={{ ...styles.summaryCard, background: "#fee2e2" }}>
              <p style={styles.summaryTitle}>Critical Equipment</p>
              <p style={styles.summaryValue}>5 Units</p>
              <p style={styles.summarySub}>Health &lt; 30%</p>
            </div>

            <div style={{ ...styles.summaryCard, background: "#dbeafe" }}>
              <p style={styles.summaryTitle}>Technician Load</p>
              <p style={styles.summaryValue}>85% Utilized</p>
              <p style={styles.summarySub}>(Assign Carefully)</p>
            </div>

            <div style={{ ...styles.summaryCard, background: "#dcfce7" }}>
              <p style={styles.summaryTitle}>Open Requests</p>
              <p style={styles.summaryValue}>12 Pending</p>
              <p style={styles.summarySub}>3 Overdue</p>
            </div>
          </div>

          {/* Table header */}
          <div style={styles.tableHeader}>
            <span style={styles.th}>Subjects</span>
            <span style={styles.th}>Employee</span>
            <span style={styles.th}>Technician</span>
            <span style={styles.th}>Category</span>
            <span style={styles.th}>Stage</span>
            <span style={styles.th}>Company</span>
          </div>

          {/* Table body */}
          <div style={styles.tableBody}>
            {tableRows.map((row, index) => (
              <div key={index} style={styles.tableRow}>
                <span style={styles.td}>{row.subject}</span>
                <span style={styles.td}>{row.employee}</span>
                <span style={styles.td}>{row.technician}</span>
                <span style={styles.td}>{row.category}</span>
                <span style={styles.td}>{row.stage}</span>
                <span style={styles.td}>{row.company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ================= STYLES (UNCHANGED) =================
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  shell: {
    width: "100%",
    maxWidth: "1200px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "20px 24px 28px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
    border: "1px solid rgba(255,255,255,0.6)",
  },
  tabRow: {
    display: "flex",
    gap: "20px",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "10px",
    marginBottom: "16px",
    overflowX: "auto",
  },
  tab: {
    background: "transparent",
    border: "none",
    padding: "6px 0",
    fontSize: "14px",
    color: "#6b7280",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  tabActive: {
    color: "#111827",
    fontWeight: 600,
    borderBottom: "2px solid #6366f1",
  },
  card: {
    background: "#ffffff",
    borderRadius: "18px",
    padding: "18px 18px 22px",
    border: "1px solid #e5e7eb",
  },
  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "18px",
  },
  newBadge: {
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid #111827",
    background: "#ffffff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },
  searchWrapper: { flex: 1, position: "relative" },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "12px",
    opacity: 0.5,
  },
  searchInput: {
    width: "100%",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    padding: "8px 12px 8px 28px",
    outline: "none",
    fontSize: "13px",
  },
  filterButton: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
  },
  summaryRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginBottom: "18px",
  },
  summaryCard: {
    borderRadius: "18px",
    padding: "12px 16px",
    border: "1px solid rgba(148,163,184,0.4)",
  },
  summaryTitle: { fontSize: "14px", fontWeight: 600 },
  summaryValue: { fontSize: "22px", fontWeight: 700 },
  summarySub: { fontSize: "12px", color: "#6b7280" },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
    borderTop: "1px dashed #cbd5f5",
    borderBottom: "1px dashed #cbd5f5",
    padding: "10px 4px",
  },
  th: { fontSize: "12px", fontWeight: 600, color: "#6b7280" },
  tableBody: { maxHeight: "260px", overflowY: "auto" },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "2fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr",
    padding: "10px 4px",
    borderBottom: "1px solid #f3f4f6",
  },
  td: { fontSize: "13px", color: "#111827" },
};

export default Dashboard;
