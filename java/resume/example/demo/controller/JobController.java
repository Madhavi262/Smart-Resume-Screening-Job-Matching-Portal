package resume.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resume.example.demo.entity.Job;
import resume.example.demo.repository.JobRepository;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobRepository jobRepository;

    @PostMapping
    public Job createJob(@RequestBody Job job) {

        return jobRepository.save(job);
    }

    @GetMapping
    public List<Job> getAllJobs() {

        return jobRepository.findAll();
    }
}