import React, { useEffect, useState } from "react";
import API from "../api";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    const response = await API.get("/jobs");
    setJobs(response.data);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>💼 Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id} style={styles.jobCard}>
          <div style={styles.jobTitle}>
            {job.jobTitle}
          </div>

          <div style={styles.skills}>
            {job.skills}
          </div>
        </div>
      ))}
    </div>
  );
}

export default JobList;

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

  jobCard: {
    border: "1px solid #eee",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#fafafa"
  },

  jobTitle: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#111827",
    marginBottom: "5px"
  },

  skills: {
    fontSize: "13px",
    color: "#6b7280"
  }
};