import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";



const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginUser(form);
      localStorage.setItem("token", data.token); // store JWT token
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.message || err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { width: "300px", margin: "100px auto", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { width: "100%", padding: "10px", margin: "10px 0" },
  button: { width: "100%", padding: "10px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "5px" },
};

export default Login;
