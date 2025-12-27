import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = ["user", "admin", "manager", "technician"];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await registerUser(form);
      localStorage.setItem("token", data.token);
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Fill in your details to register a new account.</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={styles.input}
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={styles.loginText}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  shell: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(16px)",
    borderRadius: "24px",
    padding: "32px 28px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.25)",
    border: "1px solid rgba(255,255,255,0.6)",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: 700,
    margin: 0,
    background: "linear-gradient(135deg, #667eea 0%, #22c55e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    margin: "8px 0 20px",
    fontSize: "13px",
    color: "#64748b",
  },
  error: {
    color: "red",
    marginBottom: "12px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
  },
  button: {
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
  loginText: {
    marginTop: "16px",
    fontSize: "13px",
    color: "#64748b",
  },
};

export default Register;
