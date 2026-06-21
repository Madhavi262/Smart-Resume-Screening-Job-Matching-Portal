import React, { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/dashboard").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>📊 Dashboard</h2>

      <div style={styles.row}>
        <div style={styles.card}>
          <h3>{data.totalResumes}</h3>
          <p>Resumes</p>
        </div>

        <div style={styles.card}>
          <h3>{data.totalJobs}</h3>
          <p>Jobs</p>
        </div>

        <div style={styles.card}>
          <h3>{data.totalMatches}</h3>
          <p>Matches</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    gap: "10px"
  },
  card: {
    flex: 1,
    padding: "15px",
    background: "#e0f2fe",
    borderRadius: "10px",
    textAlign: "center"
  }
};

export default Dashboard;