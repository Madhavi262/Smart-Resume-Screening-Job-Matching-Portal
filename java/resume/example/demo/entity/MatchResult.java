package resume.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "match_results")
public class MatchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "job_id")
    private Long jobId;

    @Column(name = "resume_id")
    private Long resumeId;

    @Column(name = "matched_skills")
    private String matchedSkills;

    private Double score;

    public Long getId() {
        return id;
    }

    public Long getJobId() {
        return jobId;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public String getMatchedSkills() {
        return matchedSkills;
    }

    public Double getScore() {
        return score;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public void setMatchedSkills(String matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public void setScore(Double score) {
        this.score = score;
    }
}