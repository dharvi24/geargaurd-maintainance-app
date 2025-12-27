import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token); // store JWT token
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err.message || err));
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <h2 style={styles.title}>Login</h2>
        <p style={styles.subtitle}>Enter your credentials to access the dashboard.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
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
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.registerText}>
          Don't have an account? <Link to="/register">Register</Link>
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
  registerText: {
    marginTop: "16px",
    fontSize: "13px",
    color: "#64748b",
  },
};

export default Login;
