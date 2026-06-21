package resume.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import resume.example.demo.entity.Resume;

public interface ResumeRepository extends JpaRepository<Resume, Long> {

    List<Resume> findBySkillsContainingIgnoreCase(String skill);
}