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
      fetchTeams(); // refresh list
    } catch (err) {
      alert(err.message || "Failed to create team");
    }
  };

  if (loading) return <p>Loading teams...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Teams</h2>
        <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
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
        <p>No teams found</p>
      ) : (
        <ul style={styles.list}>
          {teams.map((team) => (
            <li key={team._id} style={styles.card}>
              <h3>{team.name}</h3>
              <p>Members: {team.members?.length || 0}</p>

              <Link to={`/teams/${team._id}`} style={styles.link}>
                View Details →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: { padding: "20px" },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addBtn: {
    padding: "8px 12px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  form: {
    margin: "20px 0",
    display: "flex",
    gap: "10px",
  },

  input: {
    padding: "8px",
    flex: 1,
  },

  saveBtn: {
    padding: "8px 12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },

  list: {
    listStyle: "none",
    padding: 0,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "16px",
  },

  card: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
  },

  link: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "bold",
  },
};

export default TeamList;
