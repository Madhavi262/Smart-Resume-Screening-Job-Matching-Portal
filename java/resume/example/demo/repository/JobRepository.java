package resume.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import resume.example.demo.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
}