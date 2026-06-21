import React, { useState } from "react";
import API from "../api";

function JobForm() {
  const [jobTitle, setJobTitle] = useState("");
  const [skills, setSkills] = useState("");

  const saveJob = async () => {
    await API.post("/job", {
      jobTitle,
      skills
    });

    alert("Job added successfully");

    setJobTitle("");
    setSkills("");
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>➕ Add Job</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        style={styles.input}
      />

      <button onClick={saveJob} style={styles.button}>
        Add Job
      </button>
    </div>
  );
}

export default JobForm;

/* 🎨 UI ONLY */
const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "15px"
  },

  title: {
    marginBottom: "10px",
    color: "#111827"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    outline: "none"
  },

  button: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%"
  }
};