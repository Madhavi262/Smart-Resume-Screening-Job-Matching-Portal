import React, { useEffect, useState } from "react";
import API from "../api";

function MatchResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await API.get("/match-results");
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>📊 Match Results</h2>

      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Resume ID</th>
              <th style={styles.th}>Job ID</th>
              <th style={styles.th}>Score</th>
              <th style={styles.th}>Matched Skills</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td style={styles.td}>{result.id}</td>
                <td style={styles.td}>{result.resumeId}</td>
                <td style={styles.td}>{result.jobId}</td>

                <td style={styles.td}>
                  <span style={styles.scoreBadge}>
                    {result.score}%
                  </span>
                </td>

                <td style={styles.td}>
                  {result.matchedSkills}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px",
  },

  heading: {
    marginBottom: "20px",
    color: "#1e293b",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#2563eb",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
  },

  scoreBadge: {
    background: "#dcfce7",
    color: "#166534",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  },
};

export default MatchResults;