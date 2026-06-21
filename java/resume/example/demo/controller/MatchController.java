package resume.example.demo.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import resume.example.demo.dto.MatchResponse;
import resume.example.demo.entity.Job;
import resume.example.demo.entity.MatchResult;
import resume.example.demo.entity.Resume;
import resume.example.demo.repository.JobRepository;
import resume.example.demo.repository.MatchResultRepository;
import resume.example.demo.repository.ResumeRepository;


@RestController
@RequestMapping("/api/match")
@RequiredArgsConstructor
public class MatchController {

    private final ResumeRepository resumeRepository;
    private final JobRepository jobRepository;
    private final MatchResultRepository matchResultRepository;
    

    @GetMapping("/{resumeId}/{jobId}")
    public MatchResponse matchResume(
            @PathVariable Long resumeId,
            @PathVariable Long jobId) {

        Resume resume =
                resumeRepository.findById(resumeId).orElseThrow();

        Job job =
                jobRepository.findById(jobId).orElseThrow();

        String resumeSkills =
                resume.getSkills();

        String jobSkills =
                job.getSkills();

        List<String> matchedSkills =
                new ArrayList<>();

        String[] required =
                jobSkills.split(",");

        for(String skill : required) {

            if(resumeSkills.toLowerCase()
                    .contains(skill.trim().toLowerCase())) {

                matchedSkills.add(skill.trim());
            }
        }
        

        double score =
                ((double) matchedSkills.size()
                        / required.length) * 100;

                        MatchResult result = new MatchResult();

result.setResumeId(resumeId);

result.setJobId(jobId);

result.setMatchedSkills(
        matchedSkills.toString());

result.setScore(score);

matchResultRepository.save(result);

        return new MatchResponse(
                resumeId,
                jobId,
                matchedSkills,
                score
        );
    }

    @GetMapping("/results")
public List<MatchResult> getAllResults() {

    return matchResultRepository.findAll();
}
}