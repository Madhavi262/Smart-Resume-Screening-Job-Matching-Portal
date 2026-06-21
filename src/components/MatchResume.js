import React, { useState } from "react";
import API from "../api";

function MatchResume() {
  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");
  const [result, setResult] = useState("");

  const matchResume = async () => {
    try {
      const response = await API.get(
        `/match/${resumeId}/${jobId}`
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      setResult("Error calculating match");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🤝 Match Resume With Job</h2>

      <div style={styles.inputRow}>
        <input
          type="number"
          placeholder="Resume ID"
          value={resumeId}
          onChange={(e) => setResumeId(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          style={styles.input}
        />
      </div>

      <button onClick={matchResume} style={styles.button}>
        Calculate Match
      </button>

      {result && (
        <div style={styles.resultBox}>
          <h3 style={styles.resultText}>{result}</h3>
        </div>
      )}
    </div>
  );
}

export default MatchResume;

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

  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "6px"
  },

  button: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  resultBox: {
    marginTop: "10px",
    padding: "10px",
    background: "#f0f9ff",
    borderRadius: "8px"
  },

  resultText: {
    margin: 0,
    color: "#1e40af"
  }
};