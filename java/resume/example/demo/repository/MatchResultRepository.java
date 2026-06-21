package resume.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import resume.example.demo.entity.MatchResult;

public interface MatchResultRepository
        extends JpaRepository<MatchResult, Long> {

    List<MatchResult> findAllByOrderByScoreDesc();
    List<MatchResult> findByJobIdOrderByScoreDesc(Long jobId);
}