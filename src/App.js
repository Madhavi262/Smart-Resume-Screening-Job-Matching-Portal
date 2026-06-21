import UploadResume from "./components/UploadResume";
import ResumeList from "./components/ResumeList";
import Dashboard from "./components/Dashboard";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import MatchResume from "./components/MatchResume";
import MatchResults from "./components/MatchResults";
import TopCandidates from "./components/TopCandidates";
import SearchResume from "./components/SearchResume";
import "./styles.css";

function App() {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📄 Smart Resume Screening & Job Matching Portal</h1>

      <div style={styles.section}>
        <Dashboard />
      </div>

      <div style={styles.section}>
        <UploadResume />
      </div>

      <div style={styles.section}>
        <ResumeList />
      </div>

      <div style={styles.section}>
        <JobForm />
      </div>

      <div style={styles.section}>
        <JobList />
      </div>

      <div style={styles.section}>
        <MatchResume />
      </div>

      <div style={styles.section}>
        <MatchResults />
      </div>

      <div style={styles.section}>
        <TopCandidates />
      </div>

      <div style={styles.section}>
        <SearchResume />
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1e293b",
    fontSize: "36px",
    fontWeight: "bold",
  },

  section: {
    marginBottom: "30px",
  },
};

export default App;