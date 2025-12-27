import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getTeamById,
  addTechnicianToTeam,
} from "../../services/teamService";

const TeamDetails = () => {
  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [technicianId, setTechnicianId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchTeam = async () => {
    try {
      const data = await getTeamById(id);
      setTeam(data);
    } catch (err) {
      setError("Failed to load team details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  const handleAddTechnician = async (e) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      await addTechnicianToTeam(id, technicianId);
      alert("Technician added successfully");
      setTechnicianId("");
      setShowForm(false);
      fetchTeam();
    } catch (err) {
      alert(err.message || "Failed to add technician");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p style={styles.loading}>Loading team...</p>;
  if (error) return <p style={styles.error}>{error}</p>;
  if (!team) return <p style={styles.error}>Team not found</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{team.name}</h2>
            <p style={styles.subtitle}>
              {team.description || "No description provided"}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={styles.addBtn}
          >
            + Add Technician
          </button>
        </div>

        {/* ADD TECHNICIAN FORM */}
        {showForm && (
          <form onSubmit={handleAddTechnician} style={styles.form}>
            <input
              type="text"
              placeholder="Technician ID"
              value={technicianId}
              onChange={(e) => setTechnicianId(e.target.value)}
              required
              style={styles.input}
            />
            <button
              type="submit"
              disabled={actionLoading}
              style={{
                ...styles.saveBtn,
                opacity: actionLoading ? 0.7 : 1,
                cursor: actionLoading ? "not-allowed" : "pointer",
              }}
            >
              {actionLoading ? "Adding..." : "Add"}
            </button>
          </form>
        )}

        {/* MEMBERS */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Members</h3>

          {team.members?.length > 0 ? (
            <ul style={styles.memberList}>
              {team.members.map((member) => (
                <li key={member._id} style={styles.memberItem}>
                  <div style={styles.memberAvatar}>
                    {member.name?.[0]?.toUpperCase() || "T"}
                  </div>
                  <div>
                    <p style={styles.memberName}>{member.name}</p>
                    <p style={styles.memberEmail}>{member.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p style={styles.emptyText}>No members in this team</p>
          )}
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          <Link to="/teams" style={styles.back}>
            ← Back to Teams
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ================= STYLES (EXACT MATCH) ================= */

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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "18px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #22c55e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  subtitle: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "#64748b",
  },
  addBtn: {
    padding: "8px 14px",
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
  form: {
    marginBottom: "18px",
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#f9fafb",
  },
  saveBtn: {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  },
  section: {
    marginTop: "4px",
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#0f172a",
  },
  memberList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 10px",
    borderRadius: "12px",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  memberAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 700,
  },
  memberName: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
  },
  memberEmail: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
  },
  emptyText: {
    fontSize: "13px",
    color: "#9ca3af",
  },
  footer: {
    marginTop: "20px",
  },
  back: {
    color: "#2563eb",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 500,
  },
  loading: {
    textAlign: "center",
    marginTop: "40px",
  },
  error: {
    textAlign: "center",
    marginTop: "40px",
    color: "red",
  },
};

export default TeamDetails;
