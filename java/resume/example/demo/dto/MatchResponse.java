package resume.example.demo.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MatchResponse {

    private Long resumeId;

    private Long jobId;

    private List<String> matchedSkills;

    private double score;
}