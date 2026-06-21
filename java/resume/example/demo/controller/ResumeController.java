package resume.example.demo.controller;

import java.io.File;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import resume.example.demo.entity.Job;
import resume.example.demo.entity.MatchResult;
import resume.example.demo.entity.Resume;
import resume.example.demo.repository.JobRepository;
import resume.example.demo.repository.MatchResultRepository;
import resume.example.demo.repository.ResumeRepository;
import resume.example.demo.util.SkillExtractor;


@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor

public class ResumeController {
    
     private final ResumeRepository resumeRepository;
     private final JobRepository jobRepository;
     private final MatchResultRepository matchResultRepository;

    private static final String UPLOAD_DIR =
        "C:/Users/trupt/Downloads/demo (2)/demo/uploads/";
        
   @PostMapping("/upload")
public ResponseEntity<String> uploadResume(@RequestParam("file") MultipartFile file) {

    try {
        String uploadPath = "C:\\Users\\trupt\\Downloads\\demo (2)\\demo\\uploads";

        File uploadDir = new File(uploadPath);

        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }

        String fileName = file.getOriginalFilename();

        File destination = new File(uploadDir, fileName);

        System.out.println("Saving file to: " + destination.getAbsolutePath());

        file.transferTo(destination);

         // ===== PDF TEXT EXTRACTION START =====

        byte[] pdfBytes = Files.readAllBytes(destination.toPath());

             PDDocument document = Loader.loadPDF(pdfBytes);

           PDFTextStripper stripper = new PDFTextStripper();

String text = stripper.getText(document);

document.close();

        System.out.println("===== RESUME TEXT =====");
        System.out.println(text);

        List<String> skills =
        SkillExtractor.extractSkills(text);

        System.out.println("===== SKILLS FOUND =====");
         System.out.println(skills);
        
        
        
        
        Resume resume = new Resume();

resume.setFileName(fileName);
resume.setFilePath(destination.getAbsolutePath());
resume.setExtractedText(text);
resume.setSkills(String.join(", ", skills));

     resumeRepository.save(resume);



        // ===== PDF TEXT EXTRACTION END =====

        return ResponseEntity.ok(
                "Resume uploaded successfully: " + fileName);

    } catch (Exception e) {

        e.printStackTrace();

        return ResponseEntity.badRequest()
                .body("Error: " + e.getMessage());
    }
    
}

@GetMapping
public List<Resume> getAllResumes() {

    List<Resume> list = resumeRepository.findAll();

    System.out.println("Returning list size: " + list.size());

    return list;
}
@GetMapping("/search")
public List<Resume> searchBySkill(@RequestParam String skill) {
    return resumeRepository.findBySkillsContainingIgnoreCase(skill);
}

 @DeleteMapping("/{id}")
    public String deleteResume(@PathVariable Long id) {
        resumeRepository.deleteById(id);
        return "Deleted successfully";
    }

@GetMapping("/view/{id}")
public ResponseEntity<Resume> getResumeById(@PathVariable Long id) {
    return resumeRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@GetMapping("/match/{resumeId}/{jobId}")
public String matchResumeWithJob(
        @PathVariable Long resumeId,
        @PathVariable Long jobId) {

    Resume resume = resumeRepository.findById(resumeId).orElse(null);
    Job job = jobRepository.findById(jobId).orElse(null);

    if (resume == null || job == null) {
        return "Resume or Job not found";
    }

     System.out.println("Resume = " + resume);
System.out.println("Job = " + job);

System.out.println("Resume Skills = " + resume.getSkills());
System.out.println("Job Skills = " + job.getSkills());

     if (job.getSkills() == null) {
    return "Job skills are null";
}

if (resume.getSkills() == null) {
    return "Resume skills are null";
}

    String[] resumeSkills = resume.getSkills().split(",");
    String[] jobSkills = job.getSkills().split(",");

    StringBuilder matchedSkills = new StringBuilder();

    int matchCount = 0;

    for (String jobSkill : jobSkills) {
        for (String resumeSkill : resumeSkills) {

            if (jobSkill.trim().equalsIgnoreCase(resumeSkill.trim())) {
                matchCount++;
                matchedSkills.append(jobSkill.trim())
                 .append(", ");
            }
        }
    }

    double score =
            ((double) matchCount / jobSkills.length) * 100;

            MatchResult result = new MatchResult();

result.setJobId(jobId);
result.setResumeId(resumeId);
result.setScore(score);
result.setMatchedSkills(matchedSkills.toString());

matchResultRepository.save(result);

    return "Match Score = " + score + "%";
}

@GetMapping("/match-results")
public List<MatchResult> getAllMatchResults() {
    return matchResultRepository.findAll();
}

@GetMapping("/top-matches")
public List<MatchResult> getTopMatches() {
    return matchResultRepository.findAllByOrderByScoreDesc();
}
@GetMapping("/top-matches/{jobId}")
public List<MatchResult> getTopMatchesByJob(
        @PathVariable Long jobId) {

    return matchResultRepository
            .findByJobIdOrderByScoreDesc(jobId);
}

@GetMapping("/dashboard")
public Map<String, Long> getDashboardStats() {
    Map<String, Long> stats = new HashMap<>();

    stats.put("totalResumes", resumeRepository.count());
    stats.put("totalJobs", jobRepository.count());
    stats.put("totalMatches", matchResultRepository.count());

    return stats;
}

@PostMapping("/job")
public Job addJob(@RequestBody Job job) {
    return jobRepository.save(job);
}

@GetMapping("/jobs")
public List<Job> getAllJobs() {
    return jobRepository.findAll();
}
 


}
