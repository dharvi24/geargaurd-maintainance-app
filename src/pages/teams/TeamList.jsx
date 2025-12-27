import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeams, createTeam } from "../../services/teamService";

const TeamList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });

  const fetchTeams = async () => {
    try {
      const data = await getTeams();
      setTeams(Array.isArray(data) ? data : []);
    } catch (err) {
      setError("Failed to load teams");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam(form);
      setForm({ name: "", description: "" });
      setShowForm(false);
      fetchTeams();
    } catch (err) {
      alert(err.message || "Failed to create team");
    }
  };

  if (loading) return <p style={styles.loading}>Loading teams...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* HEADER */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Teams</h2>
            <p style={styles.subtitle}>
              Manage maintenance teams and their member counts
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            style={styles.addBtn}
          >
            + Add Team
          </button>
        </div>

        {/* ADD TEAM FORM */}
        {showForm && (
          <form onSubmit={handleCreateTeam} style={styles.form}>
            <input
              name="name"
              placeholder="Team Name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              style={styles.input}
            />
            <button type="submit" style={styles.saveBtn}>
              Create
            </button>
          </form>
        )}

        {/* TEAM LIST */}
        {teams.length === 0 ? (
          <p style={styles.emptyText}>No teams found</p>
        ) : (
          <ul style={styles.list}>
            {teams.map((team) => (
              <li key={team._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.avatar}>
                    {team.name?.[0]?.toUpperCase() || "T"}
                  </div>
                  <div>
                    <h3 style={styles.cardTitle}>{team.name}</h3>
                    <p style={styles.cardSubtitle}>
                      {team.description || "No description"}
                    </p>
                  </div>
                </div>

                <div style={styles.cardBody}>
                  <span style={styles.badge}>
                    {team.members?.length || 0} members
                  </span>
                </div>

                <div style={styles.cardFooter}>
                  <Link to={`/teams/${team._id}`} style={styles.link}>
                    View Details →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ================= STYLES (FROM REFERENCE UI) ================= */

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
    marginBottom: "18px",
    flexWrap: "wrap",
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
    padding: "8px 16px",
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(22,163,74,0.35)",
  },
  form: {
    margin: "18px 0 20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    minWidth: "200px",
    padding: "10px 12px",
    borderRadius: "12px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#f9fafb",
    outline: "none",
  },
  saveBtn: {
    padding: "10px 18px",
    borderRadius: "12px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(248,250,252,0.95)",
    borderRadius: "18px",
    padding: "16px",
    border: "1px solid rgba(226,232,240,0.9)",
    boxShadow: "0 12px 24px rgba(148,163,184,0.3)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    fontWeight: 700,
  },
  cardTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 600,
    color: "#0f172a",
  },
  cardSubtitle: {
    margin: "2px 0 0",
    fontSize: "12px",
    color: "#6b7280",
  },
  cardBody: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "rgba(37,99,235,0.08)",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: 600,
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },
  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: 600,
    fontSize: "13px",
  },
  emptyText: {
    fontSize: "14px",
    color: "#9ca3af",
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

export default TeamList;
