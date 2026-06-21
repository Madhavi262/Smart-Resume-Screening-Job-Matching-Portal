import React from "react";

function Card({ title, children }) {
  return (
    <div style={styles.card}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    marginBottom: "15px"
  }
};

export default Card;