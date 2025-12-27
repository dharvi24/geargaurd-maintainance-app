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
      fetchTeam(); // refresh members
    } catch (err) {
      alert(err.message || "Failed to add technician");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>Loading team...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!team) return <p>Team not found</p>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2>{team.name}</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={styles.addBtn}
        >
          + Add Technician
        </button>
      </div>

      <p>Description: {team.description || "N/A"}</p>

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
          <button type="submit" disabled={actionLoading} style={styles.saveBtn}>
            {actionLoading ? "Adding..." : "Add"}
          </button>
        </form>
      )}

      {/* MEMBERS LIST */}
      <h3>Members</h3>
      {team.members?.length > 0 ? (
        <ul>
          {team.members.map((member) => (
            <li key={member._id}>
              {member.name} ({member.email})
            </li>
          ))}
        </ul>
      ) : (
        <p>No members in this team</p>
      )}

      <Link to="/teams" style={styles.back}>
        ← Back to Teams
      </Link>
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
    margin: "15px 0",
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

  back: {
    display: "inline-block",
    marginTop: "20px",
    color: "#2563eb",
    textDecoration: "none",
  },
};

export default TeamDetails;
