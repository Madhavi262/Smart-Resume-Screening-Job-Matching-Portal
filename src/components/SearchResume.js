import React, { useState } from "react";
import API from "../api";

function SearchResume() {
  const [skill, setSkill] = useState("");
  const [resumes, setResumes] = useState([]);

  const searchResume = async () => {
    try {
      const response = await API.get(`/search?skill=${skill}`);
      setResumes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🔍 Search Resume By Skill</h2>

      <div style={styles.inputRow}>
        <input
          type="text"
          placeholder="Enter Skill (e.g. Java, React)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          style={styles.input}
        />

        <button onClick={searchResume} style={styles.button}>
          Search
        </button>
      </div>

      <div style={styles.resultBox}>
        {resumes.length === 0 ? (
          <p style={styles.empty}>No results yet</p>
        ) : (
          <ul style={styles.list}>
            {resumes.map((resume) => (
             <li key={resume.id} style={styles.item}>
  <b>📄 {resume.fileName}</b>
  <div style={styles.skills}>
    {resume.skills}
  </div>
</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchResume;

/* 🎨 UI ONLY STYLES */
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

  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px"
  },

  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  button: {
    background: "#10b981",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "10px"
  },

  list: {
    listStyle: "none",
    padding: 0
  },

  item: {
    padding: "10px",
    borderBottom: "1px solid #eee"
  },

  skills: {
    fontSize: "12px",
    color: "#6b7280"
  },

  empty: {
    color: "#9ca3af"
  }
};