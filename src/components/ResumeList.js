import React, { useEffect, useState } from "react";
import API from "../api";

function ResumeList() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    console.log("LOAD METHOD CALLED");
    try {
      const response = await API.get("");

      console.log("FULL RESPONSE:", response);
      console.log("DATA:", response.data);

      setResumes(response.data);
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  const deleteResume = async (id) => {
    try {
      await API.delete(`/${id}`);
      alert("Resume Deleted");
      load();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>📄 Resumes</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>ID</th>
              <th>File Name</th>
              <th>Skills</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {resumes.map((r) => (
              <tr key={r.id} style={styles.row}>
                <td>{r.id}</td>
                <td style={styles.fileName}>{r.fileName}</td>
                <td style={styles.skills}>{r.skills}</td>
                <td>
                  <button
                    onClick={() => deleteResume(r.id)}
                    style={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResumeList;

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

  fileName: {
    fontWeight: "bold",
    color: "#111827"
  },

  skills: {
    fontSize: "13px",
    color: "#6b7280"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};