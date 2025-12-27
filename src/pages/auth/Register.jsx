import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Passwords do not match!");

    setLoading(true);
    try {
      const data = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      alert("Registration successful!");
      navigate("/login"); // redirect to login
    } catch (err) {
      alert("Registration failed: " + err.message || err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} style={styles.input} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} style={styles.input} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} style={styles.input} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} style={styles.input} required />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: { width: "350px", margin: "80px auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "12px", fontSize: "16px", background: "#10b981", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", marginTop: "10px" },
};

export default Register;
