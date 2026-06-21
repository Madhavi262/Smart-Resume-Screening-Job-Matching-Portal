package resume.example.demo.util;

import java.util.ArrayList;
import java.util.List;

public class SkillExtractor {

    public static List<String> extractSkills(String text) {

        String[] skills = {
                "Java",
                "Spring Boot",
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "MySQL",
                "PostgreSQL",
                "Docker",
                "Git",
                "GitHub"
        };

        List<String> foundSkills = new ArrayList<>();

        for(String skill : skills) {

            if(text.toLowerCase()
                   .contains(skill.toLowerCase())) {

                foundSkills.add(skill);
            }
        }

        return foundSkills;
    }
}