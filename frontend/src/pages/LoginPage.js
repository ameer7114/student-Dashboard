// src/pages/LoginPage.js
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/admin/login", form);
      localStorage.setItem("isAdmin", "true");
      navigate("/");
    } catch (err) {
      setError("❌ Invalid credentials");
    }
  };

 return (
  <div style={styles.container}>
    <h2 style={styles.heading}>Admin Login</h2>
    {error && <p style={styles.error}>{error}</p>}
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Login</button>
    </form>
  </div>
);
}
const styles = {
  
  container: {
    padding: "30px",
    maxWidth: "400px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
export default LoginPage;

