import React, { useState } from "react";
import API from "../api";

function TopCandidates() {
  const [jobId, setJobId] = useState("");
  const [candidates, setCandidates] = useState([]);

  const fetchTopCandidates = async () => {
    try {
      const response = await API.get(`/top-matches/${jobId}`);
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>🏆 Top Candidates Ranking</h2>

      <div style={styles.inputRow}>
        <input
          type="number"
          placeholder="Enter Job ID"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          style={styles.input}
        />

        <button onClick={fetchTopCandidates} style={styles.button}>
          Get Ranking
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>Rank</th>
              <th>Resume ID</th>
              <th>Score</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={candidate.id} style={styles.row}>
                <td>{index + 1}</td>
                <td>{candidate.resumeId}</td>
                <td>
                  <span style={styles.score}>
                    {candidate.score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TopCandidates;

/* 🎨 ONLY UI STYLES - NO LOGIC CHANGES */
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
    borderRadius: "6px",
    border: "1px solid #ddd"
  },

  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  tableWrapper: {
    overflowX: "auto"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  headerRow: {
    background: "#f3f4f6",
    textAlign: "left"
  },

  row: {
    borderBottom: "1px solid #eee"
  },

  score: {
    background: "#10b981",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px"
  }
};