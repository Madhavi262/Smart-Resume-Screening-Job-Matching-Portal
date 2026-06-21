import React, { useState } from "react";
import API from "../api";
import { ui } from "../ui";

function UploadResume() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    await API.post("/upload", formData);
    alert("Resume uploaded successfully!");
  };

  return (
    <div style={ui.card}>
      <div style={ui.sectionTitle}>📤 Upload Resume</div>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button style={ui.button} onClick={upload}>
        Upload Resume
      </button>
    </div>
  );
}

export default UploadResume;