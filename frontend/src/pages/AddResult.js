import { useState } from "react";
import axios from "axios";

function AddResult() {
  const [form, setForm] = useState({
    name: "",
    roll_number: "",
    subject: "",
    marks: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/results", form)
      .then(() => {
        setMessage("✅ Result added successfully.");
        setForm({ name: "", roll_number: "", subject: "", marks: "" });
      })
      .catch(() => setMessage("❌ Failed to add result."));
  };

  const containerStyle = {
    padding: "40px",
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
  };

  const messageStyle = {
    color: message.startsWith("✅") ? "green" : "red",
    fontWeight: "bold",
    marginBottom: "10px"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center" }}>Add New Result</h2>
      {message && <p style={messageStyle}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="roll_number"
          placeholder="Roll Number"
          value={form.roll_number}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="number"
          name="marks"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
          required
        />
        <button style={buttonStyle} type="submit">
          Add Result
        </button>
      </form>
    </div>
  );
}

export default AddResult;